from flask import Flask, request, jsonify
import pandas as pd
import spacy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend to call backend

# Load NLP model for keyword extraction
nlp = spacy.load("en_core_web_sm")

# Load CSV file
csv_path = r"C:\Users\Janaya Ransiluni\Desktop\chatbot\csvlawdata.csv"
df = pd.read_csv(csv_path, encoding="ISO-8859-1")

def extract_keywords(text):
    """Extracts key legal terms from user input using spaCy NLP."""
    doc = nlp(text.lower())  
    return [token.lemma_ for token in doc if token.pos_ in ["NOUN", "PROPN"]]

def search_csv(keywords, min_match=2, max_results=3):
    """Searches CSV for relevant legal information based on extracted keywords."""
    matches = []
    for _, row in df.iterrows():
        row_text = " ".join(str(value) for value in row.astype(str))
        match_score = sum(1 for keyword in keywords if keyword in row_text.lower())

        if match_score >= min_match:
            matches.append((match_score, row_text))

    matches.sort(reverse=True, key=lambda x: x[0])

    if matches:
        return [match[1] for match in matches[:max_results]]
    else:
        return ["I'm sorry, I couldn't find relevant legal information. Can you clarify your question?"]

@app.route("/chatbot", methods=["POST"])
def chatbot():
    data = request.json
    user_input = data.get("message", "")

    if not user_input:
        return jsonify({"response": "Please enter a valid question."})

    keywords = extract_keywords(user_input)
    base_answers = search_csv(keywords)

    return jsonify({"response": base_answers})

if __name__ == "__main__":
    app.run(debug=True)
