const mongoose = require("mongoose");
const dayjs = require("dayjs");
const {Recipe} = require("./mongoCollections/recipe.js");

module.exports = {
    createRecipe: function(recipe, image, user) {
        return new Promise((resolve, reject) => {
            if(user._id) {
                let newRecipe = new Recipe(recipe);
                newRecipe._id = mongoose.Types.ObjectId();
                newRecipe.createdBy = user._id;

                var presentDate = dayjs();
                newRecipe.dateCreated = dayjs(presentDate).format("dddd MMMM DD YYYY hh:mm:ss A");
                newRecipe.lastUpdated = newRecipe.dateCreated
                newRecipe.imageFile = image;
                newRecipe.ingredientCount = 0;
                newRecipe.directionCount = 0;

                recipe.ingredients.forEach(element => {
                    newRecipe.ingredientCount++;
                });
                recipe.directions.forEach(element => {
                    newRecipe.directionCount++;
                });

                newRecipe.save((err) => {
                    if(err) reject("Could not save recipe")
                    else resolve();
                })
            }
            else {
                reject("User not logged in")
            }
        })
    },
    
    
}