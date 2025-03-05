from flask import Flask, request, jsonify
import pandas as pd
import re
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

# Load CSV file
csv_path = r"C:\Users\Janaya Ransiluni\Desktop\chatbot\csvlawdata.csv"
df = pd.read_csv(csv_path, encoding="ISO-8859-1")

# Clean column names
df.columns = df.columns.str.strip()

def extract_keywords(text):
    """Extracts significant words (excluding common stopwords)."""
    words = re.findall(r'\b\w+\b', text.lower())  # Extract words
    stopwords = {"the", "is", "in", "on", "and", "for", "of", "to", "a", "are", "with", "by"}  # Basic stopwords
    return [word for word in words if word not in stopwords]

def format_answer(row):
    """Formats the chatbot response in a structured and human-friendly way."""
    act_name = row['Act Name']
    year = row['Year']
    category = row['Law  Category']
    domain = row['Legal Domain']
    description = row['Description']

    # Limit description length for better readability
    if len(description) > 300:
        description = description[:300] + "..."

    response = (
        f"🔹 **Law Category**: {category}\n"
        f"🔹 **Legal Domain**: {domain}\n"
        f"🔹 **Act Name**: {act_name} ({year})\n"
        f"📜 **Summary**: {description}\n"
        f"🔗 For more details, please check the full legal document."
    )
    return response

def search_csv(keywords, min_match=1, max_results=3):
    """Searches CSV for relevant legal information and returns formatted responses."""
    matches = []
    for _, row in df.iterrows():
        row_text = f"{row['Law  Category']} {row['Legal Domain']} {row['Act No']} {row['Year']} {row['Act Name']} {row['Description']}"
        row_text_lower = row_text.lower()
        
        match_score = sum(1 for keyword in keywords if keyword in row_text_lower)

        if match_score >= min_match:
            matches.append((match_score, row))

    matches.sort(reverse=True, key=lambda x: x[0])

    if matches:
        return [format_answer(match[1]) for match in matches[:max_results]]
    else:
        return ["I'm sorry, I couldn't find relevant legal information. Can you clarify your question?"]

@app.route("/chatbot", methods=["POST"])
def chatbot():
    """Handles chatbot requests from the frontend."""
    data = request.json
    user_input = data.get("message", "").strip()

    if not user_input:
        return jsonify({"response": "Please enter a valid question."})

    keywords = extract_keywords(user_input)
    base_answers = search_csv(keywords)

    return jsonify({"response": base_answers})

if __name__ == "__main__":
    app.run(debug=True)
