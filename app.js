const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 8000;
const bodyparser = require('body-parser')

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/dancecontact', {useNewUrlParser:true, useUnifiedTopology:true})


var ContactSchema = new mongoose.Schema({
    Name:String,
    phone:String,
    email:String,
    address:String,
    desc:String
})

var Contact = mongoose.model('Contact', ContactSchema)

//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); // For serving static files
app.use(express.urlencoded());


// PUG SPECIFIC STUFF
app.set('view engine', 'pug'); // set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // set the views directory

// ENDPINTS
app.get('/', (req, res)=>{
   const params = {}
   res.status(200).render('home.pug', params);
});

app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
 });

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body)
    myData.save().then(()=>{
        res.send('Saved Successfully')
    }).catch(()=>{
        res.status(400).send('Items has not been saved into the database')
    });

    // res.status(200).render('contact.pug');
 });

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});

