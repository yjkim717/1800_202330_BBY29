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
                    resultMessage.innerHTML = `Hello, ${docData.name}`;

                    displayWaitlistWithStatus(doc.id);
                    return;
                }
            });

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
                            var numGuestCell = row.insertCell(1);
                            var statusCell = row.insertCell(2);
                            var acceptCell = row.insertCell(3);
                            var declineCell = row.insertCell(4);

                            nameCell.textContent = userDoc.data().name;

                            fetchSignupInfo(userDoc.id)
                                .then(function (signupData) {
                                    var numGuests = signupData.number;
                                    numGuestCell.textContent = numGuests;

                                    if (userDoc.data().waiting) {
                                        statusCell.innerHTML = '<div class="green-circle"></div> Waiting';

                                        var acceptButton = document.createElement('button');
                                        acceptButton.textContent = 'Accept';
                                        acceptButton.addEventListener('click', function () {
                                            console.log('Accepted: ' + userDoc.data().name);
                                            db.collection('users').doc(userDoc.id).update({ waiting: false });
                                            statusCell.innerHTML = '<div class="red-circle"></div> Not Waiting';
                                            acceptCell.textContent = '--------';
                                            declineCell.textContent = '--------';
                                        });
                                        acceptCell.appendChild(acceptButton);

                                        var declineButton = document.createElement('button');
                                        declineButton.textContent = 'Decline';
                                        declineButton.addEventListener('click', function () {
                                            console.log('Declined: ' + userDoc.data().name);
                                            acceptCell.textContent = '--------';
                                            declineCell.textContent = '--------';
                                        });
                                        declineCell.appendChild(declineButton);
                                    } else {
                                        statusCell.innerHTML = '<div class="red-circle"></div> Not Waiting';
                                        acceptCell.textContent = '--------';
                                        declineCell.textContent = '--------';
                                    }
                                })
                                .catch(function (error) {
                                    console.error('Error getting signup info: ', error);
                                });
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

function fetchSignupInfo(userUid) {
    return new Promise(function (resolve, reject) {
        db.collection('signup')
            .where('posterID', '==', userUid)
            .get()
            .then(function (signupQuerySnapshot) {
                signupQuerySnapshot.forEach(function (signupDoc) {
                    resolve(signupDoc.data());
                });
            })
            .catch(function (error) {
                reject(error);
            });
    });
}
