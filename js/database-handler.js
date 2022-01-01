const mongoose = require("mongoose");

let dbURI = "mongodb+srv://adminfamrecipedb:DBf32r89app28@famrecipes.cpkge.mongodb.net/appData?retryWrites=true&w=majority";

function initialize() {
    return new Promise((resolve, reject) => {
        mongoose.connect(dbURI)
        .then(() => {
            resolve();
        })
        .catch((err) => {
            reject(err);
        })
    })
}

module.exports = {initialize}