import subprocess
from flask import Flask, render_template, redirect, url_for, session, request
from Queue import Queue
from threading import Thread
app = Flask(__name__)
random_text = ""
buffer = Queue(maxsize = 100)

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

def worker():
    return

if __name__ == "__main__":
    random_text = get_random_text("hey")
    app.run(debug = True)
    worker_thread = Thread(target = worker)
    worker_thread.setDaemon(True)
    #worker_thread.start()
    #buffer = [get_random_text("aye aye captain") for i in range(0, 5)]
    #print(buffer)