require('svelte/register');

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

const App = require('./src/App.svelte').default;

function buildHtml(html, head) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:200,400&display=swap" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="styles.css">
        <title>Project Gyro</title>
        ${head}
    </head>
    <body>
        ${html}
    </body>
    </html>`;
}

const app = express();
const serviceAccount = require("./project-gyro-admin-key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://project-gyro.firebaseio.com"
});

const firestore = admin.firestore();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.use(express.static('public'));

app.get('/', function (req, res) {
    const { html, head } = App.render({ world: 'World' });
    res.send(buildHtml(html, head));
});

exports.app = functions.https.onRequest(app);
