const asyncHandler = require('express-async-handler')

const getGoals = asyncHandler(async(req, res) =>{
    res.status(200).json({message: "Get Goals "})
})

const setGoals = asyncHandler( async(req, res) =>{
    if (!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }
    res.status(200).json({message: "set Goals "})
})

const updateGoals = asyncHandler( async(req, res) =>{
    res.status(200).json({message: `update Goals ${req.params.id}`})
})
const deleteGoals = asyncHandler( async(req, res) =>{
    res.status(200).json({message: `Delete Goals ${req.params.id}`})
})

module.exports={
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}