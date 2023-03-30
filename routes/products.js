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
router.post('/', (req, res) => {
    const product = new Product({
        name: req.body.name
    })
    product.save((err, newProduct) => {
        if (err) {
            res.render('products/new', {
                product: product,
                errorMessage: 'Error creating product'
            })
        } else {
            // res.redirect(`products/${newProduc.id}`)
            res.redirect(`products`)
        }
    })
})

module.exports = router