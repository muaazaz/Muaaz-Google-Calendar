const User = require('../models/user')
const jwt = require('jsonwebtoken')

const genToken = (id)=>{
    return jwt.sign({id},process.env.SECRET)
}

const signup=async (req, res)=>{
    try {
        const user = new User(req.body)
        await user.save()
        const token = genToken(user._id)
        res.cookie('jwt',token)
        res.cookie('email',user.email)
        res.status(200).send({user})
    } catch (err) {
     var error = err.message
     res.status(400).send({error}) 
    }
}

const login=async (req, res)=>{
    try {
        const user = await User.verifyCredentials(req.body.email, req.body.userName, req.body.password)
        const token = genToken(user._id)
        res.cookie('jwt',token)
        res.cookie('email',user.email)
        res.status(200).send({user})
    }catch (err) {
    const error = err.message
     res.status(400).send({error})   
    }
}


module.exports = {
    signup,
    login
}