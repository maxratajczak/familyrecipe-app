const clc = require("cli-color");

module.exports = {

    error: clc.red, // xterm(196)
    warn: clc.xterm(208),
    success: clc.green, // xterm(118)
    notice: clc.cyanBright // xterm(39)

}