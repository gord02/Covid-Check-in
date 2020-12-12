import mongoengine
# from mongoengine import connect
from flask import (Flask, render_template, request)
# from flask import Flask, render_template, request
# from schemas import *
from schemas import createNewStore
from schemas import Store
from schemas import User
from schemas import Checkin
# from schemas import Movie
import json
# from createSchema import createStore

from mongoengine import connect
# connect(db='cc')
connect(db='covid-checkin')

app = Flask("__main__")

@app.route("/")
def my_index():
    # , flask_token="Hello   world"
    return render_template("index.html")


@app.route("/api/newstore")
def newStore():
    return render_template("index.html")


@app.route("/api/newstore", methods=["POST"])
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


@app.route("/api/stores")
def allStores():
    # Converting mongoengine objects to JSON to be used by axios
    all_stores = Store.objects()
    json_data = all_stores.to_json()
    print(type(json_data))
    # allows json to be found on this route
    return json_data

# additonal signup sutff, sotre additional name for user
@app.route("/api/createUser", methods=['POST'])
def createUser():
    if request.method == 'POST':
        form= request.get_json()
        # print("================this is the request", form,  "---", type(form))
        name= form['name']
        email= form['email']
        _id= form['firebaseId']
        # print("userInfo:   ", name, email, _id)
        user = User(name=name)
        user.email= email
        user._id= _id
        user.save()     
        # nameJson = eval(nameJs)
        # print("namejson: ", nameJson, "type: ", type(nameJson))
    # print("name: ", name)
    # nameJs= json.dumps(name)
    # print("namejs: ", nameJs, "type: ", type(nameJs))
    return "ok"

#route to get the username 
@app.route("/api/getUser")
#in fronterd in app firbase logic is cotained, when user is loggged in update state vairble for user id and user name, get request from backend function name: getUserName, then pass vairbles to navbar, axios get request in Apps
def getUser():
    form1= request.args
    Id= form1['firebaseId']
    # print("Id: ", Id, "type: ", type(Id))
# GO INTO MONGODB, FIND USER
    currentUser = User.objects(_id=Id)
    # print("current user var: ", currentUser, "type of: ", type(currentUser))
    name = currentUser.to_json()
    # print("Name: ", name, "name: ", type(name))
    # name= currentUser.name
# GET USER INFORMATION
    return name

@app.route("/checkin")
def CurrentlyCheckedinStore():
    # based on firebase Id which is sent from frontend checkin component, use id to to query store collection
    return
    # (in frontend) if axios get request is none, then display message saying no currently signed in store and link to search route

@app.route("/api/checkInto", methods=['POST'])
def checkInto():
    if request.method == "POST":
    #rertiees object of store user signed into
        form= request.get_json()
        print("form: ", form)

        currentUsersId= form['firebaseId'];
        timeIn= form['time'];
        timeOut= form['time'];

        obj=form["i"]
        storeName= obj['name'];
        storeId= obj['_id'];

        # create checkin in database
        checkin = Checkin(number=1)
        checkin.userId= currentUsersId
        checkin.storeId= storeId
        checkin.timeIn= timeIn
        checkin.timeOut= timeIn
        checkin.save()  
    return "ok"

@app.route("/search")
def printAllStores():
    # displays all stores
    # access database and then print them to page in grid
    # allStores = Store.objects()
    # return allStores
# needed to correctly catch routes
    return "ok"
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template("index.html")

app.run(debug=True)

