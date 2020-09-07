import mongoengine
from flask import (Flask, render_template, request)
# from schemas import *
from schemas import createNewStore
from schemas import Store
from schemas import Movie
# from createSchema import createStore

from mongoengine import connect
connect(db='cc')

app = Flask("__main__")

# app.config.from_pyfile('the-config.cfg')
# db = MongoEngine(app)
# app.config['MONGODB_DB'] = 'cc'


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


@app.route("/admin/stores")
def allStores():
    # stores = mongo.db.store.find({})
    # todo = Todo.objects.get_or_404(_id=todo_id)
    # stores = store.store.get_or_404()
    # for Store.name in Store:
    # for x in Store:
    # print(Store.name)
    # print(Store.name)
    # print(Store.name)
    # for store in Store:
    #     print(store.name)
    # Store.objects.first()
    # Movie.objects.first()
    # stores = cc.store.find()
    # for x in stores:
    #     print(x)
    return render_template("index.html")
    # stores=stores


app.run(debug=True)
