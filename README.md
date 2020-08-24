### Deploying React application on using Flask

Unpack webpack

Use this command when updates to front end are made so the changes can be reflected in the backend
```
npm run build
```
Using the previous command generates the content of the react app in the static folder and templates folder in flask server folders.

Use this command to run the flask server, using flask run no longer works
```
python appName.py
```

Reference to article: https://blog.learningdollars.com/2019/11/29/how-to-serve-a-reactapp-with-a-flask-server/