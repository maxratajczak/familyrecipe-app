const express = require("express");
const path = require("path");

const clc = require("../js/cmdlinecolor.js");
const recipeHandler = require("../js/recipe-handler.js")

const router = express.Router();
module.exports = router;

router.route("")
.get((req, res) => {
    res.redirect("/")
});

router.route("/appetizers")
.get((req, res) => {
    recipeHandler.getRecipesByCategory("appetizer")
    .then((recipes) => {
        res.render(path.join(__dirname, "..", "views", "appetizers.hbs"), {recipe: recipes});
    })
    .catch((err) => {
        res.render(path.join(__dirname, "..", "views", "appetizers.hbs"), {error: err});
    })
});