const express = require("express");
const path = require("path");

const clc = require("../js/cmdlinecolor.js");
const recipeHandler = require("../js/recipe-handler.js")

const router = express.Router();
module.exports = router;

router.route("/search")
.get((req, res) => {
    if(!req.query.q) res.redirect("/")
    else {
        recipeHandler.getRecipeBySearch(req.query.q)
        .then((recipes) => {
            if(recipes.length === 1) res.render(path.join(__dirname, "..", "views", "searchResults.hbs"), {recipe1: recipes[0], query: req.query.q});
            else res.render(path.join(__dirname, "..", "views", "searchResults.hbs"), {recipe: recipes, query: req.query.q});
        })
        .catch((err) => {
            res.render(path.join(__dirname, "..", "views", "searchResults.hbs"), {error: err, query: req.query.q});
        })
    }
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

router.route("/breakfast")
.get((req, res) => {
    recipeHandler.getRecipesByCategory("breakfast")
    .then((recipes) => {
        res.render(path.join(__dirname, "..", "views", "breakfast.hbs"), {recipe: recipes});
    })
    .catch((err) => {
        res.render(path.join(__dirname, "..", "views", "breakfast.hbs"), {error: err});
    })
});

router.route("/mains")
.get((req, res) => {
    recipeHandler.getRecipesByCategory("main")
    .then((recipes) => {
        res.render(path.join(__dirname, "..", "views", "mains.hbs"), {recipe: recipes});
    })
    .catch((err) => {
        res.render(path.join(__dirname, "..", "views", "mains.hbs"), {error: err});
    })
});

router.route("/soups")
.get((req, res) => {
    recipeHandler.getRecipesByCategory("soup")
    .then((recipes) => {
        res.render(path.join(__dirname, "..", "views", "soups.hbs"), {recipe: recipes});
    })
    .catch((err) => {
        res.render(path.join(__dirname, "..", "views", "soups.hbs"), {error: err});
    })
});

router.route("/desserts")
.get((req, res) => {
    recipeHandler.getRecipesByCategory("dessert")
    .then((recipes) => {
        res.render(path.join(__dirname, "..", "views", "desserts.hbs"), {recipe: recipes});
    })
    .catch((err) => {
        res.render(path.join(__dirname, "..", "views", "desserts.hbs"), {error: err});
    })
});