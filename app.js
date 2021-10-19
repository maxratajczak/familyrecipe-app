const express = require("express");
const dataHandler = require("./js/data-handler.js");
const clc = require("./js/cmdlinecolor.js")

// Express Application Creation
var app = express();
app.use(express.static('static/css'));

// Port Definition
var PORT = process.env.PORT || 8080;

// Application Start Function
function onApplicationStart() {
    console.log(clc.notice("\n[Server] Starting on port " + PORT + "...\n"));
}

// Routing Handling
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});
// ****************

console.log();
app.listen(PORT, dataHandler.initializeRecipes()
    .then((fileData) => {
        console.log(clc.success(`[initializeRecipes] "${dataHandler.recipeDataFile}" was opened`));

        dataHandler.parseData(fileData)
        .then((message) => {
            console.log(clc.success(message));
        })
        .catch((error) => {
            console.log(clc.error(error));
        })
    })
    .catch((error) => {
        console.log(clc.error(error));
    })
    .finally(() => {
        onApplicationStart();
    })
);