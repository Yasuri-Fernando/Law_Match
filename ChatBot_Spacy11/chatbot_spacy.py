from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import torch
import time
import threading
import atexit
import logging
from sentence_transformers import SentenceTransformer, util

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication

#  Request counter with thread safety
request_count = 0
request_lock = threading.Lock()

#  Track server uptime
start_time = time.time()


class LegalChatbotHF:
    def __init__(self, csv_file):
        """Initialize the chatbot with a legal Q&A database."""
        try:
            self.df = pd.read_csv(csv_file, encoding="utf-8").dropna(how="all")
            self.df.columns = self.df.columns.str.strip().str.lower()

            if "question" not in self.df.columns or "answer" not in self.df.columns:
                raise ValueError("CSV file must contain 'question' and 'answer' columns.")

            self.df.fillna("", inplace=True)
            self.model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
            self.question_embeddings = self.model.encode(self.df["question"].tolist(), convert_to_tensor=True)
            logging.info(" Legal Q&A database loaded successfully!")
        except Exception as e:
            logging.error(f"❌ Error loading chatbot data: {e}")
            raise RuntimeError("Failed to initialize chatbot.")

    def find_best_match(self, query):
        """Find the most relevant question using cosine similarity."""
        try:
            query_embedding = self.model.encode(query, convert_to_tensor=True)
            similarities = util.pytorch_cos_sim(query_embedding, self.question_embeddings)[0]
            best_match_idx = torch.argmax(similarities).item()
            confidence_score = similarities[best_match_idx].item()

            if confidence_score < 0.5:
                return "I'm sorry, I couldn't find an answer to your question. Please try rephrasing.", confidence_score

            return self.df.iloc[best_match_idx]["answer"], confidence_score
        except Exception as e:
            logging.error(f"❌ Error in find_best_match: {e}")
            return "An internal error occurred while searching for the best match.", 0.0


logging.info("🚀 Chatbot is initializing...")
try:
    chatbot = LegalChatbotHF("laws.csv")
except RuntimeError:
    logging.error("❌ Failed to start chatbot due to data loading issue.")


@app.route("/chatbot", methods=["POST"])
def chatbot_response():
    """API endpoint for chatbot responses."""
    global request_count
    with request_lock:
        request_count += 1

    request_time = time.time()  # Track time before processing

    try:
        data = request.get_json(silent=True)
        if not data or "query" not in data:
            return jsonify({"answer": "Invalid request format. Please provide a query."}), 400

        user_query = data.get("query", "").strip()
        if not user_query:
            return jsonify({"answer": "Please enter a valid question."}), 400

        timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
        logging.info(f"[{timestamp}] (Request #{request_count}) Received query: {user_query}")

        response, confidence = chatbot.find_best_match(user_query)

        response_time = time.time() - request_time
        logging.info(f"[{timestamp}] Response time: {response_time:.2f} seconds | Confidence: {confidence:.2f}")

        return jsonify({
            "answer": response,
            "confidence": f"{confidence:.2f}",
            "response_time": f"{response_time:.2f} sec"
        })
    except Exception as e:
        logging.error(f"❌ Error: {str(e)}")
        return jsonify({"answer": f"Error: {str(e)}"}), 500


@app.route("/health", methods=["GET"])
def health_check():
    """Health check endpoint to verify if the API is running."""
    uptime = time.time() - start_time
    return jsonify({"status": "OK", "total_requests": request_count, "uptime": f"{uptime:.2f} sec"}), 200


def shutdown_server():
    """Graceful shutdown handler."""
    logging.info("🛑 Server shutting down gracefully.")


if __name__ == "__main__":
    logging.info(" Server is starting on port 5000...")
    atexit.register(shutdown_server)  #  Ensures cleanup on exit
    try:
        app.run(host="0.0.0.0", port=5000, debug=True)
    except KeyboardInterrupt:
        logging.info("🛑 Server shutting down due to keyboard interrupt.")
