require('svelte/register');

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');



function buildHtml(html, head) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:200,400&display=swap" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="styles.css">
        <script src="/__/firebase/6.1.1/firebase-app.js"></script>
        <script>
            const firebaseConfig = { apiKey: "AIzaSyBmJIhDo8W76jzF6GgvwqQ0HAycRuGVF9A", authDomain: "project-gyro.firebaseapp.com", databaseURL: "https://project-gyro.firebaseio.com", projectId: "project-gyro", storageBucket: "project-gyro.appspot.com", messagingSenderId: "99361186654", appId: "1:99361186654:web:534ea35f0038d280" };
            firebase.initializeApp(firebaseConfig);
        </script>
        <title>Project Gyro</title>
        ${head}
    </head>
    <body>
        ${html}
    </body>
    </html>`;
}

const server = express();
const serviceAccount = require("./project-gyro-admin-key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://project-gyro.firebaseio.com"
});

const firestore = admin.firestore();

const Home = require('./src/pages/Home.svelte').default;

// Automatically allow cross-origin requests
server.use(cors({ origin: true }));

server.use(express.static('public'));

server.get('/', function (req, res) {
    const { html, head } = Home.render();
    res.send(buildHtml(html, head));
});

exports.app = functions.https.onRequest(server);
