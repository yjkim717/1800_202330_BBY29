let user = firebase.auth().currentUser;

if (user) {
    lineup();
} else {

}

function lineup() {
    let posterID = db.collection("users").doc(user.uid);
    let number = document.getElementById("numberOfPeople").value;

    //TODO: Grab array of restaurants selected from signup popup
    // TODO: Loop the bottom code for each restaurant
    let restaurantID = db.collection("restaurants").doc(restaurant.rid);
    let status = true;
    //Grab # of people from lineup popup
    db.collection("signup").add({
        signupID: Math.floor(Math.random() * 1000),
        posterID,
        restaurantID,
        number,
        status
    })
}

//TODO: when readSignup call change the status to false and remove from db
function readSignup() {
    console.log("write signup");
    let posterID = db.collection("users").doc(user.uid);
    let restaurantID = db.collection("restaurants").doc(restaurant.rid);
    let number = document.getElementById("numberOfPeople").value;
    let status = false;
}
