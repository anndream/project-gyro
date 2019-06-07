function login() {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(function () {
        const provider = new firebase.auth.TwitterAuthProvider();
        return firebase.auth().signInWithPopup(provider);
    });
}

function logout() {
    firebase.auth().signOut();
}

firebase.auth().onAuthStateChanged(async function (user) {
    let userValue = null;
    if (user) {
        if (Cookies.get('user') === undefined || Cookies.get('user') === "null") {
            const userObserver = await firebase.firestore().collection('users').doc(user.uid).onSnapshot(function (doc) {
                console.log(doc);
                if (doc.data().username !== undefined) {
                    userValue = { ...doc.data(), uid: doc.id };
                    userObserver(); //cancel observer
                }
            });
        }
    }
    Cookies.set('user', userValue);
    document.getElementById('user').innerHTML = JSON.stringify(userValue);

});