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

    /**
     * Logs all requests
     */
    server.use(async (request, response, next) => {
        const start = Date.now();
        // pause the control flow until the handler is resolved
        await next()
        const responseTime = Date.now() - start;
        log.info(`${request.method} ${request.statusCode} ${request.url} - ${responseTime}`)
    })

    server.get("*", (request, response) => {
        return handler(request, response)
    });

    // TODO: chat history, persist this to an action store, a database
    const chatHistory = {
        messages: []
    }

    server.post("/message", (request, response, next) => {
        // de-structure the request object, obtaining the timestamp, user, message
        // assigning defaults to the objects
        // this is used with the help of the body-parser middleware
        const {
            user = null, message = "", timestamp = +new Date
        } = request.body;

        // analyze the message and extract the score
        const {
            score
        } = sentiment.analyze(message);

        // build the chat object, with the user, message, score and timestamp
        const chat = {
            user,
            message,
            score,
            timestamp
        }

        // TODO: add the chat to the messages array to persist
        // In the event of actually adding a persiste storage, add a persisten storage, i.e. DB to store
        // the chat
        chatHistory.messages.push(chat);

        // trigger an event, 'new-message' on the 'chat-room' channel with the chat data
        pusher.trigger("chat-room", "new-message", {
            chat
        })
    });

    server.post("/messages", (request, response, next) => {
        response.json({ ...chatHistory,
            status: "success"
        })
    })

    server.listen(port, error => {
        if (error) {
            log.error(`Failed to start server with error ${error}`)
            throw error
        }
        log.info(`Ready on http://localhost:${port}`)
    })
}).catch(error => {
    log.error(error.stack);
    process.exit(1)
})