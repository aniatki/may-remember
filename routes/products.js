const express = require('express')
const router = express.Router()
const Product = require('../models/product')

// All products route
router.get('/', async (req, res) => {
    // Search options
    let searchOptions = {}

    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const products = await Product.find(searchOptions)
        res.render('products/index', { products: products, searchOptions: req.query })
    } catch {
        res.redirect('/')    
    }
})

// New product view
router.get('/new', (req, res) => {
    res.render('products/new', { product: new Product() })
})

// Create a new product
router.post('/', async (req, res) => {
    const product = new Product({
        name: String(req.body.name),
        description: String(req.body.description), 
        imageURLs: Array(req.body.imageURLs), 
        isAvailable: Boolean(req.body.isAvailable),
        price: Number(req.body.price),
    })
    try {
        const newProduct = await product.save()
        // res.redirect(`products/${newProduct.id}`)
        res.redirect('products')
    } catch {
        res.render('products/new', {
            product: product,
            errorMessage: 'Something went wrong creating product'
        })
    }
})

// const handlePhoto = (e) => {
//     setNewProduct({...newProduct, imageURLs: [...newProduct.imageURLs, ...e.target.files]});
// }

module.exports = router