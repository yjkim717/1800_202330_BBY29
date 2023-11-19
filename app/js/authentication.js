

/** 
 * 
 */

function login() {
    let email = $("#email").val();
    let password = $("#password").val();
    firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });
    let user = firebase.auth().currentUser;
    if (user){
        return true;
    }else{
        return false;
    }
}

function signup() {
    let email = $("#email").val();
    let password = $("#password").val();
    let name = $("#name").val();
    let phone = $("#number").val().replaceAll("\\s", "");

    //create account using email and password
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;

            //update displayName
            user.updateProfile({
                displayName: name
            }).then(
                () => console.log("Dislayname update success")
            ).catch(
                () => console.log("Dislayname update fail")
            );

            //add document
            db.collection("users").doc(user.uid).set({
                name: name,
                email: user.email,
                phone: phone,
                myrequest: [],
                waiting: false
            }).then(function () {
                console.log("New user added to firestore");
            }).catch(function (error) {
                console.log("Error adding new user: " + error);
            });

        })
        .catch((error) => {
            //If account under that email exists
            var errorCode = error.code;
            var errorMessage = error.message;
        });
        let user = firebase.auth().currentUser;
        if (user){
            return true;
        }else{
            return false;
        }
}
