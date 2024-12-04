const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3004;
const bodyParser = require("body-parser");
 


app.use(bodyParser.json());  // To parse application/json content

// Middleware to parse URL-encoded request body (common for form submissions)
app.use(bodyParser.urlencoded({ extended: true }));  // To parse application/x-www-form-urlencoded content


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/privacy-policy', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'privacy-policy.html'))
})

app.get('/terms-and-conditions', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'terms-and-condition.html'))
})

app.get('/sitmap.xml', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'sitemap.xml'))
})

app.get('/contact-us', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'))
})

app.post('/submit-contact-form', (req, res) => {
    try{
        const {firstName, lastName, email, message, subscribe } = req.body;

        res.json({
            firstName,
            lastName,
            message,
            email,
            subscribe
        })
    }catch(error){
        res.json({
            status: false,
            error: error.message
        })
    }
})

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});