const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser")
const dataHandler = require("./js/data-handler.js");
const clc = require("./js/cmdlinecolor.js");
//const bootstrap = require("bootstrap")

// Express Application Creation
var app = express();
app.use(express.static('static'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use(express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free/'));
app.use(bodyParser.urlencoded({ extended: true }));

// Port Definition
var PORT = process.env.PORT || 8080;

// Application Start Function
function onApplicationStart() {
    console.log(clc.notice("\n[Server] Initialized. Starting on port " + PORT + "..."));
}

// Routing Handling
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.get("/recipes", (req, res) => {
    dataHandler.getAllRecipes()
    .then((recipes) => {
        res.json(recipes);
    })
    .catch((error) => {
        console.log(clc.warn(error));
        res.send("<h1>No Results Returned</h1>")
    });
});

app.get("/addrecipe", (req, res) => {
    res.sendFile(__dirname + "/views/addRecipe.html")
});

app.post("/addrecipe", (req, res) => {
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
// ****************

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