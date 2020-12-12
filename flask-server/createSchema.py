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
    store = Store(name="Walmart")
    store.lat = 33.34
    store.lng = 34.33
    store._id= 7
    store.save()


createStore()
