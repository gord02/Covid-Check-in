from mongoengine import StringField, IntField, ListField, Document, connect, EmbeddedDocument, EmbeddedDocumentField, DateTimeField, FloatField

connect('tumblelog')


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
    lat = FloatField(required=True)
    lng = FloatField(required=True)
    name = StringField(max_length=50)
    # total number of people checkedin incremetd by statsd
    total = IntField(required=True)
