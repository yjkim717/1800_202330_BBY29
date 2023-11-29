document.getElementById('searchButton').addEventListener('click', function () {
    var restaurantCodeInput = document.getElementById('searchBar');
    var restaurantCode = parseInt(restaurantCodeInput.value.trim());

    db.collection('restaurants')
        .where('code', '==', restaurantCode)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                var docData = doc.data();
                if (docData.code === restaurantCode) {
                    var resultMessage = document.getElementById('resultMessage');
                    resultMessage.innerHTML = `Hello ${docData.name}`;

                    displayWaitlistWithStatus(doc.id);
                    return;
                }
            });

            var resultMessage = document.getElementById('resultMessage');
            resultMessage.textContent = `No restaurant found with code: ${restaurantCode}`;
            clearWaitlist();
        })
        .catch(function (error) {
            console.error('Error getting documents: ', error);
        });
});

function displayWaitlistWithStatus(restaurantId) {
    var waitlistBody = document.getElementById('waitlistBody');

    db.collection('restaurants').doc(restaurantId).get()
        .then(function (doc) {
            var waitlist = doc.data().waitlist || [];

            waitlistBody.innerHTML = "";

            waitlist.forEach(function (customerName) {
                db.collection('users')
                    .where('name', '==', customerName)
                    .get()
                    .then(function (userQuerySnapshot) {
                        userQuerySnapshot.forEach(function (userDoc) {
                            var row = waitlistBody.insertRow();
                            var nameCell = row.insertCell(0);
                            var statusCell = row.insertCell(1);

                            nameCell.textContent = userDoc.data().name;
                            if (userDoc.data().waiting) {
                                statusCell.innerHTML = '<div class="green-circle"></div> Waiting';
                            } else {
                                statusCell.innerHTML = '<div class="red-circle"></div> Not Waiting';
                            }
                        });
                    })
                    .catch(function (error) {
                        console.error('Error getting user documents: ', error);
                    });
            });
        })
        .catch(function (error) {
            console.error('Error getting waitlist: ', error);
        });
}

function clearWaitlist() {
    var waitlistBody = document.getElementById('waitlistBody');
    waitlistBody.innerHTML = "";
}
