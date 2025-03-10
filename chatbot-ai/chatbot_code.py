import pandas as pd
import re

# Load the law data CSV
df = pd.read_csv("lawdata.csv", encoding="ISO-8859-1")

# Define specific legal keywords to look for in the user input
legal_keywords = ["divorce", "child custody", "domestic violence", "marriage", "alimony", "family law","criminal Law","land law","kanadyan marriage"]

def extract_keyword(user_input):
    # Convert user input to lowercase
    user_input = user_input.lower()
    
    # Check if any keyword from the legal_keywords list exists in the input
    for keyword in legal_keywords:
        if keyword in user_input:
            return keyword  # Return the first matched keyword

    return None  # No keyword found

# Chatbot function
def chatbot():
    print("Welcome to the LawMatch Chatbot! Type 'exit' to end the chat.")
    
    while True:
        user_input = input("You: ").strip().lower()
        if user_input == "exit":
            print("Chatbot: Goodbye!")
            break

        # Extract keyword from the user input
        keyword = extract_keyword(user_input)
        
        if keyword:
            # Look for matches in the law data for the identified keyword
            matches = df[df.apply(lambda row: row.astype(str).str.contains(keyword, case=False, na=False).any(), axis=1)]
            if not matches.empty:
                print(f"Chatbot: Here’s what I found about '{keyword}':\n", matches.iloc[0].to_dict())
            else:
                print("Chatbot: Sorry, I couldn’t find relevant legal information for that keyword.")
        else:
            print("Chatbot: Sorry, I couldn’t find relevant legal information. Can you rephrase?")

# Run the chatbot
chatbot()
