from flask import (Flask, render_template, request)
# from schemas import *
from schemas import createNewStore
# from createSchema import createStore

import mongoengine


app = Flask("__main__")


@app.route("/")
def my_index():
    # , flask_token="Hello   world"
    return render_template("index.html")


@app.route("/admin/newstore")
def newStore():
    return render_template("index.html")


@app.route("/admin/newstore", methods=["POST"])
def newStorePost():
    if request.method == "POST":
        storeName = request.form["storeName"]
        storeLng = float(request.form["storeLng"])
        storeLat = float(request.form["storeLat"])
        # print(storeLng)
        # print(storeLat)
        createNewStore(storeName=storeName,
                       storeLng=storeLng, storeLat=storeLat)
        return render_template("index.html")
        # return render_template("home.html")


app.run(debug=True)
