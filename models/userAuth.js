const mongoose = require("mongoose")

const newUser = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("NewUser", newUser)