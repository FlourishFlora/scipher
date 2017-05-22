import subprocess
from flask import Flask, render_template, redirect, url_for, session, request
app = Flask(__name__)
random_text = ""

@app.route("/")
def home():
    return render_template("index.html", random_text = random_text)

@app.route("/generate")
def generate_text():
    return get_random_text("haha")
def get_random_text(string):
    pipe = subprocess.Popen(["echo", string], stdout = subprocess.PIPE)
    output = subprocess.check_output(["./encode.py"], stdin = pipe.stdout)
    return output

if __name__ == "__main__":
    random_text = get_random_text("hey")
    app.run(debug = True)