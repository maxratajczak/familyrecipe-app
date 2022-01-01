const mongoose = require("mongoose");

let recipeSchema = new mongoose.Schema({
    "_id": {
        "type": String,
    },
    "createdBy": String,
    "dateCreated": Date,
    "lastUpdated": Date,
    "recipeName": String,
    "servingSize": Number,
    "imageUrl": String,
    "ingredients": [{
        type: String
    }],
    "directions": [{
        type: String
    }],
    "notes": String
})

const Recipes = mongoose.model("recipes", recipeSchema);

module.exports = {Recipes};