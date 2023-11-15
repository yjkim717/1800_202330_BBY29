document.getElementById('searchRestaurant').addEventListener('click', function () {
    // Get the restaurant name from the input
    var restaurantSearchInput = document.getElementById('restaurantSearch');
    var restaurantName = restaurantSearchInput.value;

    db.collection('restaurants').where('name', '==', restaurantName)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // Get the restaurant's waiting list
                var waitingList = doc.data().waitingList;

                //TODO: currently only showing UID need to show user name and num of people
                var waitingListItems = document.getElementById('waitingListItems');
                waitingListItems.innerHTML = '';

                waitingList.forEach(function (uid) {
                    var listItem = document.createElement('li');
                    listItem.textContent = uid;
                    waitingListItems.appendChild(listItem);
                });
            });
        })
        .catch(function (error) {
            console.error('Error getting documents: ', error);
        });
});

document.getElementById('addToWaitingList').addEventListener('click', function () {
    // Get the selected restaurant
    var restaurantSearchInput = document.getElementById('restaurantSearch');
    var restaurantName = restaurantSearchInput.value;


    var waitingList = document.getElementById('waitingListItems');
    var listItem = document.createElement('li');
    listItem.textContent = restaurantName;
    waitingList.appendChild(listItem);

    restaurantSearchInput.value = '';
});
