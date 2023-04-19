const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        required: true
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('Product', ProductSchema)