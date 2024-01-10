const express = require('express')
const { errorHandler } = require('./middleware/errorHandler')
const dotenv = require('dotenv').config()
const  colors = require('colors');
const connectDB = require('./config/db');

const app = express()

const PORT = process.env.PORT || 5000

// DB Connection
connectDB()



// bodyParser
app.use(express.json())
app.use(express.urlencoded({extended : true}))

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended : true}))



app.get('/' , (req,res)=> {
    res.json({msg : "Welcome to our Company"})
})


// User Routes
app.use('/api/user' , require("./routes/userRoutes"))
// Ticket Routes
app.use('/api/ticket' , require('./routes/ticketRoutes'))

// error handler

app.use(errorHandler)



app.listen(PORT , ()=>{
    console.log(`Server is running at PORT : ${PORT}`)
})