from flask import Flask, make_response, jsonify, request, render_template, redirect, send_file
from mistune import Markdown
import json, os, dotenv
from flask_pymongo import PyMongo

app = Flask(__name__)
dotenv.load_dotenv()
if os.environ.get("MONGO_URI", None):
    app.config['MONGO_URI'] = os.environ.get("MONGO_URI", None)
    mongo = PyMongo(app)
else:
    mongo = None
markdown = Markdown()


@app.route("/lessons")
def compile_code():
    return render_template("compile.html")


@app.route("/lesson", methods=["GET", "POST"])
def lesson():
    content = markdown(open(f"lessons/{request.args.get('name')}.md").read())
    code = '\n'.join(json.load(open("resources/code.json"))[request.args.get('name')])
    expected_output = json.load(open("resources/expected_output.json"))[request.args.get('name')]
    return jsonify({"lesson": content, "code": code, "expected_output": expected_output, "name": request.args.get('name')})


if __name__ == '__main__':
    app.run(port=5004)
