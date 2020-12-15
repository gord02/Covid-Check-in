# import Store from schemas
import mongoengine
from schemas import Store
from mongoengine import StringField, IntField, ListField, Document, connect
# ross = User(email='ross@example.com')
# ross.first_name = 'Ross'
# ross.last_name = 'Lawley'
# ross.save()
connect(db='covid-checkin')

print("outside")


def createStore():
    print("inside")
    store = Store(name="Jack Astor's")
    store.lat = 53.54
    store.lng = 54.55
    # store._id= 7
    store.save()

# def createCounter():
    # counter = Counter(number= 0)
    # counter.storeId= 
    # counter.save()  

# createStore()
# createCounter()
