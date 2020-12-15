import mongoengine
from flask import (Flask, render_template, request)

from schemas import createNewStore
from schemas import Store
from schemas import User
from schemas import Checkin
from schemas import Counter

import json

from mongoengine import connect
# allows use to add to the database in mongoDB called covid-checkin
connect(db='covid-checkin')

app = Flask("__main__")

@app.route("/")
def my_index():
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
        print("store name", storeName, type(storeName))
        name= storeName
   
        createNewStore(storeName=storeName,storeLng=storeLng, storeLat=storeLat)
        store = Store.objects(storeLng= storeLng,storeLat=storeLat)
        store = Store.objects(name=name)
        
        # converts to mongoengine to json object
        storeObj = Store.objects.get(name=storeName,lng=storeLng, lat=storeLat)
        obj= storeObj.to_json()
        new = json.loads(obj)
        print("new: ", new["_id"],"type:", type(new))
        Dict= new["_id"]
        id= Dict['$oid']
        print("id: ", id)

        # Creates counter for each store for when user checkins into that store
        counter = Counter(number= 0)
        counter.storeId= id
        counter.save()  

        return render_template("index.html")

@app.route("/api/stores")
def allStores():
    # Converting mongoengine objects to JSON to be used by axios
    all_stores = Store.objects()
    json_data = all_stores.to_json()
    print(type(json_data))
    # allows json datd to be found on this route
    return json_data

# additonal signup sutff, sotre additional name for user
@app.route("/api/createUser", methods=['POST'])
def createUser():
    if request.method == 'POST':
        form= request.get_json()
        name= form['name']
        email= form['email']
        _id= form['firebaseId']
        # print("userInfo:   ", name, email, _id)
        # Creates user in mongoDB
        user = User(name=name)
        user.email= email
        user._id= _id
        user.save()     
    return "ok"

#route to get the username 
@app.route("/api/getUser")
#in fronterd in app firbase logic is cotained, when user is loggged in update state vairble for user id and user name, get request from backend function name: getUserName, then pass vairbles to navbar, axios get request in Apps
def getUser():
    form1= request.args
    Id= form1['firebaseId']
# GO INTO MONGODB, FIND USER
    currentUser = User.objects(_id=Id)
    # print("current user var: ", currentUser, "type of: ", type(currentUser))
    name = currentUser.to_json()
    # print("Name: ", name, "name: ", type(name))
    # name= currentUser.name
# GET USER INFORMATION
    return name

# @app.route("/checkin")
# def CurrentlyCheckedinStore():
#     return

@app.route("/api/checkInto", methods=['POST'])
def checkInto():
    if request.method == "POST":
    #rertives object of store user signed into
        form= request.get_json()
        print("form: ", form)

        # saves infomration from form to varibles that can be used
        currentUsersId= form['firebaseId'];
        timeIn= form['time'];
        timeOut= form['time'];
        storeId= form['storeId'];

        obj=form["i"]
        storeName= obj['name'];

        # create checkin in database
        checkin = Checkin(number=1)
        checkin.userId= currentUsersId
        checkin.name= storeName
        checkin.storeId= storeId
        checkin.timeIn= timeIn
        checkin.timeOut= "0"
        checkin.save()  

        # updates counter to reflect the recently checkedin user 
        counter = Counter.objects(storeId=storeId)
        obj= counter.to_json()
        new = json.loads(obj)
        print("new: ", new, type(new))
        new1= new[0]
        number= new1["number"]
        print("number: ", number)
        updated= number+1
        counter.update(set__number=str(updated))
    return "ok"

@app.route("/api/checkins")
def getCheckinforUser():
    # access database and then print them to page in grid
    form1= request.args
    Id= form1['firebaseId']
    checkin = Checkin.objects(userId=Id, timeOut="0")
    checkins = checkin.to_json()
        # name = currentUser.to_json()
    return checkins

@app.route("/api/allCheckins")
def allCheckins():
    # access database and then print them to page in grid
    form1= request.args
    Id= form1['firebaseId']
    all_checkin = Checkin.objects(userId=Id)
    # all_stores = Store.objects()
    # json_data = all_stores.to_json()
    checkins = all_checkin.to_json()
        # name = currentUser.to_json()
    return checkins

@app.route("/api/updateCheckin", methods=['POST'])
def updateCheckin():
  if request.method == "POST":
    #rertiees object of store user signed into
    form= request.get_json()
    print("form: ", form)
    Id= form['firebaseId']
    timeOut= form['timeOut']
    checkin = Checkin.objects(userId=Id, timeOut="0")
    # checkinObj = Checkin.objects.get(storeId=storeId)
    obj= checkin.to_json()
    new = json.loads(obj)
    print("new: ", new, type(new))
    new1= new[0]
    storeId= new1["storeId"]
    print("storeId: ", storeId)
    # updates timout viarble for doucment  in mongodb using set__VARIBLEINDOUCMENT= str(NEWVARIBLE)
    checkin.update(set__timeOut=str(timeOut))
    print("timeout:", str(timeOut), timeOut)
    counter = Counter.objects(storeId=storeId)
    obj= counter.to_json()
    new = json.loads(obj)
    print("new: ", new, type(new))
    new1= new[0]
    number= new1["number"]
    print("number: ", number)
    updated= number-1
    counter.update(set__number=str(updated))
    return "ok"

# @app.route("/api/updateCheck", methods=['POST'])
# def addingToStore():
#   if request.method == "POST":
#     form= request.get_json()
#     print("form: ", form)
#     Id= form['firebaseId']
#     checkin = Checkin.objects(userId=Id)
#     counter = Counter.objects()
#     checkin.update(set__counter=(counter+ 1))
#     #rertiees object of store user signed into
#     # create counter for mongodb datatbase

#     # form= request.get_json()
#     # print("form: ", form)
@app.route("/api/capacityOfStore")
def capacityOfStore():
    # List = [] 
    # for counter in Counter.objects:
    #     print (counter.number)
    #     List.append(counter.number)
    # # strList= List.to_json()
    # print("list type: ", type(List))


    # d = {'key': 'value'}
    # print(d)
    # # {'key': 'value'}
    # d['mynewkey'] = 'mynewvalue'
    # print(d)
    # # {'key': 'value', 'mynewkey': 'mynewvalue'}
    all_counters = Counter.objects()
    counters= all_counters.to_json()
    # Dict={}
    # for counter in Counter.objects:
        # Dict[]= counter.number
        # print(Dict)
    # print("DICT type: ", type(Dict))
    
    return counters

# ============================ 
# DELETE ROUTE
# ============================ 
# route to delete Checkins
# route to delete store
# route to delete user
# route to delete counter


# needed to correctly catch routes
    return "ok"
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template("index.html")

app.run(debug=True)

