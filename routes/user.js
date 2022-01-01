const express = require("express");
const path = require("path");
// const dataHandler = require("../js/data-handler.js");
const clc = require("../js/cmdlinecolor.js");
const router = express.Router();

const userHandler = require("../js/user-handler.js");

module.exports = router;

router.route("/register")
.get((req, res) => {
    res.render(path.join(__dirname, "..", "views", "register.hbs"))
})
.post((req, res) => {
    userHandler.registerUser(req.body)
    .then(() => {
        res.redirect("/");
    })
    .catch((err) => {
        res.render(path.join(__dirname, "..", "views", "register.hbs"), {error: err, lastInput: req.body})
    })
});

router.route("/login")
.get((req, res) => {
    res.render(path.join(__dirname, "..", "views", "login.hbs"));
})
.post((req, res) => {

});

router.route("/logout")
.get((req, res) => {

})
.post((req, res) => {

});

router.route("/createrecipe")
.get((req, res) => {
    res.render(path.join(__dirname , '..' , "views" , "createRecipe.hbs"));
})
.post((req, res) => {
    dataHandler.addRecipe(req.body)
    .then((recipe) => {
        dataHandler.saveRecipe(recipe)
        .then((message) => {
            console.log(clc.success(message));
            res.redirect("/recipes");
        })
        .catch((error) => {console.log(clc.error(error))});
    })
    .catch((error) => {console.log(clc.error(error))});
});