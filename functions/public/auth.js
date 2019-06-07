function login() {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(function() {
        const provider = new firebase.auth.TwitterAuthProvider();
        return firebase.auth().signInWithPopup(provider);
    }).then((user) => {
        document.getElementById('user').innerHTML = JSON.stringify(user);
    });
}

function logout() {
    firebase.auth().signOut();
}

firebase.auth().onchange(() => {

});