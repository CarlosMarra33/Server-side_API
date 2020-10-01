const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookSchema = new Schema({
    imageUrl: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true
    },    
    theme: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const book = mongoose.model('Book', BookSchema)

module.exports = book