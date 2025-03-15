const mongoose = require('mongoose')
require('dotenv').config()

const meetupUri = process.env.MONGODB

const connectDB = async () => {
    await mongoose
        .connect(meetupUri)
        .then(() => {
            console.log("Connected to database")
        })
        .catch((error) => {
            console.log("Error connecting to database.", error)
        })
}

module.exports = {connectDB}