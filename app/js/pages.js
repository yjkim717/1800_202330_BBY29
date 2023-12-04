

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
            doAll.entryFunc.completeButton(`${authStyle}SubmitButton`, `${authStyle}`);
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
                    return "Sign in Success";
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
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    doThem(firebase.auth().currentUser);
                } else {
                    alert("Not Signed in");
                    return;
                }
            });
            async function doThem(user) {
                await doAll.helperFunc.insertNavbar();
                await doAll.helperFunc.insertFooter();
                let popupList = document.getElementById("putRestaurantHere");
                let searchButton = document.getElementById("searchButton");

                searchButton.addEventListener("click", function (e) {
                    searchButtonEvent();
                })

                db.collection("users").doc(user.uid).onSnapshot(function (doc) {
                    respond(doc);
                })

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
                    });
                    let exitButton = document.getElementById("exitButton");
                    exitButton.addEventListener("click", function (e) {
                        popupList.innerHTML = "";
                    });
                }

                async function respond(doc) {
                    if (doc.data().confirm.length > 0) {
                        let restaurantCode = await db.collection("restaurants").doc(doc.data().confirm[0]).get();
                        restaurantCode = restaurantCode.data().code;
                        let signup = db.collection("signup").where("restaurandCode", "==", restaurantCode).where("posterID", "==", user.uid).get();

                        //Soon to update namespace

                        doAll.mapFunc.openConfirm(signup.id, doc.data().confirm[0]);
                    }
                }
            }
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
                    if (signup.data().posterID == user.uid) {
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
        openConfirm: async function (signupID, restaurantID) {
            let user = firebase.auth().currentUser;
            let userDoc = await db.collection("users").doc(user.uid).get();
            let signupDoc = await db.collection("signup").doc(signupID).get();
            let restaurantDoc = await db.collection("restaurants").doc(restaurantID).get();

            let alertHTML = await ajaxGET("/components/alert.html");
            document.body.insertAdjacentHTML("beforeend", alertHTML);

            addDeclineButton();
            addAcceptButton();



            function addDeclineButton() {
                document.querySelector("#decline").addEventListener("click", function (e) {
                    decline();
                });

                async function decline() {
                    db.collection("users").doc(user.uid).update({
                        myrequest: firebase.firestore.FieldValue.delete(signupID),
                        confirm: firebase.firestore.FieldValue.arrayRemove(restaurantID)
                    });
                    let signups = await db.collection("signup")
                        .where("posterID", "==", user.uid)
                        .where("restaurantCode", "==", restaurantDoc.data().code)
                        .get();
                    
                    signups.forEach(function (data) {
                        data.ref.delete();
                    })
                    document.body.removeChild(document.getElementById("alert"));
                    document.body.removeChild(document.getElementById("alertBubbles"));
                    showWaitingMessage();
                }
            }

            function addAcceptButton() {
                document.querySelector("#accept").addEventListener("click", function (e) {
                    clearUser();
                    clearWaitlist();
                    clearSignup();
                    document.body.removeChild(document.getElementById("alert"));
                    document.body.removeChild(document.getElementById("alertBubbles"));
                });

                //Sets user waiting status to false, and clears their line up request list
                function clearUser() {
                    db.collection("users").doc(user.uid).update({
                        waiting: false,
                        myrequest: [],
                        confirm: []
                    });
                }

                //Deletes user's name from all restaurants' waitlist
                async function clearWaitlist() {

                    let restaurantsWithUser = await db.collection("restaurants")
                        .where("waitlist", "array-contains", userDoc.data().name).get();

                    restaurantsWithUser.forEach(function (data) {
                        data.ref.update({
                            waitlist: firebase.firestore.FieldValue.delete(userDoc.data().name)
                        })
                    })
                }

                //Deletes all signup requests made by user
                async function clearSignup() {
                    let signupDocs = await db.collection("signup").where("posterID", "==", user.uid).get();
                    signupDocs.forEach(function (data) {
                        data.ref.delete();
                    })
                }
            }
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
    // console.log("write signup");
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