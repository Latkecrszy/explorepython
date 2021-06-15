from flask import Flask, make_response, jsonify, request, render_template, redirect, send_file
from mistune import Markdown
import json

app = Flask(__name__)
markdown = Markdown()


@app.route("/compile")
def compile_code():
    return render_template("compile.html",
                           name="intro",
                           code='\n'.join(json.load(open("resources/code.json"))['intro']),
                           expected_output=json.load(open("resources/expected_output.json"))['intro'])

# TODO: Order: Intro, variables, strings, builtins, ints_and_floats, math, booleans, if_statements, lists, dictionaries, functions


@app.route("/lesson", methods=["GET", "POST"])
def lesson():
    return markdown(open(f"lessons/{request.args.get('name')}.md").read())


if __name__ == '__main__':
    app.run(port=5004)
