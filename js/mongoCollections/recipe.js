const mongoose = require("mongoose");

let recipeSchema = new mongoose.Schema({
    "_id": {
        "type": String,
    },
    "createdBy": String,
    "dateCreated": String,
    "lastUpdated": String,
    "recipeName": String,
    "servingSize": Number,
    "ingredients": [{
        type: String
    }],
    "directions": [{
        type: String
    }],
    "ingredientCount": Number,
    "directionCount": Number,
    "notes": String,
    "image": {
        "imageFile": String,
        "fileSize": Number
    }
})

const Recipe = mongoose.model("recipes", recipeSchema);

module.exports = {Recipe};