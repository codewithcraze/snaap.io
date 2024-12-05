const mongoose = require('mongoose');


const BlogSchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true, // Ensures categoryName is mandatory
        trim: true
    },
    content: {
        type: String,
        default: '', // Default empty string if no content is provided
        trim: true
    },
    description: {
        type: String,
        default: '',
    },
    extraTags: {
        type: String,
        default: '',
        trim: true
    },
    heading: {
        type: String,
        default: '',
        trim: true
    },
    metaDescription: {
        type: String,
        default: '',
        trim: true
    },
    metaKeywords: {
        type: String,
        default: '',
        trim: true
    },
    postBy: {
        type: String,
        default: '',
        trim: true
    },
    tfnFooter: {
        type: String,
        default: '',
        trim: true
    },
    tfnHeader: {
        type: String,
        default: '',
        trim: true
    },
    tfnPopup: {
        type: String,
        default: '',
        trim: true
    },
    title: {
        type: String,
        required: true, // Ensures title is mandatory
        trim: true
    },
    titleUrl: {
        type: String,
        required: true, // Ensures titleUrl is mandatory
        unique: true, // Ensures unique URLs for blog posts
        trim: true
    },
    status: {
        type: Boolean,
        default: true, // Default status is true (published)
        enum: [true, false] // Ensures status is either true or false
    }
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = {Blog};
