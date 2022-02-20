const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')
 
const getGoals = asyncHandler(async(req, res) =>{
    const goals = await Goal.find({user: req.user.id})
    res.status(200).json(goals)
})

const setGoals = asyncHandler( async(req, res) =>{
    if (!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(goal)
})

const updateGoals = asyncHandler( async(req, res) =>{
 const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.send(400)
        throw new Error("Goal Not Found")
    }

    const user = await User.findById(req.user.id)

    //checked user
    if(!user){
        res.status(401)
        throw new Error('User not Found')
    }
    // make sure user matched

    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error("user unAthorized")
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedGoal)
})
const deleteGoals = asyncHandler( async(req, res) =>{
    const goal = await Goal.findById(req.params.id)
    if(!goal) {
        res.send(400)
        throw new Error("Goal Not Found")
    }

    const user = await User.findById(req.user.id)

    //checked user
    if(!user){
        res.status(401)
        throw new Error('User not Found')
    }
    // make sure user matched

    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error("user unAthorized")
    }

   await goal.remove()
   res.status(200).json({id: req.params.id})

})

module.exports={
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}