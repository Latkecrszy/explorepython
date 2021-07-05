from flask import Flask, make_response, jsonify, request, render_template, redirect, send_file
from mistune import Markdown
import json, os, dotenv
from flask_pymongo import PyMongo

app = Flask(__name__)
dotenv.load_dotenv()
"""if os.environ.get("MONGO_URI", None):
    app.config['MONGO_URI'] = os.environ.get("MONGO_URI", None)
    mongo = PyMongo(app)
else:
    mongo = None"""
markdown = Markdown()


@app.route("/")
def main():
    return render_template("index.html")


@app.route("/lessons")
def lessons():
    return render_template("lessons.html")


@app.route("/lesson", methods=["GET", "POST"])
def lesson():
    name = request.args.get('name')
    if name == "null":
        name = "intro"
    content = markdown(open(f"lessons/{name}.md").read())
    if name != "final":
        code = '\n'.join(json.load(open("resources/code.json"))[name])
        expected_output = json.load(open("resources/expected_output.json"))[name]
        hints = json.load(open("resources/hints.json"))[name]
    else:
        code = ""
        expected_output = {"output":  [], "input": {"includes":  [], "excludes":  []}}
        hints = []
    return jsonify({"lesson": content, "code": code, "expected_output": expected_output, "name": name, "hints": hints})


@app.route("/arc-sw.js")
def arc():
    return send_file("arc-sw.js")


if __name__ == '__main__':
    app.run(port=5004)
