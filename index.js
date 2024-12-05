const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3004;
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
require('dotenv').config();

app.use(bodyParser.json());  // To parse application/json content

// Middleware to parse URL-encoded request body (common for form submissions)
app.use(bodyParser.urlencoded({ extended: true }));  // To parse application/x-www-form-urlencoded content
app.use(express.static(path.join(__dirname, 'public')));


// Mongoose Connection

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.log('Error connecting to MongoDB:', error.message);
    }
}
connectDB();


// Importing Models;
const { Contact } = require('./models/contact');


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/privacy-policy', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/pages/privacy-policy.html'))
})

app.get('/terms-and-conditions', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/pages/terms-and-condition.html'))
})

app.get('/sitmap.xml', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'sitemap.xml'))
})

app.get('/contact-us', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/pages/contact.html'))
})

// API routes

app.use('/api', require('./routes'))




app.listen(port, () => {
    console.log('Server is running on port ' + port);
});