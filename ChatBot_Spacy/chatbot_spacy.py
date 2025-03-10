import pandas as pd
import torch
from sentence_transformers import SentenceTransformer, util

class LegalChatbotHF: 
    def _init_(self, csv_file: str):
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

    def get_response(self, user_input: str) -> str:
        """Generate a response based on user input."""
        return self.find_best_match(user_input)

    def run(self):
        """Run the chatbot in an interactive loop."""
        print("Welcome to the Sri Lankan Legal Information Chatbot!")
        print("Type 'exit' to end the conversation.\n")
        
        while True:
            user_input = input("You: ").strip()
            if user_input.lower() == 'exit':
                print("Thank you for using the Legal Chatbot. Goodbye!")
                break
            response = self.get_response(user_input)
            print("\nChatbot:", response)

if _name_ == "_main_":
    try:
        chatbot = LegalChatbotHF("laws.csv")
        chatbot.run()
    except Exception as e:
        print(f"Error initializing chatbot: {e}")