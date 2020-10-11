import mongoengine
from mongoengine import StringField, IntField, ListField, Document, connect, EmbeddedDocument, EmbeddedDocumentField, DateTimeField, FloatField

# connect('tumblelog')
# connect('cc')
connect('covid-checkin')


class Checkin(EmbeddedDocument):
    number = IntField(required=True)
    userId = IntField(required=True)
    storeId = IntField(required=True)
    timeIn = DateTimeField(required=True)
    timeOut = DateTimeField(required=True)


class User(Document):
    email = StringField(required=True)
    name = StringField(max_length=50)
    user_name = StringField(max_length=50)


class Store(Document):
    name = StringField(max_length=50)
    lng = FloatField(required=True, max_length=10)
    lat = FloatField(required=True, max_length=10)
    # total number of people checkedin incremetd by statsd
    # total = IntField(required=True)


class Movie(mongoengine.Document):
    title = mongoengine.StringField()
    year = mongoengine.IntField()
    rated = mongoengine.StringField()
    runtime = mongoengine.IntField()
    countries = mongoengine.ListField()
    genres = mongoengine.ListField()
    director = mongoengine.StringField()
    writers = mongoengine.ListField()
    actors = mongoengine.ListField()
    plot = mongoengine.StringField()
    poster = mongoengine.StringField()
    metacritic = mongoengine.IntField()
    type = mongoengine.StringField()


def createNewStore(storeName, storeLng, storeLat):
    # store = Store(name="Tim Hortons")
    # store.lat = 44.44
    # store.lng = 44.44
    # store.save()
    store = Store(name=storeName)
    store.lng = storeLng
    store.lat = storeLat
    store.save()

# print("hello")
# store = Store(name="Freshco")
# store.lat = 33.33
# store.lng = 33.33
# store.save()
# createNewStore(storeName, storeLng, storeLat)
