var currentUser;

if (user) {
    db.collection("signup").add({
        singUpId: singUpId,
        posterID: uid,
        restaurantID: rid,
        number: number,
        status: true
    })
}
function writeSignup() {
    console.log("write signup");
    let posterID = db.collection("users").doc(user.uid);
    let restaurantID = db.collection("restaurants").doc(restaurant.rid);
    let number = document.getElementById("numberOfPeople").value;
    let status = true;
    //TODO:user myRequst list add the signupID

}

//TODO: when readSignup call change the status to false and remove from db
function readSignup() {
    console.log("write signup");
    let posterID = db.collection("users").doc(user.uid);
    let restaurantID = db.collection("restaurants").doc(restaurant.rid);
    let number = document.getElementById("numberOfPeople").value;
    let status = false;
}

