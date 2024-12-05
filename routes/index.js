const express = require('express');
const router = express.Router();

const {Contact} = require('../models/contact');

router.post('/submit-contact-form', async(req, res) => {
    try {
        const { firstName, lastName, email, message, subscribe } = req.body;
        const newContact = new Contact({
            firstName,
            lastName,
            email,
            message,
            subscribe
        });
        await newContact.save();
        res.json({
            status: true,
            message: 'Contact form submitted successfully'
        })
    } catch (error) {
        res.json({
            status: false,
            error: error.message
        })
    }
})


module.exports = router;