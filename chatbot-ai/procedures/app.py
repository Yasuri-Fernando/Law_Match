import json
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

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

# Function to find the most relevant case based on user input
def find_case_type(user_input):
    user_input = user_input.lower()
    print(f"User input: {user_input}")  # Debugging print

    # Best match case
    best_match = None
    best_score = 0

    for case in df.index:
        case_text = case.replace("_", " ")  # Convert "filing_civil_lawsuit" to "filing civil lawsuit"
        
        # Count how many words from user input appear in case_text
        match_count = sum(1 for word in user_input.split() if word in case_text)

        # If more than 50% of the words match, consider it a match
        if match_count / len(case_text.split()) > 0.5:
            if match_count > best_score:
                best_score = match_count
                best_match = case

    print(f"Matched case type: {best_match}")  # Debugging print
    return best_match

# API Endpoint to Greet User
@app.route("/greet", methods=["GET"])
def greet():
    return jsonify({"message": "Hi! What procedure do you want to know today?"})

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
