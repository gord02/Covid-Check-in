from flask import (Flask, render_template)
from schemas import Checking, Users, Stores
import mongoengine


app = Flask("__main__")


@app.route("/")
def my_index():
    return render_template("index.html", flask_token="Hello   world")


app.run(debug=True)
