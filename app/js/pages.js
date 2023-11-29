

let doAll =
{
    indexFunc: {
        doAllIndex: function () {
            doAll.helperFunc.insertNavbar();
            doAll.helperFunc.insertFooter();
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
        doAllEntry: function () {
            doAll.helperFunc.insertNavbar();
            doAll.helperFunc.insertFooter();
            let url = new URL(window.location.href);
            let search_param = url.searchParams;
            let login = document.getElementById("putSigninHere");
            if (search_param.get("authStyle") === "login") {
                ajaxGET("/components/login.html", function (data) {
                    login.innerHTML = data;
                    doAll.entryFunc.completeButton("loginSubmitButton", "login");
                })
            } else if (search_param.get("authStyle") === "signup") {
                ajaxGET("/components/signup.html", function (data) {
                    login.innerHTML = data;
                    entryFunc.completeButton("signupSubmitButton", "signup");
                });
            } else {
                console.log("Failed");
            }
        },
        completeButton: function (button, authStyle) {
            let userInfo = document.getElementById(authStyle);
            if (userInfo) {
                let signupSubmitButton = document.getElementById(button);
                if (signupSubmitButton) {
                    signupSubmitButton.addEventListener("click", function (e) {

                        if (button === "loginSubmitButton") {
                            if (login()) {
                                window.location.href = domain + "/map";
                            } else {
                                alert("Login failed");
                            }
                        } else if (button === "signupSubmitButton") {
                            if (signup()) {
                                window.location.href = domain + "/map";
                            } else {
                                alert("Signup failed");
                            }
                        }

                    });
                } else {
                    console.log("signup submit button not found");
                }
            } else {
                console.log("signup element not found");
            }
        }
    },

    teamFunc: {
        doAllTeam: function () {
            doAll.helperFunc.insertNavbar();
            doAll.helperFunc.insertFooter();
        }
    },

    mapFunc: {
        doAllMap: function () {

            doAll.helperFunc.insertNavbar();
            doAll.helperFunc.insertFooter();
            let popupList = document.getElementById("putRestaurantHere");
            let searchButton = document.getElementById("searchButton");
            searchButton.addEventListener("click", function (e) {
                console.log("Test");
                ajaxGET("/components/" + htmlAlias.restaurantList + ".html", function (data) {
                    //Grab element in popup.html to check if its dom is loaded

                    popupList.innerHTML = data;
                    let restaurantTemplate = document.getElementById("restaurantTemplate");
                    if (restaurantTemplate) {
                        db.collection("restaurants").get().then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                //template elements don't have child nodes until you grab its ".content"
                                let rest = restaurantTemplate.content.cloneNode(true);
                                let restData = doc.data();
                                rest.getElementById(`${"restaurantName"}`).innerHTML = restData.name;
                                rest.getElementById(`${"restaurantCheckBox"}`).attributes.dataId = doc.id;

                                document.getElementById("restaurantListContainer").append(rest);

                            });
                        });
                        document.getElementById("requestButton").addEventListener("click", function (e) {
                            doAll.mapFunc.lineup();
                            doAll.mapFunc.openConfirm();
                        });
                    }
                    let exitButton = document.getElementById("exitButton");
                    if (exitButton) {
                        exitButton.addEventListener("click", function (e) {
                            popupList.innerHTML = "";
                        });
                    }

                });
            })
        },
        lineup: function () {
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
                const restaurantID = $(element).attr("dataId");
                //TODO: add to requestlist of user the id of newly made request object 
                db.collection("signup").add({
                    posterID,
                    restaurantID,
                    number,
                    status: true
                })
            });
            if ($("input:checked.selectRestaurant").length > 0) {
                db.collection("users").doc(user.uid).update({ waiting: true });
            }

            db.collection("signup").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let use = db.collection("users").doc(user.uid);
                    use.update({
                        myrequest: firebase.firestore.FieldValue.arrayUnion(doc.id)
                    }).then(() => {
                        console.log("success");
                    }).catch(() => {
                        console.log("fail");
                    });
                })
            })
        },
        openConfirm: function () {
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
                        });
                        alert.querySelector("#accept").addEventListener("click", function (e) {
                            db.collection("users").doc(user.uid).update({
                                waiting: false,
                                myrequest: []
                            });
                            let requestsDelete = [];
                            db.collection("signup").get().then((querySnapshot) => {
                                querySnapshot.forEach((doc) => {
                                    let posterID = doc.data().posterID;
                                    if (user.uid == posterID) {
                                        console.log(doc.id);
                                        requestsDelete.push(doc.id);
                                    }
                                });
                                requestsDelete.forEach(function(data){
                                    db.collection("signup").doc(data).delete().then(()=>console.log("Delete success"));
                                })
                            });
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
        insertNavbar: function () {
            let nav = document.getElementById("putNavbarHere");
            ajaxGET("/components/navbar.html", function (data) {
                nav.innerHTML = data;

                const toggleBtn = document.querySelector('.navbar_toogleBtn');
                const menu = document.querySelector('.navbar_menu');
                const links = document.querySelector('.navbar_links');

                toggleBtn.addEventListener('click', () => {
                    menu.classList.toggle('active');
                    links.classList.toggle('active');
                });
                // let navbarMenu = document.querySelector(".navbar_menu").childNodes;
            });
        },
        insertFooter: function () {
            let footer = document.getElementById("putFooterHere");
            ajaxGET("/components/footer.html", function (data) {
                footer.innerHTML = data;
            });
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





console.log("pages.js end loading");