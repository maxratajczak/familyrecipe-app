const express = require("express");
const path = require("path");
const dataHandler = require("../js/data-handler.js");
const clc = require("../js/cmdlinecolor.js");
const router = express.Router();

module.exports = router;

router.route("")
.get((req, res) => {
    dataHandler.getAllRecipes()
    .then((recipes) => {
        res.json(recipes);
    })
    .catch((error) => {
        console.log(clc.warn(error));
        res.send("<h1>No Results Returned</h1>")
    });
});

router.route("/appetizers")
.get((req, res) => {
    res.render(path.join(__dirname, "..", "views", "appetizers.hbs"));
});