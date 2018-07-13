/**
 * Winston Logger module
 */

const winston = require("winston");
const path = require("path");


module.exports = winston.createLogger({
    format: winston.format.json(),
    transports: [
        new(winston.transports.Console)(),
        new(winston.transports.File)({
            name: "info-log",
            filename: path.resolve(__dirname, "logs/info.log"),
            level: "info"
        }),
        new(winston.transports.File)({
            name: "error-log",
            filename: path.resolve(__dirname, "logs/error.log"),
            level: "error"
        })
    ]
})