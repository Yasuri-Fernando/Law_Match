from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import torch
from sentence_transformers import SentenceTransformer, util

app = Flask(_name_)
CORS(app)  # Enable CORS for frontend-backend communication

# Load LegalChatbot model
class LegalChatbotHF:
    def _init_(self, csv_file):
        """Initialize the chatbot with a legal Q&A database."""
        self.df = pd.read_csv(csv_file, encoding="utf-8").dropna(how="all")
        self.df.columns = self.df.columns.str.strip().str.lower()

        if "question" not in self.df.columns or "answer" not in self.df.columns:
            raise ValueError("CSV file must contain 'question' and 'answer' columns.")

        self.df.fillna("", inplace=True)
        self.model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
        self.question_embeddings = self.model.encode(self.df["question"].tolist(), convert_to_tensor=True)
        print("Legal Q&A database loaded successfully!")

    def find_best_match(self, query):
        """Find the most relevant question using cosine similarity."""
        query_embedding = self.model.encode(query, convert_to_tensor=True)
        similarities = util.pytorch_cos_sim(query_embedding, self.question_embeddings)[0]
        best_match_idx = torch.argmax(similarities).item()

        if similarities[best_match_idx] < 0.5:
            return "I'm sorry, I couldn't find an answer to your question. Please try rephrasing."

        return self.df.iloc[best_match_idx]["answer"]

# Initialize chatbot
chatbot = LegalChatbotHF("laws.csv")

@app.route("/chatbot", methods=["POST"])
def chatbot_response():
    """API endpoint for chatbot responses."""
    try:
        data = request.json
        user_query = data.get("query", "").strip()
        if not user_query:
            return jsonify({"answer": "Please enter a valid question."}), 400

        response = chatbot.find_best_match(user_query)
        return jsonify({"answer": response})
    except Exception as e:
        return jsonify({"answer": f"Error: {str(e)}"}), 500

if _name_ == "_main_":
    app.run(host="0.0.0.0", port=5000, debug=True)