# import Store from schemas
from schemas import Store
# ross = User(email='ross@example.com')
# ross.first_name = 'Ross'
# ross.last_name = 'Lawley'
# ross.save()

print("outside")


def createStore():
    print("inside")
    store = Store(name="Freshco")
    store.lat = 33.33
    store.lng = 33.33
    store.save()


createStore()
