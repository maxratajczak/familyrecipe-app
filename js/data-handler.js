const { json } = require("body-parser");
const { resolveCaa } = require("dns");
const fileSystem = require("fs");
const { formatWithOptions } = require("util");

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
            if (recipes.length === 0) resolve(["[parseData] Parsing successful, but no recipes in file", 0])

            resolve([`[parseData] "${this.recipeDataFile}" was parsed`, recipes.length]);
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
            recipes.push(recipe);
            resolve(recipe);
        });
    },

    saveRecipe: function(recipe) {
        return new Promise((resolve, reject) => {

            // function formatRecipe(recipe) {
                
            //     var newRecipe = JSON.stringify(recipe, null, '\t');

            //     return newRecipe;
            // }

            // var formattedRecipe = formatRecipe(recipe);
            // console.log(formattedRecipe);

            fileSystem.writeFile(`./data/${this.recipeDataFile}`, JSON.stringify(recipes, null, '\t') , function(error) {
                if(error) reject("[saveRecipe] Could not save recipe to file.")
                resolve("[saveRecipe] Recipe Saved.")
            })
        });
    }
}