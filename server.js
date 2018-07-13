const cors = require("cors");
const next = require("next");
const Pusher = require("pusher");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const Sentiment = require("sentiment");
const log = require("./logger");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;

const app = next({
    dev
});
const handler = app.getRequestHandler();
const sentiment = new Sentiment();

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER,
    encrypted: true
});


app.prepare().then(() => {
    const server = express();

    server.use(cors());
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({
        extended: true
    }));

    server.get("*", (request, response) => {
        return handler(request, response)
    });

    server.listen(port, error => {
        if (error) {
            throw error
        }
        log.info(`Ready on http://localhost:${port}`)
    })
}).catch(error => {
    log.error(error.stack);
    process.exit(1)
})