const mongoose = require('mongoose')
const url = process.env.CON_URL

mongoose.connect(url)

const db = mongoose.connection
    db.on('error', console.error.bind(console, 'Error to connect MongoDB'))
    db.once('open', () => {
        console.log('Connected to MongoDB')
})

module.exports = db