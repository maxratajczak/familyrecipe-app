const clc = require("cli-color");

module.exports = {

    error: clc.xterm(196),
    warn: clc.xterm(208),
    success: clc.greenBright, // xterm(118)
    notice: clc.xterm(39)

}