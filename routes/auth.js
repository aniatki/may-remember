const router = require('express').Router()
const User = require('../models/User')
const CryptoJS = require('crypto-js')

// Register
router.get('/signup', (req, res) => res.send('Successful'))

router.post('/signup', async (req, res) => {

    // --add validation 
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
    })

    try {
        const savedUser = await newUser.save()
        console.log('Created User')
        res.status(201).json(savedUser)
        res.send('Successful')
    } catch(err) {
        console.log('Didnt create User')
        res.status(500).json(err)
    }
})

// Login

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username }) 
        !user && res.status(401).json('Wrong credentials')
        
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY)
        const password = hashedPassword.toString(CryptoJS.enc.Utf8)
        password !== req.body.password && 
            res.status(401).json('Wrong credentials')

        res.status(200).json(user)
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router