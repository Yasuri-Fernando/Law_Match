import json
import pandas as pd
import spacy
from flask import Flask, request, jsonify
from flask_cors import CORS

# Load spaCy NLP model
nlp = spacy.load("en_core_web_sm")

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Load JSON Database
try:
    with open("database.json", "r") as file:
        data = json.load(file)
    df = pd.DataFrame.from_dict(data, orient="index")
except Exception as e:
    print("Error loading database.json:", e)
    df = pd.DataFrame()

# Synonym Mapping (Add more as needed)
synonyms = {
    "procedure": "process",
    "process": "procedure",
    "lawsuit": "case",
    "petition": "application"
}

# Function to extract important words from user input
def extract_keywords(user_input):
    doc = nlp(user_input.lower())
    keywords = []

    for token in doc:
        # Exclude stopwords, punctuation, and numbers
        if not token.is_stop and not token.is_punct and not token.like_num:
            word = token.lemma_  # Use base form of the word (e.g., "filing" → "file")
            if word in synonyms:
                word = synonyms[word]  # Replace with synonym
            keywords.append(word)
    
    print(f"Extracted keywords: {keywords}")  # Debugging print
    return keywords

# Function to find the most relevant case based on user input
def find_case_type(user_input):
    keywords = extract_keywords(user_input)

    best_match = None
    best_score = 0

    for case in df.index:
        case_text = case.replace("_", " ")  # Convert "filing_civil_lawsuit" to "filing civil lawsuit"
        case_keywords = extract_keywords(case_text)

        # Calculate similarity (common keyword count)
        match_count = sum(1 for word in keywords if word in case_keywords)
        similarity = match_count / max(len(case_keywords), 1)  # Avoid division by zero

        # Select the best matching case
        if similarity > best_score:
            best_score = similarity
            best_match = case

    print(f"Matched case type: {best_match} (Score: {best_score})")  # Debugging print
    return best_match

# API Endpoint to Greet User
@app.route("/greet", methods=["GET"])
def greet():
    return jsonify({"message": "Hello! How can I assist you with legal procedures today?"})

# API Endpoint to Get Step-by-Step Guidance
@app.route("/getSteps", methods=["POST"])
def get_steps():
    data = request.json
    user_input = data.get("query", "").strip()

    if not user_input:
        return jsonify({"error": "Invalid input. Please enter a procedure name."}), 400

    case_type = find_case_type(user_input)

    if case_type:
        steps = df.loc[case_type, "steps"]
        return jsonify({"title": df.loc[case_type, "title"], "steps": steps})
    else:
        return jsonify({"error": "Sorry, I couldn't find a matching procedure."}), 404

if __name__ == "__main__":
    app.run(debug=True, port=5000)
