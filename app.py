from flask import Flask, make_response, jsonify, request, render_template, redirect, send_file

app = Flask(__name__)


@app.route("/compile")
def compile_code():
    return render_template("compile.html")


if __name__ == '__main__':
    app.run(port=5004)
