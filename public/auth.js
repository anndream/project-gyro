function login() {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(function () {
        const provider = new firebase.auth.TwitterAuthProvider();
        return firebase.auth().signInWithPopup(provider);
    });
}

function logout() {
    firebase.auth().signOut();
}

firebase.auth().onAuthStateChanged(function (user) {
    const buttons = document.getElementsByClassName("sign-in");

    Array.from(buttons).forEach(function (button) {
        if (user) {
            button.innerHTML = `Sign Out Of ${user.displayName}`;
            button.addEventListener('click', logout);
            button.removeEventListener('click', login);
        }
        else {
            button.innerHTML = 'Sign In';
            button.addEventListener('click', login);
            button.removeEventListener('click', logout);
        }
    });
});