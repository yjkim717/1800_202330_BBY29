
function loadListPopup(){
    $("#insertPopupHere").load("/components/listpopup.html");
}



function loadList(){
    db.collection("restaurants").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let restaurantTemplate = $("#restaurantPopup");
            let rest = restaurantTemplate.contents().clone();
            let data = doc.data();
            
            rest.find("#restaurantOption").append(data.name);
            rest.find("#restBut").attr("data-id", `${doc.id}`);
            
            $("#popupFormContainer").append(rest);
        });
    });
}

