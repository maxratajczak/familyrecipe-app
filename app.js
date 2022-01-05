const express = require("express");
const bodyParser = require("body-parser");
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const exphbs = require("express-handlebars");
const clientSession = require("client-sessions");

//External Files
const clc = require("./js/cmdlinecolor.js");
// const dataHandler = require("./js/data-handler.js");
const databaseHandler = require("./js/database-handler.js");
const userHandler = require("./js/user-handler.js");

// Routes
const userRoute = require("./routes/user.js");
const recipesRoute = require("./routes/recipes.js");
const recipeHandler = require("./js/recipe-handler.js");

var app = express();

var PORT = process.env.PORT || 8080;

function onApplicationStart() {
    console.log(clc.notice("\n[Server] Initialized. Starting on port " + PORT + "..."));
}

// Live reload for frontend & backend refresh with nodemon
app.use(connectLiveReload());
var liveReloadServer = livereload.createServer();
liveReloadServer.watch(__dirname + "/static");
liveReloadServer.watch(__dirname + "/views");
liveReloadServer.server.once("connection", () => {
    setTimeout(() => { liveReloadServer.refresh("/") }, 400);
})

// Client Session Cookies
app.use(clientSession({
    cookieName: "userSession",
    secret: "bwvAKZKfAePglUFvCKXF",
    duration: 6 * 60 * 60 * 1000, // Hour * Minute * Second * Millisecond (6 hours)
    activeDuration: 1 * 60 * 60 * 1000, // (1 Hour)
    cookie: {
        ephemeral: false
    }
}))

// Express handlebars setup
app.set("view engine", ".hbs");
app.engine(".hbs", exphbs.engine({
    extname: ".hbs",
    helpers : {

    }
}))

app.use(function(req, res, next) {
    res.locals.userSession = req.userSession;
    next();
})

app.use(express.static('static'));
app.use(express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free/'));
app.use(express.static(__dirname + '/node_modules/animate.css/'));
app.use(bodyParser.urlencoded({ extended: true }));  

app.get("/", (req, res) => {
    recipeHandler.getRecentlyAddedRecipes(6).then((recipes) => {
        res.render(__dirname + "/views/landing.hbs", {recipe: recipes});
    })
    .catch((err) => {
        res.render(__dirname + "/views/landing.hbs", {error: err});
    })
})

app.use("/recipes", recipesRoute);
app.use("/user", userRoute);

app.get("*", (req, res) => {
    res.render(__dirname + "/views/404.hbs");
});

databaseHandler.initialize()
.then(() => {
    app.listen(PORT, onApplicationStart());
})
.catch((err) => {
    console.log(clc.error(err));
})