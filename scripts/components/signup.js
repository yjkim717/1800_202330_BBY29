

function lineup() {
    let user = firebase.auth().currentUser;
    
    if (!user) {
        console.log("NOT USER SIGNEDD IN");
        return;
    }
    let posterID = user.uid;
    let number = document.getElementById("numberOfPeople").value;

    //TODO: Grab array of restaurants selected from signup popup
    // TODO: Loop the bottom code for each restaurant
    $("input:checked.selectRestaurant").each((index, element) => {
        const restaurantID = $(element).attr("data-id");
        //TODO: add to requestlist of user the id of newly made request object 
        db.collection("signup").add({
            posterID,
            restaurantID,
            number,
            status: true
        })
        
    });
}

//TODO: when readSignup call change the status to false and remove from db
function readSignup() {
    console.log("write signup");
    let posterID = db.collection("users").doc(user.uid);
    let restaurantID = db.collection("restaurants").doc(restaurant.rid);
    let number = document.getElementById("numberOfPeople").value;
    let status = false;
}
