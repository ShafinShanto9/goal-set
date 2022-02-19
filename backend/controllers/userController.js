

const registerUser = (req, res) => {
    res.json({message: "register User"})
}
const loginUser = (req, res) => {
    res.json({message: "Login User"})
}
const getMe = (req, res) => {
    res.json({message: "User Data"})
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}