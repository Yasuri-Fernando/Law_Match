import pandas as pd
import spacy
import re

# Load spaCy model
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    import subprocess
    subprocess.run(["python", "-m", "spacy", "download", "en_core_web_sm"], check=True)
    nlp = spacy.load("en_core_web_sm")

class LegalChatbot:
    def __init__(self, csv_file: str):
        """Initialize the chatbot with the law database."""
        try:
            # Try multiple encodings in case of decoding errors
            encodings = ['utf-8', 'ISO-8859-1', 'Windows-1252']
            for encoding in encodings:
                try:
                    self.df = pd.read_csv(csv_file, encoding=encoding)
                    break  # If successful, stop trying different encodings
                except UnicodeDecodeError:
                    continue  # Try the next encoding
            else:
                raise ValueError("Failed to decode CSV file with supported encodings.")

            # Drop empty rows and columns
            self.df = self.df.dropna(how='all', axis=0)
            self.df = self.df.dropna(how='all', axis=1)

            # Normalize column names (remove spaces and make lowercase)
            self.df.columns = self.df.columns.str.strip().str.lower().str.replace(' ', '_')

            # Print column names for debugging
            print("Available columns in CSV:", self.df.columns.tolist())

            # Clean the data (fill NaN with empty strings)
            self.df = self.df.fillna('')

            print("Successfully loaded the legal database!")

        except Exception as e:
            print(f"Error loading CSV file: {e}")
            raise

    def find_relevant_laws(self, query: str, top_k: int = 3):
        """Find relevant laws based on the query."""
        try:
            query = query.lower()
            matches = []

            print(f"User Query: {query}")  # Debugging query input

            for idx, row in self.df.iterrows():
                act_no = str(row.get('act_no', ''))  # Include act_no
                act_name = str(row.get('act_name', ''))
                description = str(row.get('description', ''))
                category = str(row.get('law_category', ''))

                score = sum(
                    word in act_name.lower() for word in query.split()
                ) * 2 + sum(
                    word in description.lower() for word in query.split()
                ) + sum(
                    word in category.lower() for word in query.split()
                ) * 1.5

                if score > 0:
                    matches.append((score, idx))

            matches.sort(reverse=True, key=lambda x: x[0])
            results = []

            for _, idx in matches[:top_k]:
                row = self.df.iloc[idx]
                results.append({
                    'act_no': row.get('act_no', ''),  # Include act_no in results
                    'act_name': row.get('act_name', ''),
                    'category': row.get('law_category', ''),
                    'description': row.get('description', '')
                })

            if not results:
                print("No matching laws found.what do you want know about?")  # Debugging message

            return results

        except Exception as e:
            print(f"Error in search: {e}")
            print("Debug info - DataFrame columns:", self.df.columns.tolist())
            return []

    def get_response(self, user_input: str) -> str:
        """Generate a response based on user input."""
        try:
            results = self.find_relevant_laws(user_input)

            if not results:
                return "I couldn't find specific legal information related to your query. Could you please rephrase or be more specific?"

            response = "Here's what I found in the Sri Lankan legal system:\n\n"
            for idx, result in enumerate(results, 1):
                response += f"{idx}. {result['act_name']} (Act No: {result['act_no']})\n"
                response += f"Category: {result['category']}\n"
                response += f"Description: {result['description']}\n\n"

            return response

        except Exception as e:
            return f"I encountered an error while processing your query: {str(e)}"

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

if __name__ == "__main__":
    try:
        chatbot = LegalChatbot("law_data_2.csv")
        chatbot.run()
    except Exception as e:
        print(f"Error initializing chatbot: {e}")