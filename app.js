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
}));

app.use(function(req, res, next) {
    res.locals.userSession = req.userSession;
    next();
})

app.use(express.static('static'));
app.use(express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free/'));
app.use(express.static(__dirname + '/node_modules/animate.css/'));
app.use(bodyParser.urlencoded({ extended: true }));  

app.get("/", (req, res) => {
    recipe = [
        {
            _id: "61d1deeb796150c600183349",
            recipeName: "Oven Roasted Chicken",
            servingSize: 5,
            ingredients: [
                "hey",
                "this is one",
                "two"
            ],
            directions: [
                "step 1",
                "step 2"
            ],
            createdBy: "61d09c039a023c4ea630db4c",
            imageFile: "61d379b89f9a308f9c5f3f2f.webp",
            ingredientCount: 3,
            directionCount: 2
        },   
    ]

    userHandler.getUserById(recipe[0].createdBy).then((user) => {
        recipe[0].userFirstName = user.firstName
        recipe[0].userLastName = user.lastName
        res.render(__dirname + "/views/landing.hbs", {recipe: recipe});

    })
    .catch((err) => {
        console.log(err);
    })
});

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