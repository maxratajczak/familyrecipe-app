const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const dataHandler = require("./js/data-handler.js");
const clc = require("./js/cmdlinecolor.js");
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const exphbs = require("express-handlebars");
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
    setTimeout(() => { liveReloadServer.refresh("/") }, 100);
})

// Express handlebars setup
app.set("view engine", ".hbs");
app.engine(".hbs", exphbs.engine({
    extname: ".hbs",
    helpers : {

    }
}));

app.use(express.static('static'));
app.use(express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free/'));
app.use(express.static(__dirname + '/node_modules/animate.css/'));
app.use(bodyParser.urlencoded({ extended: true }));  

app.get("/", (req, res) => {
    res.render(__dirname + "/views/landing.hbs");
});

app.use("/recipes", recipesRoute);
app.use("/user", userRoute);

app.get("*", (req, res) => {
    res.render(__dirname + "/views/404.hbs");
});

console.log(clc.notice("\n\n[Server] Listening...\n"));
app.listen(PORT, dataHandler.initializeRecipes()
    .then((fileData) => {
        console.log(clc.success(`[initializeRecipes] "${dataHandler.recipeDataFile}" was opened`));
        dataHandler.parseData(fileData)
        .then(([message, length]) => {
            if (length === 0) console.log(clc.warn(message));
            else console.log(clc.success(message));
        })
        .catch((error) => {console.log(clc.error(error))})
    })
    .catch((error) => {console.log(clc.error(error))})
    .finally(() => {onApplicationStart()})
);