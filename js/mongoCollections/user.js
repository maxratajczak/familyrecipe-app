const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    "_id": {
        "type": String,
    },
    "dateRegistered": String,
    "firstName": String,
    "lastName": String,
    "email": String,
    "password": String
})

const User = mongoose.model("users", userSchema);

module.exports = {User};