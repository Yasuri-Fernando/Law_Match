import pandas as pd
import nltk
import re
from openai import OpenAI
import os
from scipy import spatial
import ast

# Download NLTK resources
nltk.download("punkt")
nltk.download("averaged_perceptron_tagger")
nltk.download("maxent_ne_chunker")
nltk.download("words")

# Load CSV containing legal data
df = pd.read_csv("lawdata.csv", encoding="ISO-8859-1")

# Clean column names by stripping extra spaces
df.columns = df.columns.str.strip()

# Print column names to check if they match
print("CSV Columns:", df.columns.tolist())

# Rename "Year" to "Act Year" to match expected column names
if "Year" in df.columns:
    df.rename(columns={"Year": "Act Year"}, inplace=True)

# Load OpenAI API key (set your API key here if not in environment)
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY", "<your OpenAI API key>"))

# Define a set of important legal terms related to divorce law
LEGAL_TERMS = {"divorce", "separation", "marriage", "custody", "alimony", "property", "spouse", "rights", "support", "child"}

# Ensure required columns exist
required_columns = {"Description", "Act No", "Act Year", "Act Name"}

# Check for missing columns
missing_columns = required_columns - set(df.columns)
if missing_columns:
    print(f"Warning: Missing columns: {', '.join(missing_columns)}")
    # Add missing columns with default values (optional)
    for col in missing_columns:
        df[col] = 'N/A'

# Convert necessary columns to strings and handle missing values
for col in required_columns:
    df[col] = df[col].astype(str).fillna("N/A")

# OPTIONAL: Load precomputed embeddings if available
if "embedding" in df.columns:
    df["embedding"] = df["embedding"].apply(lambda x: ast.literal_eval(x) if isinstance(x, str) else x)


def extract_legal_keywords_nltk(question):
    """Extracts legal-related keywords using NLTK."""
    words = nltk.word_tokenize(question)
    pos_tags = nltk.pos_tag(words)
    extracted_keywords = {word.lower() for word, tag in pos_tags if tag in ("NN", "NNP")}
    legal_keywords = extracted_keywords.intersection(LEGAL_TERMS)
    return list(legal_keywords)


def search_law_database(keywords, df):
    """Searches the CSV database for matching legal information based on extracted keywords."""
    if not keywords:
        return None  

    # Filter rows where all keywords exist in the "Description" column
    relevant_rows = df[df["Description"].str.lower().apply(lambda x: all(k in x for k in keywords))]

    return relevant_rows if not relevant_rows.empty else None


def generate_answer(matched_laws):
    """Formats the matched legal information into a chatbot response, including Act details."""
    if matched_laws is None:
        return None  

    # Convert all matched rows into readable format with Act details
    response_text = "\n\n".join(
        f"**Act Name**: {row['Act Name']}\n"
        f"**Act No**: {row['Act No']}\n"
        f"**Act Year**: {row['Act Year']}\n"
        f"**Description**: {row['Description']}"
        for _, row in matched_laws.iterrows()
    )

    response = f"Based on legal records, here is the relevant information:\n\n{response_text}"
    
    return response


def strings_ranked_by_relatedness(query, df, top_n=5):
    """Returns legal texts ranked by relevance using OpenAI embeddings."""
    query_embedding_response = client.embeddings.create(
        model="text-embedding-3-small",
        input=query,
    )
    query_embedding = query_embedding_response.data[0].embedding

    strings_and_relatednesses = []

    for _, row in df.iterrows():
        if isinstance(row["embedding"], list):  # Ensure embeddings exist
            similarity = 1 - spatial.distance.cosine(query_embedding, row["embedding"])
            strings_and_relatednesses.append((row["Description"], similarity))

    # Sort by similarity in descending order
    strings_and_relatednesses.sort(key=lambda x: x[1], reverse=True)

    return [text for text, _ in strings_and_relatednesses[:top_n]]


def chatbot():
    """Main chatbot function that takes user input and returns legal answers."""
    print("\nChatbot: Hi, how can I assist you today?")

    while True:
        user_question = input("\nAsk your legal question (or type 'exit' to quit): ")

        if user_question.lower() == "exit":
            print("Chatbot: Thank you! Have a great day.")
            break

        # Step 1: Extract keywords
        keywords = extract_legal_keywords_nltk(user_question)
        print("Extracted Keywords:", keywords)

        # Step 2: Search CSV database first
        matched_laws = search_law_database(keywords, df)
        csv_answer = generate_answer(matched_laws)

        # Step 3: Use OpenAI embeddings if needed
        ai_answer = None
        if csv_answer is None:
            print("\n🔍 No exact match found in the database. Trying OpenAI embeddings...")
            ranked_results = strings_ranked_by_relatedness(user_question, df)
            if ranked_results:
                ai_answer = "Based on legal knowledge, here is additional information:\n" + "\n\n".join(ranked_results)
            else:
                ai_answer = "Sorry, I couldn't find any relevant information."

        # Step 4: Combine responses
        final_answer = ""
        if csv_answer:
            final_answer += csv_answer
        if ai_answer:
            final_answer += "\n\n" + ai_answer

        print("\nChatbot:", final_answer)


# Run the chatbot
chatbot()
