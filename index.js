const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3004;

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

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});