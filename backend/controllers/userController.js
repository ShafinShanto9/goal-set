const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


const registerUser =asyncHandler(async(req, res) => {
    const {name, email, password} = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error("Please Add All Fields")
    }

    // checked is user existeed
    const userExisted = await User.findOne({email})
    if(userExisted){
        res.status(400)
       throw new Error("User Already Existed")
    }

    // Hashing Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create user
    const user = await User.create({
        name,
        email,
        password : hashedPassword
    })

    if(user) {
        res.status(201).json({
            _id : user.id,
            name: user.name,
            email: user.email,
            token: genaretToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("Invalid User")
    }
})

const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body

    // Checked User
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id : user.id,
            name: user.name,
            email: user.email,
            token: genaretToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("Invalid User")
    }
})
const getMe = asyncHandler(async(req, res) => {
    const {_id, name, email} = await User.findById(req.user.id)
    res.status(400).json({
        id : _id,
        name,
        email
    })
})

// Genaret JWT Token

const genaretToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })

}

module.exports = {
    registerUser,
    loginUser,
    getMe
}