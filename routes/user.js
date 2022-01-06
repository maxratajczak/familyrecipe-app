const express = require("express")
const multer = require("multer");
const path = require("path");

const clc = require("../js/cmdlinecolor.js");
const userHandler = require("../js/user-handler.js");
const recipeHandler = require("../js/recipe-handler.js");

const storage = multer.memoryStorage();
const upload = multer({storage: storage});
const router = express.Router();
module.exports = router;

function authorizeUser(req, res, next) {
    if(!req.userSession.user) {
        req.userSession.reset();
        res.redirect("/user/login");
    }
    else next();
}

router.route("/register")
.get((req, res) => {
    res.render(path.join(__dirname, "..", "views", "register.hbs"))
})
.post((req, res) => {
    userHandler.registerUser(req.body)
    .then((success) => {
        if (success) res.render(path.join(__dirname, "..", "views", "register.hbs"), {success: success})
        else res.render(path.join(__dirname, "..", "views", "register.hbs"))
    })
    .catch((err) => {
        res.render(path.join(__dirname, "..", "views", "register.hbs"), {error: err, lastInput: req.body})
    })
})

router.route("/login")
.get((req, res) => {
    if(req.userSession.user) res.redirect("/user/myrecipes")
    else res.render(path.join(__dirname, "..", "views", "login.hbs"));
})
.post((req, res) => {
    userHandler.loginUser(req.body)
    .then((user) => {
        req.userSession.user = {
            _id: user._id,
        }
        res.redirect("/")
    })
    .catch((err) => {
        res.render(path.join(__dirname, "..", "views", "login.hbs"), {error: err})
    })
})

router.route("/logout")
.get((req, res) => {
    req.userSession.reset();
    res.redirect("/");
})

router.route("/createrecipe")
.get(authorizeUser, (req, res) => {
    if(req.userSession.user) res.render(path.join(__dirname , '..' , "views" , "createRecipe.hbs"));
    else res.redirect("/user/login")
})
.post(authorizeUser, upload.single("imageFile"), (req, res) => {
    if(req.userSession.user) {
        recipeHandler.createRecipe(req.body, req.file, req.userSession.user._id)
        .then(() => {
            res.status(200).redirect("/user/myrecipes")
        })
        .catch((err) => {
            res.redirect("/")
        })
    }
    else res.redirect("/user/login")

})

router.route("/myrecipes")
.get(authorizeUser, (req, res) => {
    recipeHandler.getRecipesByUserId(req.userSession.user._id).then((recipes) => {
        res.render(path.join(__dirname , '..' , "views" , "myRecipes.hbs"), {recipe: recipes});
    })
    .catch((err) => {
        userHandler.getUserById(req.userSession.user._id).then((user) => {
            res.render(path.join(__dirname , '..' , "views" , "myRecipes.hbs"), {error: err, user: user});
        })
        .catch((err) => {
            res.redirect("/user/login")
        })
    })
})
