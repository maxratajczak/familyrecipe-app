const express = require("express");
const path = require("path");
const dayjs = require("dayjs");

const clc = require("../js/cmdlinecolor.js");
const recipeHandler = require("../js/recipe-handler.js")

const router = express.Router();
module.exports = router;

function parseDate(date) {
    return dayjs(date).format("MMMM D, YYYY")
}

router.route("/:id")
.get((req, res) => {
    recipeHandler.getRecipeById(req.params.id)
    .then((recipe) => {
        recipe.parsedDateCreated = parseDate(recipe.dateCreated)
        recipe.parsedLastUpdated = parseDate(recipe.lastUpdated)
        res.render(path.join(__dirname, "..", "views", "recipe.hbs"), {recipe: recipe});
    })
    .catch((err) => {
        res.redirect("/404")
    })
});