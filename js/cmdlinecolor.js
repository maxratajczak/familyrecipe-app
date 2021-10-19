const clc = require("cli-color");

module.exports = {

    error: clc.redBright.bold, // xterm(196)
    warn: clc.yellowBright.bold, // xterm(208)
    success: clc.greenBright.bold, // xterm(118)
    notice: clc.cyanBright.bold // xterm(39)

}