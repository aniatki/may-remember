const express = require('express')
const router = express.Router()
const Product = require('../models/product')

// All products route
router.get('/', (req, res) => {
    res.render('products/index')
})

// New product route
router.get('/new', (req, res) => {
    res.render('products/new', { product: new Product() })
})

// Create product route
router.post('/', async (req, res) => {
    const product = new Product({ 
        name: req.body.name,
        description: req.body.description, 
        imageURLs: req.body.imageURLs, 
        isAvailable: req.body.isAvailable,
        price: req.body.price,
    })
    try {
        await product.save()
        res.redirect(`products/${product.id}`)
        // res.redirect('products')
    } catch (err) {
        res.render('products/new', {
            product: product,
            errorMessage: 'Error creating product'
        })
    }
})

module.exports = router