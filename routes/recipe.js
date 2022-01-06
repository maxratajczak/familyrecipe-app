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