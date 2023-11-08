

/** 
 * 
 */


function authenticate() {

    let email = $("#email").val();
    let password = $("#password").val();
    console.log(email);
    //authenticate using email and password
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    
}
