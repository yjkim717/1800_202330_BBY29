

let doAll =
{
    indexFunc: {
        doAllIndex: async function () {
            await doAll.helperFunc.insertNavbar();
            await doAll.helperFunc.insertFooter();
            let login = document.getElementById("loginButton");
            let signup = document.getElementById("signupButton");
            login.addEventListener("click", function (e) {
                window.location.href = domain + "/entry?authStyle=login";
            })
            signup.addEventListener("click", function (e) {
                window.location.href = domain + "/entry?authStyle=signup";
            })
        }

    },

    entryFunc: {
        doAllEntry: async function () {
            await doAll.helperFunc.insertNavbar();
            await doAll.helperFunc.insertFooter();
            let url = new URL(window.location.href);
            let search_param = url.searchParams;
            let signinContainer = document.getElementById("putSigninHere");
            let authStyle = search_param.get("authStyle");

            let data = await ajaxGET(`/components/${authStyle}.html`);
            signinContainer.innerHTML = data;
            await doAll.entryFunc.completeButton(`${authStyle}SubmitButton`, `${authStyle}`);
            document.addEventListener('keydown', (event) => {
                if (event.key == "Enter") {
                    document.getElementById(`${authStyle}SubmitButton`).click();
                }
            });
        },
        completeButton: async function (button, authStyle) {
            let userInfo = document.getElementById(authStyle);
            let signupSubmitButton = document.getElementById(button);
            let signinSuccess;
            let signupEvent = async function () {
                if (authStyle == "login") {
                    signinSuccess = await login();
                } else if (authStyle == "signup") {
                    signinSuccess = await signup();
                } else {
                    return "Wrong authstyle";
                }
                if (signinSuccess) {
                    const currentUserId = firebase.auth().currentUser.uid;
                    window.location.href = domain + "/map?userId=" + currentUserId;
                } else {
                    return "Sign in failed";
                }
            }
            signupSubmitButton.addEventListener("click", function (e) {
                signupEvent().then((result) => alert(result));
            });
        }
    },

    teamFunc: {
        doAllTeam: function () {
            doAll.helperFunc.insertNavbar();
            doAll.helperFunc.insertFooter();
            this.sendEmail();
        },
        sendEmail: function () {
            let user = firebase.auth().currentUser;
            let submit = document.getElementById("contactSubmitButton");
            let message = document.getElementById("message");
            let email = document.getElementById("email");
            let name = document.getElementById("name");
            submit.addEventListener("click", function (e) {
                const recipient = 'johnbuspark@example.com';
                const subject = 'LineUp Message';
                const body = `${message.value}`;
                const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

                window.location.href = mailtoLink;
            });
        }
    },

    statusFunc: {
        doAllStatus: function () {
            doAll.helperFunc.insertNavbar();
            doAll.helperFunc.insertFooter();
        }
    },

    mapFunc: {
        doAllMap: async function () {
            await doAll.helperFunc.insertNavbar();
            await doAll.helperFunc.insertFooter();
            let popupList = document.getElementById("putRestaurantHere");
            let searchButton = document.getElementById("searchButton");

            let searchButtonEvent = async function () {
                let listData = await ajaxGET("/components/restaurantList.html");
                popupList.innerHTML = listData;
                let restaurantTemplate = document.getElementById("restaurantTemplate");
                let querySnapshot = await db.collection("restaurants").get();
                querySnapshot.forEach((doc) => {
                    //template elements don't have child nodes until you grab its ".content"
                    let rest = restaurantTemplate.content.cloneNode(true);
                    let restData = doc.data();
                    rest.getElementById(`restaurantName`).innerHTML = restData.name;
                    rest.getElementById(`restaurantCheckBox`).setAttribute("dataId", doc.id);
                    document.getElementById("restaurantListContainer").append(rest);

                });
                document.getElementById("requestButton").addEventListener("click", function (e) {
                    doAll.mapFunc.lineup();
                    doAll.mapFunc.openConfirm();
                });
                let exitButton = document.getElementById("exitButton");
                exitButton.addEventListener("click", function (e) {
                    popupList.innerHTML = "";
                });
            }

            searchButton.addEventListener("click", function (e) {
                searchButtonEvent();
            })
        },
        lineup: async function () {
            let user = firebase.auth().currentUser;

            if (!user) {
                console.log("NOT USER SIGNEDD IN");
                return;
            }
            let number = document.getElementById("numberOfPeople").value;
            let selectedRestaurants = document.querySelectorAll("input:checked.selectRestaurant");
            let restaurantsArray = Array.from(selectedRestaurants);

            addSignups();
            updateWaitingStatus();
            addNameToWaitlist();
            addMyrequest();

            // Add each restaurant signup request 
            function addSignups() {

                let addRestaurant = async function (restaurant) {
                    let restID = restaurant.getAttribute("dataId");
                    let restDoc = await db.collection("restaurants").doc(restID).get();

                    let restCode = restDoc.data().code;

                    let currentSignupRequests = await db.collection("signup")
                        .where("restaurantCode", "==", restCode)
                        .where("posterID", "==", user.uid).get();
                    currentSignupRequests.forEach(function (doc) {
                        //LESSON: doc.ref reference to actual document
                        db.collection("users").doc(user.uid).update({
                            myrequest: firebase.firestore.FieldValue.delete(doc.id)
                        })
                        doc.ref.delete();
                    });

                    let signupRequest = await db.collection("signup").add({
                        posterID: user.uid,
                        restaurantCode: restCode,
                        number: number,
                        status: true
                    })
                    let updateSuccess = await db.collection("users").doc(user.uid).update({
                        myrequest: firebase.firestore.FieldValue.arrayUnion(signupRequest)
                    })
                }
                restaurantsArray.forEach(function (restaurant) {
                    addRestaurant(restaurant);
                })
            }

            // Change user waiting status to true
            function updateWaitingStatus() {

                if (restaurantsArray.length > 0) {
                    db.collection("users").doc(user.uid).update({ waiting: true });
                }
            }

            //Add user name to restaurant doc waitlist
            function addNameToWaitlist() {

                let addNameToRest = async function (rest) {
                    let restID = rest.getAttribute("dataId");
                    let userDoc = await db.collection("users").doc(user.uid).get();
                    let restDoc = await db.collection("restaurants").doc(restID);
                    return await restDoc.update({
                        waitlist: firebase.firestore.FieldValue.arrayUnion(userDoc.data().name)
                    });
                }
                restaurantsArray.forEach(function (rest) {
                    addNameToRest(rest).then((resolve) => console.log(resolve));
                })
            }

            //Add signup Id to user
            async function addMyrequest() {
                let signupColl = await db.collection("signup").get();
                async function updateUser(signup) {
                    if (signup.data().posterID == user.uid){
                        let userDoc = await db.collection("users").doc(user.uid);
                        userDoc.update({
                            myrequest: firebase.firestore.FieldValue.arrayUnion(signup.id)
                        }).then(() => {
                            console.log("success");
                        }).catch(() => {
                            console.log("fail");
                        });
                    }
                }
                signupColl.forEach((signup) => {
                    updateUser(signup);
                });
            }
        },
        openConfirm: async function () {
            let user = firebase.auth().currentUser;
            let promise = new Promise(function (resolve, reject) {
                setTimeout(() => resolve("done"), 1000);
            });
            
            promise.then(function (result) {
                ajaxGET("/components/alert.html", function (data) {
                    if (!document.getElementById("alert")) {
                        document.body.insertAdjacentHTML("beforeend", data);
                    }
                    let alert = document.getElementById("alert");
                    if (alert) {
                        alert.querySelector("#decline").addEventListener("click", function (e) {
                            // Nothing here because we need id of restaurant that is being declined
                            document.body.removeChild(alert);
                            document.body.removeChild(document.getElementById("alertBubbles"));
                            showWaitingMessage();
                        });
                        alert.querySelector("#accept").addEventListener("click", function (e) {
                            db.collection("users").doc(user.uid).update({
                                waiting: false,
                                myrequest: []
                            });
                            let restWithName = [];
                            // Remove name from waitlist after clicking confirm
                            db.collection("users").doc(user.uid).get().then(function (user) {
                                db.collection("restaurants").get().then(function (querySnapshot) {
                                    querySnapshot.forEach(function (rest) {
                                        if (rest.data().waitlist.includes(user.data().name)) {
                                            restWithName.push(rest.id);
                                        }
                                    });
                                    restWithName.forEach(function (restID) {
                                        db.collection("restaurants").doc(restID).update({
                                            waitlist: firebase.firestore.FieldValue.arrayRemove(`${user.data().name}`)
                                        })
                                    })
                                })
                            })

                            let requestsDelete = [];
                            db.collection("signup").get().then((querySnapshot) => {
                                querySnapshot.forEach((doc) => {
                                    let posterID = doc.data().posterID;
                                    if (user.uid == posterID) {
                                        console.log(doc.id);
                                        requestsDelete.push(doc.id);
                                    }
                                });
                                requestsDelete.forEach(function (data) {
                                    db.collection("signup").doc(data).delete().then(() => console.log("Delete success"));
                                })
                            });
                            db.collection("restaurants")
                            //Send confirmation request to restaurant
                            document.body.removeChild(alert);
                            document.body.removeChild(document.getElementById("alertBubbles"));
                        });
                    }
                });

            });
        },

    },

    helperFunc: {
        insertNavbar: async function () {
            let nav = document.getElementById("putNavbarHere");

            let navbar = await ajaxGET("/components/navbar.html");
            nav.innerHTML = navbar;

            const toggleBtn = document.querySelector('.navbar_toogleBtn');
            const menu = document.querySelector('.navbar_menu');
            const links = document.querySelector('.navbar_links');

            toggleBtn.addEventListener('click', () => {
                menu.classList.toggle('active');
                links.classList.toggle('active');
            });
        },
        insertFooter: async function () {
            let footer = document.getElementById("putFooterHere");
            let footerData = await ajaxGET("/components/footer.html");
            footer.innerHTML = footerData;
        }
    }
}




//TODO: when readSignup call change the status to false and remove from db
function readSignup() {
    console.log("write signup");
    let posterID = db.collection("users").doc(user.uid);
    let restaurantID = db.collection("restaurants").doc(restaurant.rid);
    let number = document.getElementById("numberOfPeople").value;
    let status = false;
}


function showWaitingMessage() {
    let waitingMessage = document.createElement("div");
    waitingMessage.id = "waitingMessage";
    waitingMessage.innerText = "Waiting for other Restaurant's response!";

    waitingMessage.style.position = "fixed";
    waitingMessage.style.top = "50%";
    waitingMessage.style.left = "50%";
    waitingMessage.style.transform = "translate(-50%, -50%)";
    waitingMessage.style.padding = "20px";

    waitingMessage.style.background = "rgba(255, 216, 228, 0.4)";
    waitingMessage.style.border = "8px solid rgba(255, 216, 228, 0.9)";
    waitingMessage.style.backdropFilter = "blur(10px)";
    waitingMessage.style.color = "#625B71";

    document.body.appendChild(waitingMessage);

    setTimeout(function () {
        let waitingMessage = document.getElementById("waitingMessage");
        if (waitingMessage) {
            document.body.removeChild(waitingMessage);
        }
    }, 3000);
}


console.log("pages.js end loading");