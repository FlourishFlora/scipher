import subprocess
from similarity import cosine_sim
from flask import Flask, render_template, redirect, url_for, session, request, jsonify
from Queue import Queue
from threading import Thread
app = Flask(__name__)
random_text = ""
buffer = Queue(maxsize = 100)
current_secret = ""
high_score = 0

@app.route("/")
def home():
    return render_template("index.html", random_text = random_text)

@app.route("/generate")
def generate_text():
    print(request.args.get("arg"))
    return buffer.get()
def get_random_text(string):
    pipe = subprocess.Popen(["echo", string], stdout = subprocess.PIPE)
    output = subprocess.check_output(["./encode.py"], stdin = pipe.stdout)
    return output
def worker():
    print("thread started")
    while True:
        if not buffer.full():
            buffer.put(get_random_text(current_secret))
def get_closest_match():
    curr_text = buffer.pop()
    curr_score = cosine_sim(text, curr_text)
    if curr_score > high_score:
        high_score = curr_score
        response = {data: curr_text, new_high_score: true}
        return jsonify(response)
    else:
        response = {data: curr_text, new_high_score: false}
        return jsonify(response)

if __name__ == "__main__":
    random_text = get_random_text("hey")
    worker_thread = Thread(target = worker)
    worker_thread.setDaemon(True)
    worker_thread.start()
    app.run(debug = True)