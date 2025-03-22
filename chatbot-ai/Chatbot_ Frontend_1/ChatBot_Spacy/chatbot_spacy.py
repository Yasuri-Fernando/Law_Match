from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import torch
from sentence_transformers import SentenceTransformer, util

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication

class LegalChatbotHF:
    def __init__(self, csv_file: str):
        """Initialize the chatbot with a legal Q&A database using Hugging Face embeddings."""
        try:
            self.df = pd.read_csv(csv_file, encoding='utf-8')
            self.df = self.df.dropna(how='all')  # Remove empty rows
            self.df.columns = self.df.columns.str.strip().str.lower()

            if 'question' not in self.df.columns or 'answer' not in self.df.columns:
                raise ValueError("CSV file must contain 'question' and 'answer' columns.")

            self.df = self.df.fillna('')  # Fill missing values
            
            # Load a pre-trained model for embedding generation
            self.model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
            
            # Compute embeddings for all questions
            self.question_embeddings = self.model.encode(self.df['question'].tolist(), convert_to_tensor=True)
            print("Legal Q&A database loaded successfully!")
        except Exception as e:
            print(f"Error loading CSV file: {e}")
            raise

    def find_best_match(self, query: str):
        """Find the most relevant question using cosine similarity."""
        try:
            query_embedding = self.model.encode(query, convert_to_tensor=True)
            similarities = util.pytorch_cos_sim(query_embedding, self.question_embeddings)[0]
            best_match_idx = torch.argmax(similarities).item()
            
            if similarities[best_match_idx] < 0.5:
                return "I'm sorry, I couldn't find an answer to your question. Please try rephrasing."
            
            return self.df.iloc[best_match_idx]['answer']
        except Exception as e:
            return f"Error processing your query: {str(e)}"

    def get_response(self, user_input: str):
        """Generate a response based on user input."""
        # Handle greetings and thank you phrases
        user_input_lower = user_input.lower()

        if any(greet in user_input_lower for greet in ["hi", "hello", "hey"]):
            return "Hello! How can I assist you today?", None  # No follow-up question for greetings

        if any(thanks in user_input_lower for thanks in ["thank you", "thanks","thank u"]):
            return "You're welcome!", None  # Respond to thank you phrases

        response = self.find_best_match(user_input)
        follow_up = "What do you want to know more about?"
        
        return response, follow_up  # Returning two separate messages

chatbot = LegalChatbotHF("laws.csv")

@app.route("/chatbot", methods=["POST"])
def chatbot_response():
    """Handle chatbot API requests."""
    data = request.json
    user_query = data.get("query", "")
    
    answer, follow_up = chatbot.get_response(user_query)
    
    response_data = {"answer": answer}
    
    if follow_up:
        response_data["follow_up"] = follow_up  # Send as a separate message
    
    return jsonify(response_data)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
