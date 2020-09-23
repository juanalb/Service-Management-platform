const mongoose = require('mongoose')
const uri = process.env.MONGO_CONNECTION_STRING;

mongoose
    .connect(uri, { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db