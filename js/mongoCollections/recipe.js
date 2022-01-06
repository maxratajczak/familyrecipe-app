const mongoose = require("mongoose");

let recipeSchema = new mongoose.Schema({
    "_id": {
        "type": String,
    },
    "createdBy": {
        "userId": String,
        "firstName": String,
        "lastName": String
    },
    "dateCreated": String,
    "dateCreatedAsDateNum": Number,
    "lastUpdated": String,
    "recipeName": String,
    "recipeCategory": String,
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
recipeSchema.index({"recipeName": "text"});

const Recipe = mongoose.model("recipes", recipeSchema);

module.exports = {Recipe};