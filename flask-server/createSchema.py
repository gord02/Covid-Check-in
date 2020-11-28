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
    store = Store(name="Freshco")
    store.lat = 33.33
    store.lng = 33.33
    store.save()


createStore()
