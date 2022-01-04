const mongoose = require("mongoose");
const dayjs = require("dayjs");
const path = require("path");
const sharp = require("sharp");
const clc = require("./cmdlinecolor.js");
const {Recipe} = require("./mongoCollections/recipe.js");

function processRecipeImage(image, fileName) {
    return new Promise((resolve, reject) => {
        var acceptedTypes = ["image/jpeg", "image/jpg", "image/png", "image/heic", "image/heif", "image/webp"];
        var valid = true;

        if(image.size >= 10000000) reject("File size too large > 10mb")

        for(let i = 0; i < acceptedTypes.length; i++) {
            if(acceptedTypes[i] === image.mimetype) {
                valid = true
                break
            }
            else valid = false
        }

        if(valid) {
            const directory = (path.join(".", "static", "images", "recipeImages") + "/")
            sharp(image.buffer)
            .withMetadata()
            .webp({
                quality: 80,
            })
            .resize({
                width: 1080,
                withoutEnlargement: true
            })
            .toFile(directory + fileName, (err, info) => {
                if(err) reject(err)
                else resolve(info.size)
            })
        }
        else reject("Unsupported file type was submitted: " + image.mimetype)
    })
}

module.exports = {
    createRecipe: function(recipe, imageFile, user) {
        return new Promise((resolve, reject) => {
            if(user._id) {
                let newRecipe = new Recipe(recipe);
                newRecipe._id = mongoose.Types.ObjectId();
                newRecipe.createdBy = user._id;

                var presentDate = dayjs();
                newRecipe.dateCreated = dayjs(presentDate).format("dddd MMMM DD YYYY hh:mm:ss A");
                newRecipe.lastUpdated = newRecipe.dateCreated

                newRecipe.ingredientCount = 0;
                newRecipe.directionCount = 0;
                if(newRecipe.ingredients.length != 0) for(var i = 0; i < recipe.ingredients.length; i++) newRecipe.ingredientCount++
                if(newRecipe.directions.length != 0) for(var i = 0; i < recipe.directions.length; i++) newRecipe.directionCount++

                newRecipe.image.imageFile = mongoose.Types.ObjectId() + ".webp";
                processRecipeImage(imageFile, newRecipe.image.imageFile)
                .then((newFileSize) => {
                    newRecipe.image.fileSize = newFileSize;
                    newRecipe.save((err) => {
                        if(err) reject("Could not save recipe")
                        else resolve();
                    })
                })
                .catch((err) => {reject(err)})
            }
            else reject("User not logged in")
        })
    }
    
}