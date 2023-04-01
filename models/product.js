const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    imageURLs: {
        type: [String],
        required: true
    },
    isAvailable: {
        type: Boolean,
    },
    price: {
        type: Number,
        min: 0
    }
})

module.exports = mongoose.model('Product', productSchema)