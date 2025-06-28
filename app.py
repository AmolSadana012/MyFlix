from flask import Flask, render_template, request, redirect, url_for, session
import json
from flask import jsonify
# import openai
from flask_cors import CORS
from dotenv import load_dotenv
import os
import requests
from dotenv import load_dotenv
load_dotenv()
# HF_TOKEN = os.getenv("HF_TOKEN")


load_dotenv()  # loads from .env
# openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Required for session handling
CORS(app) 


# Load movie data once on server start
with open('movies.json') as f:
    MOVIES = json.load(f)

@app.route('/api/search')
def api_search():
    query = request.args.get('q', '').strip().lower()
    if not query:
        return jsonify([])

    results = [
        movie for movie in MOVIES
        if movie['title'].strip().lower().startswith(query)
        or movie['description'].strip().lower().startswith(query)
    ]

    # print(f"User query: {query}")
    # print(f"Matched movies: {[movie['title'] for movie in results]}")

    return jsonify(results[:5])  

# Dummy user for login demonstration
USER_CREDENTIALS = {
    "user": "pass"  # username: user, password: pass
}

# Route: Home Page
@app.route('/')
def home():
    if 'user' in session:
        return render_template('index.html')
    return redirect(url_for('login'))

# Route: Login Page
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        if username in USER_CREDENTIALS and USER_CREDENTIALS[username] == password:
            session['user'] = username
            return redirect(url_for('home'))
        else:
            return render_template('login.html', error=True)
    return render_template('login.html', error=False)

# Route: Logout
@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('login'))

# Route: Profile Page
@app.route('/profile')
def profile():
    if 'user' not in session:
        return redirect('/login')
    return render_template('profile.html')

# Route: My List Page
@app.route('/mylist')
def mylist():
    if 'user' in session:
        return render_template('mylist.html')
    return redirect(url_for('login'))

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_msg = data.get("message", "")

    try:
        HF_TOKEN = os.getenv("HF_TOKEN")
        headers = {
            "Authorization": f"Bearer {HF_TOKEN}",
            "Content-Type": "application/json"
        }

        api_url = "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta"

        payload = {
            "inputs": f"""
            You are a friendly and intelligent movie recommendation chatbot on MyFlix.
            Respond naturally based on what the user says — if it's just a greeting, greet them. If they ask for a movie, recommend movies.

            User: {user_msg}
            Assistant:"""

        }

        response = requests.post(api_url, headers=headers, json=payload)
        print("Raw response:", response.text)

        result = response.json()

        # Handle the response
        if isinstance(result, list) and "generated_text" in result[0]:
            bot_reply = result[0]["generated_text"]
        else:
            bot_reply = "Hmm, I didn't get a valid response."

        return jsonify({"reply": bot_reply})

    except Exception as e:
        return jsonify({"reply": f"Sorry, an error occurred: {str(e)}"})

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
