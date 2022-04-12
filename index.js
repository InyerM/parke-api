const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const db = require('./db')

const app = express()
const cors = require("cors")

const users = require('./src/routes/users')
const prices = require('./src/routes/prices')
const logs = require('./src/routes/logs')
const vehicles = require('./src/routes/vehicles')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(morgan('dev'))

const corsOptions = {
    origin:'*', 
    credentials:true,        
    optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.use(users)
app.use(prices)
app.use(logs)
app.use(vehicles)

const PORT = process.env.PORT || 4111;
app.listen(PORT, console.log("Server running at port : " + PORT))