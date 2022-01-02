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
    "imageFile": String,
    "ingredients": [{
        type: String
    }],
    "directions": [{
        type: String
    }],
    "ingredientCount": Number,
    "directionCount": Number,
    "notes": String
})

const Recipe = mongoose.model("recipes", recipeSchema);

module.exports = {Recipe};