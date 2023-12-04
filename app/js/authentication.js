

/** 
 * 
 */

async function login() {
    let email = $("#email").val();
    let password = $("#password").val();
    firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (error.code === 'auth/email-already-in-use') {
                alert('email already in use!');
            } else if (error.code === 'auth/network-request-failed') {
                alert('without network connection!');
            } else if (error.code === 'auth/invalid-email') {
                alert('invalid E-mail!');
                // email wrong format
            }
            console.log(error);
        });
    let user = firebase.auth().currentUser;
    if (user) {
        return true;
    } else {
        return false;
    }
}

async function signup() {
    let email = $("#email").val();
    let password = $("#password").val();
    let name = $("#name").val();
    let phone = $("#number").val().replaceAll("\\s", "");
    //create account using email and password
    let userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
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
    let addUser = await db.collection("users").doc(user.uid).set({
        confirm:[],
        name: name,
        email: user.email,
        phone: phone,
        myrequest: [],
        waiting: false
    })
    if (user) {
        return true;
    } else {
        return false;
    }
}
