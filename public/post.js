function deletePost(id) {
    firebase.functions().httpsCallable('deletePost')({postID: id}).then(res => {
        if(res.error !== null) {
            alert(res.error)
        }
        else {
            window.location.replace(`/`);
        }
    });
}