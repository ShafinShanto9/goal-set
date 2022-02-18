const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000

const {errorHandler} = require('./middleware/errorMiddleWare')
               
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(errorHandler)

app.use('/api/goals', require('./routes/goalRoutes'))
app.listen(port, () => console.log(`Server started on port ${port}`))