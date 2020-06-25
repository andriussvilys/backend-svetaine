const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const artworkInfo = require('./routes/api/artworkInfo');
const familySetup = require('./routes/api/familysetup');
const themes = require('./routes/api/themes');
const artworkFamilyList = require('./routes/api/artworkFamilyList');
const categories = require('./routes/api/categories');
const users = require('./routes/api/users');
const fetchImages = require('./fetchImages');
const deleteImage = require('./deleteImage');

const staticState = require('./routes/staticState');
const resize = require('./routes/resize');
const imagemin = require('./routes/imagemin');

const app = express();

app.use(bodyParser({limit: '50mb'}))
app.use(bodyParser.json());

const port = process.env.PORT || 5000;


app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });

app.listen(port, () => {console.log(`server started on port ${port}`)});

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
app.use('/api/familysetup', familySetup);
app.use('/api/themes', themes);
app.use('/api/artworkFamilyList', artworkFamilyList);
app.use('/api/categories', categories);
app.use('/api/users', users);
app.use('/fetchImages', fetchImages);
app.use('/deleteImage', deleteImage);

app.use('/staticState', staticState);
app.use('/resize', resize);
app.use('/imagemin', imagemin);
// this uses a folder inside the server
// app.use(express.static('files'))

app.use((err, req, res, next) => {
    res.status(500).send({error: err})
})

// if(process.env.NODE_ENV === "production"){
//     app.use(express.static('client/build'))
//     app.get('*', ((req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//     }))
// }