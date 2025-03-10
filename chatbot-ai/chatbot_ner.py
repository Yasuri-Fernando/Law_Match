import pymysql
import spacy

# Database Configuration
DATABASE_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "Bienme@kid#03",
    "database": "lawmatch_db",
    "cursorclass": pymysql.cursors.DictCursor  # Ensures results are returned as dictionaries
}

# Connect to the database
def connect_db():
    try:
        conn = pymysql.connect(**DATABASE_CONFIG)
        return conn
    except pymysql.MySQLError as e:
        print(f"[ERROR] Database connection failed: {e}")
        return None

# Load SpaCy NER model
nlp = spacy.load("en_core_web_sm")

# Extract named entities from user input
def extract_entities(user_input):
    doc = nlp(user_input)
    entities = {ent.label_: ent.text for ent in doc.ents}
    return entities

# Fetch legal information from the database
def fetch_law_info(entities):
    conn = connect_db()
    if not conn:
        return "[ERROR] Could not connect to the database. Please check your connection."

    try:
        with conn.cursor() as cursor:
            # Construct SQL query
            query = """
                SELECT act_no, title, description 
                FROM laws 
                WHERE act_no = %s OR title LIKE %s
            """
            search_term = f"%{entities.get('LAW', '')}%"
            cursor.execute(query, (entities.get("LAW", ""), search_term))
            results = cursor.fetchall()

            if results:
                return "\n".join(
                    [f"📜 Act No: {row['act_no']}, Title: {row['title']}\n📖 {row['description']}" for row in results]
                )
            else:
                return "❌ No matching law found. Please try another query."

    except pymysql.MySQLError as e:
        return f"[ERROR] Database query failed: {e}"

    finally:
        conn.close()

# Chatbot Function
def chatbot():
    print("🤖 Welcome to LawMatch Chatbot! Type 'exit' to stop.")
    while True:
        user_input = input("You: ")
        if user_input.lower() == "exit":
            print("👋 Goodbye!")
            break

        entities = extract_entities(user_input)
        response = fetch_law_info(entities)
        print("Bot:", response)

# Run the chatbot
chatbot()