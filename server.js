const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const artworkInfo = require('./routes/api/artworkInfo');

const app = express();

app.use(bodyParser.json());

//DB config
const db = require('./config/keys').mongoURI;

//connect to mongoDB
mongoose.connect(db)
    .then(() => console.log("mongoDB connected"))
    .catch(err => console.log(err));

const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(db, { useNewUrlParser: true });

client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});

//Use routes
app.use('/api/artworkInfo', artworkInfo);

const port = process.env.PORT || 5000;

app.listen(port, () => {console.log(`server started on port ${port}`)});


