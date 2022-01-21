const express = require("express");
const bodyParser = require("body-parser");
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const exphbs = require("express-handlebars");
const clientSession = require("client-sessions");
const clc = require("./js/cmdlinecolor.js");
const databaseHandler = require("./js/database-handler.js");
const recipeHandler = require("./js/recipe-handler.js");

// Routes
const userRoute = require("./routes/user.js");
const recipesRoute = require("./routes/recipes.js");
const recipeRoute = require("./routes/recipe.js");

var PORT = process.env.PORT || 8080;

var app = express();
app.use(express.static('static'));
app.use(express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free/'));
app.use(express.static(__dirname + '/node_modules/animate.css/'));
app.use(bodyParser.urlencoded({ extended: true })); 

// Live reload for frontend & backend refresh with nodemon
// app.use(connectLiveReload());
// var liveReloadServer = livereload.createServer();
// liveReloadServer.watch(__dirname + "/static");
// liveReloadServer.watch(__dirname + "/views");
// liveReloadServer.server.once("connection", () => {
//     setTimeout(() => { liveReloadServer.refresh("/") }, 300);
// })

// Client Session Cookies
app.use(clientSession({
    cookieName: "userSession",
    secret: "bwvAKZKfAePglUFvCKXFkajwnfSLaKANWsmsalsWNnaklslkWndoALna",
    duration: 4 * 60 * 60 * 1000, // Hour * Minute * Second * Millisecond
    activeDuration: 1 * 30 * 60 * 1000, // 30 Min
    cookie: { ephemeral: false }
}))

// Express handlebars setup
app.set("view engine", ".hbs");
app.engine(".hbs", exphbs.engine({ 
    extname: ".hbs",
    helpers: {
        incIndex: function(value, option) {
            return parseInt(value) + 1;
        },
        equal: function (lvalue, rvalue, options) {
            if (arguments.length < 3)
                throw new Error("Handlebars Helper equal needs 2 parameters");
            if (lvalue != rvalue) {
                return options.inverse(this);
            } 
            else {
                return options.fn(this);
            }
        }
    }
}))

app.use(function(req, res, next) {
    res.locals.userSession = req.userSession;
    next();
})

// app.get("/", (req, res) => {
//     res.send("Website still in development")
// })

app.get("/", (req, res) => {
    recipeHandler.getRecentlyAddedRecipes(6).then((recipes) => {
        recipes.forEach(element => {
            if(element.ingredientCount === 1) element.oneIngredient = true;
            if(element.directionCount === 1) element.oneDirection = true;
        });
        res.render(__dirname + "/views/landing.hbs", {recipe: recipes})
    })
    .catch((err) => {
        res.render(__dirname + "/views/landing.hbs", {error: err})
    })
})

app.use("/recipes", recipesRoute);
app.use("/recipe", recipeRoute);
app.use("/user", userRoute);
app.get("*", (req, res) => {
    res.render(__dirname + "/views/404.hbs");
})

databaseHandler.initialize()
.then((message) => {
    console.log(clc.success(message));
    app.listen(PORT, () => {
        console.log(clc.notice("[Server] Starting on port " + PORT + "..."))
    })
})
.catch((err) => {
    console.log(clc.error(err));
})