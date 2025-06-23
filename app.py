from flask import Flask, render_template, request, redirect, url_for, session
import json
from flask import jsonify

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Required for session handling

# Load movie data once on server start
with open('movies.json') as f:
    MOVIES = json.load(f)

@app.route('/api/search')
def api_search():
    query = request.args.get('q', '').lower()
    if not query:
        return jsonify([])

    results = [
        movie for movie in MOVIES
        if movie['title'].lower().startswith(query) or movie['description'].lower().startswith(query)
    ]

    return jsonify(results)

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

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
