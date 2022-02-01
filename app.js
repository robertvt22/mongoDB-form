// already installed all dependencies

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));

// MongoDB with classic database
mongoose.connect('mongodb://localhost:27017/finalformex', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// MongoDB with Atlas database
// mongoose.connect('mongodb+srv://robertVT22:8XXNairhVR@cluster0.070f5.mongodb.net/finalformex', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

const db1 = mongoose.connection;
// const db2 = mongoose.connection;

db1.on('error', () => console.log('Error connecting to Database'));
db1.once('open', () => console.log('Successfully connected to Database'));

// db2.on('error', () => console.log('Error connecting to Database'));
// db2.once('open', () => console.log('Successfully connected to Database with Atlas'));


// const modelSchema = {
//     fname: String,
//     lname: String
// }

// const Schema = mongoose.model('Schema', modelSchema);

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/index', (req, res) => {
    res.render('index');
});

app.get('/form', (req, res) => {
    res.render('form');
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

// app.post('/form', (req, res) => {
//     var newUser = new Schema ({
//         fname: req.body.fname,
//         lname: req.body.lname
//     });

//     newUser.save();
//     res.render('dashboard', {data: req.body});
//     console.log('Record successfully registered');

// });

app.post('/form', (req, res) => {
    var fname = req.body.fname;
    var lname = req.body.lname;

    var data = {
        'fname': fname,
        'lname': lname
    }

    db1.collection('users').insertOne(data, (err, collection) => {
        if(err)
            throw err;
        console.log('Record successfully registered');
    });

        res.render('dashboard', {data: req.body});
});

app.listen(port, console.log(`Listening on port ${port}`));