# Realtime Sentiment-Analysis Chat

Real time sentiment analysis chat built with [React](https://reactjs.org/), [Pusher](https://dashboard.pusher.com) and [Next](https://github.com/zeit/next.js/).

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

First clone the repository

```bash
git clone git@github.com:Wyvarn/realtime-chat.git
```

Change directory into the cloned repository and download the dependencies

```bash
npm install
# or
yarn install
```

> Ensure you have installed Node and npm/yarn before performing this step

## Pre-requisites

A couple of things you will need before hand

- [Node](https://nodejs.org/en/)

Ensure you have Node installed on your development machine.

- [Npm/Yarn](https://www.npmjs.com/)

Ensure either npm or yarn is installed.

- [Pusher credentials](http://pusher.com/)

Pusher is a technology for building apps with varying realtime needs like push notifications and pub/sub messaging.

After you have created an account with Pusher, create a new application on the [Pusher Dashboard](https://dashboard.pusher.com/) to get your application credentials. Create a .env file in the root directory and add your application credentials as follows.

```plain
PUSHER_APP_ID=YOUR_APP_ID
PUSHER_APP_KEY=YOUR_APP_KEY
PUSHER_APP_SECRET=YOUR_APP_SECRET
PUSHER_APP_CLUSTER=YOUR_APP_CLUSTER
```

## Deployment

Deployment is up to you, as this is an unopinionated application structure. This could be deployed to any environment, as long as the environment supports NodeJS, then you are good to go. There are a couple of ways you can deploy this application without any more setup however.

You will first need to create an optimized build of the application:

```bash
$ yarn build
yarn run v1.6.0
$ next build
Done in 5.97s
# or if using npm
$ npm run build
yarn run v1.6.0
$ next build
Done in 5.97s
```

This should create a `.next` folder at the root of the directory.

You can test the optimized build by running the command:

```bash
$ yarn start:prod # or  npm run start:prod
yarn run v1.6.0
$ next start
> Ready on http://localhost:3000
```

> You can specify a port by passing the -p flaf to the start script and specifiying the port, e.g. `npm run start:prod -p 8000`

If deploying the application to [now](https://zeit.co). Ensure you have an account setup already and run the following command:

```bash
yarn deploy
```

This will prompt you to enter an email address and will will have to verify the link that is sent to the address you provide.

Running the above command a second time will prompt you to pick between using the [Dockerfile](./Dockerfile) or using the [package.json](./package.json) file provided.

You can chose to deploy to now with either Docker or with npm.

```bash
yarn deploy:npm
# this will use the package.json file for deploying
yarn deploy:docker
# this will use Docker to handle the deployment
```

You can customize the Dockerfile to fit your needs

## Built With

- JavaScript : Source language
- [Next](https://github.com/zeit/next.js/) : Minimalistic framework for Server Side Rendered React applications.
- [ReactJS](https://reactjs.org/) : UI library
- [Pusher](https://www.npmjs.com/package/pusher) : NodeJS client to interact with Pusher
- [Pusher-js](https://www.npmjs.com/package/pusher-js): Pusher JS Client
- [Axios](https://www.npmjs.com/package/axios): Promise based HTTP client for the browser and node.js
- [Sentiment](https://github.com/thisandagain/sentiment) :AFINN-based sentiment analysis for Node.js.
- [Express](https://www.npmjs.com/package/express): Fast, unopinionated, minimalist web framework for node.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags](https://github.com/Wyvarn/realtime-chat/tags) on this repository.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details

## Acknowledgements

- [Christian Nwamba](https://github.com/christiannwamba)

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/as-seen-on-tv.svg)](https://forthebadge.com)