const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const artworkInfo = require('./routes/api/artworkInfo');
const familySetup = require('./routes/api/familySetup');

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
app.use('/api/familySetup', familySetup);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {console.log(`server started on port ${port}`)});


