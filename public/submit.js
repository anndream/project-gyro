var base64image = '';
var reader = new FileReader();

const addImage = firebase.functions().httpsCallable('submitPost');

function submit() {
    const postName = document.getElementById('post-name').value;
    const file = document.getElementById('post-image-file').files[0];

    if (file && postName !== '') {
        // discard if it is more than 9mb 
        if (file.size > 9000000) {
            alert('File size is too large. Project Gyro allows images under 9mb');
        }
        else if (!firebase.auth().currentUser) {
            alert('You must be logged into an account to post');
        }
        else {
            addImage({name: postName, image: base64image}).then(result => {
                window.location.replace(`/post/${result.id}`);
            });
        }
    }
    else {
        alert('Post requires image and name')
    }
}

const preview = document.querySelector('img#image-preview');

document.getElementById('post-image-file').addEventListener('change', ev => {
    if (ev.target.files[0]) {
        reader.readAsDataURL(ev.target.files[0]);
    }

    reader.addEventListener("load", function () {
        preview.src = reader.result;
        base64image = reader.result;
    }, false);
})