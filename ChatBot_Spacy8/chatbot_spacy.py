from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import torch
import time  #  Replaced datetime with time for better precision
from sentence_transformers import SentenceTransformer, util

app = Flask(__name__)  
CORS(app)  # Enable CORS for frontend-backend communication

# Request counter
request_count = 0  

# Load LegalChatbot model
class LegalChatbotHF:
    def __init__(self, csv_file):  
        """Initialize the chatbot with a legal Q&A database."""
        self.df = pd.read_csv(csv_file, encoding="utf-8").dropna(how="all")
        self.df.columns = self.df.columns.str.strip().str.lower()

        if "question" not in self.df.columns or "answer" not in self.df.columns:
            raise ValueError("CSV file must contain 'question' and 'answer' columns.")

        self.df.fillna("", inplace=True)
        self.model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
        self.question_embeddings = self.model.encode(self.df["question"].tolist(), convert_to_tensor=True)
        print(" Legal Q&A database loaded successfully!")

    def find_best_match(self, query):
        """Find the most relevant question using cosine similarity."""
        query_embedding = self.model.encode(query, convert_to_tensor=True)
        similarities = util.pytorch_cos_sim(query_embedding, self.question_embeddings)[0]
        best_match_idx = torch.argmax(similarities).item()

        if similarities[best_match_idx] < 0.5:
            return "I'm sorry, I couldn't find an answer to your question. Please try rephrasing."

        return self.df.iloc[best_match_idx]["answer"]

print("🚀 Chatbot is initializing...")
chatbot = LegalChatbotHF("laws.csv")

@app.route("/chatbot", methods=["POST"])
def chatbot_response():
    """API endpoint for chatbot responses."""
    global request_count
    request_count += 1  

    start_time = time.time()  # Start tracking response time

    try:
        data = request.json
        user_query = data.get("query", "").strip()

        #  Added logging with timestamp and request count
        timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{timestamp}] (Request #{request_count}) Received query: {user_query}")

        if not user_query:
            return jsonify({"answer": "Please enter a valid question."}), 400

        response = chatbot.find_best_match(user_query)

        #  Log chatbot response along with request count
        print(f"[{timestamp}] (Request #{request_count}) Response: {response[:100]}")  # Limit log length

        #  Calculate response time
        response_time = time.time() - start_time
        print(f"[{timestamp}] Response time: {response_time:.2f} seconds")

        return jsonify({"answer": response, "response_time": f"{response_time:.2f} sec"})
    except Exception as e:
        print(f"❌ Error: {str(e)}")  #  Improved error logging
        return jsonify({"answer": f"Error: {str(e)}"}), 500

#  Health check endpoint with request count info
@app.route("/health", methods=["GET"])
def health_check():
    """Health check endpoint to verify if the API is running."""
    return jsonify({"status": "OK", "total_requests": request_count}), 200

if __name__ == "__main__":  
    print("✅ Server is starting on port 5000...")
    app.run(host="0.0.0.0", port=5000, debug=True)  
