const express = require("express");
const path = require("path");
const dataHandler = require("../js/data-handler.js");
const clc = require("../js/cmdlinecolor.js");
const router = express.Router();

module.exports = router;

router.route("/register")
.get((req, res) => {
    
})
.post((req, res) => {
    
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
    res.sendFile(path.join(__dirname , '..' , "views" , "addRecipe.html"));
})
.post((req, res) => {
    dataHandler.addRecipe(req.body)
    .then((recipe) => {
        dataHandler.saveRecipe(recipe)
        .then((message) => {
            console.log(clc.success(message));
            res.redirect("/");
        })
        .catch((error) => {console.log(clc.error(error))});
    })
    .catch((error) => {console.log(clc.error(error))});
});