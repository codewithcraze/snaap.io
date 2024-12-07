const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const validUrl = require('valid-url');

const {Contact} = require('../models/contact');
const Url = require('../models/sortUrl');
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


// Base URL for shortened URLs
const baseUrl = 'https://snaap.io';

// @route    POST /shorten
// @desc     Create short URL
router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;

  // Check base URL
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json('Invalid base URL');
  }

  // Check long URL
  if (!validUrl.isUri(longUrl)) {
    return res.status(401).json('Invalid long URL');
  }

  try {
    // Check if the long URL already exists in the database
    let url = await Url.findOne({ longUrl });

    if (url) {
      res.json(url);
    } else {
      // Generate short code
      const urlCode = shortid.generate();

      // Create short URL
      const shortUrl = `${baseUrl}/${urlCode}`;

      // Save the URL
      url = new Url({
        longUrl,
        shortUrl,
        urlCode,
        date: new Date()
      });

      await url.save();

      res.json(url);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error');
  }
});

router.post('/getCount', async (req, res) => {
    try {
        const { url } = req.body;
        const count = await Url.findOne({shortUrl: url});
        res.json({ count });
    } catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }

})



module.exports = router;