const fileSystem = require("fs");

var recipes = [];

module.exports = {

    recipeDataFile: "recipe-data.json",

    parseData: function(fileData) {
        return new Promise((resolve, reject) => {
            let obj;
            try {
                obj = JSON.parse(fileData);
            }
            catch {
                reject(`[parseData] Could not parse JSON data. Please check the "${this.recipeDataFile}" file.`);
            }
            obj.forEach(element => {
                recipes.push(element);
            });
            resolve(`[parseData] "${this.recipeDataFile}" was parsed`);
        });
    },

    initializeRecipes: function() {
        return new Promise((resolve, reject) => {
            fileSystem.readFile(`./data/${this.recipeDataFile}`, 'utf8', (error, fileData) => {
                if (error) reject((`[initializeRecipes] Failed reading from "${this.recipeDataFile}". Please create the file in the "./data" directory.`));              
                resolve(fileData);
            });
        });
    },

    getAllRecipes: function() {
        return new Promise((resolve, reject) => {
            if (recipes.length === 0) reject("[getAllRecipes] No results returned from recipes.");
            resolve(recipes);
        });
    },

    addRecipe: function(recipe) {
        return new Promise((resolve, reject) => {
            //console.log(recipe.desc);
            resolve(recipe);
        });
    }
}