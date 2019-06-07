require('svelte/register');

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

// I probably should have made the firebase config environment variables but they are public anyway
function buildHtml(html, head) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:200,400&display=swap" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="/styles.css">
        <script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
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
const User = require('./src/pages/User.svelte').default;

// Automatically allow cross-origin requests
server.use(cors({ origin: true }));

server.get('/', function (req, res) {
    const { html, head } = Home.render();
    res.send(buildHtml(html, head));
});

server.get('/user/:username', async function (req, res) {
    let profile = null;
    try {
        const queries = await firestore.collection('users').where('username', '==', req.params.username).get();
        profile = queries.docs[0].data();
    }
    finally {
        const { html, head } = User.render({ ...profile, url: `${req.protocol}://${req.get('host')}${req.originalUrl}` });
        res.send(buildHtml(html, head));
    }
});

exports.app = functions.https.onRequest(server);

exports.userCreate = functions.auth.user().onCreate(async (user) => {

    // we will first test if the username already exist
    // this is extremely unlikely but in the case someone changes there username on twitter the firebase value
    // will not be updated and thus somebody could slip in with the same in and break our system
    const usernameTaken = await firestore.collection('users').where('username', '==', user.displayName).get().then(doc => !doc.empty);

    // If username is take append a random number (between 0 and 1000) to the username
    // Of course we should do another check to see whether the new username is taken but the chances are so low now
    // that its not worth implementing and we could make between 0 and 1 million to make it even rarer.
    const username = usernameTaken ? `${user.displayName}${Math.floor(Math.random() * 1000)}` : user.displayName;

    // publicizing user.uid seems dangerous but we have been affirmed by firebasers that its perfectly safe
    // https://stackoverflow.com/questions/42620723/firebase-database-risks-associated-with-exposing-uid-on-the-client-side
    await firestore.collection('users').doc(user.uid).set({
        username,
        photoURL: user.photoURL
    });
    // we could add more data to this document such as bio, followers, ...
});

exports.userDelete = functions.auth.user().onDelete(async (user) => {
    await firestore.collection('users').doc(user.uid).delete();
});