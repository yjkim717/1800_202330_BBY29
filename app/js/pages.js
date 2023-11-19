



/**
 * Adds event listeners to login and sign up buttons. It 
 * redirects window to login.html, which 
 */
function doAllIndex() {
    insertNavbar();
    insertFooter();
    let login = document.getElementById(components.login.elements.loginButton);
    let signup = document.getElementById(components.signup.elements.signupButton);
    login.addEventListener("click", function (e) {
        window.location.href = domain + "/entry?authStyle=login";
    })
    signup.addEventListener("click", function (e) {
        window.location.href = domain + "/entry?authStyle=signup";
    })
}

/**
 * Insert login/signup 
 */
function doAllEntry() {
    let url = new URL(window.location.href);
    let search_param = url.searchParams;
    let login = document.getElementById(components.login.placeholder);
    if (search_param.get("authStyle") === "login") {
        ajaxGET("/components/login.html", function (data) {
            login.innerHTML = data;
            completeButton(components.login.elements.loginSubmitButton, components.login.container);
        })
    } else if (search_param.get("authStyle") === "signup") {
        ajaxGET("/components/signup.html", function (data) {
            login.innerHTML = data;
            addButtonToMap(components.signup.elements.signupSubmitButton, components.signup.container);
        });
    } else {
        console.log("Failed");
    }
}

/**
 * Helper function of doAllEntry()
 */
function completeButton(button, authStyle) {
    let userInfo = document.getElementById(authStyle);
    if (userInfo) {
        let signupSubmitButton = document.getElementById(button);
        if (signupSubmitButton) {
            signupSubmitButton.addEventListener("click", function (e) {
                
                if (button === "loginSubmitButton"){
                    if (login()){
                        window.location.href = domain + "/map";
                    }else{
                        alert("Login failed");
                    }
                }else if(button === "signupSubmitButton"){
                    if (signup()){
                        window.location.href = domain + "/map";
                    }else{
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

/**
 * PopList
 */
function openList() {
    let popupList = document.getElementById(components.restaurantList.placeholder);
    let searchButton = document.getElementById(components.search.elements.searchButton);
    searchButton.addEventListener("click", function (e) {
        ajaxGET("/components/" + htmlAlias.restaurantList + ".html", function (data) {
            //Grab element in popup.html to check if its dom is loaded

            popupList.innerHTML = data;
            let restaurantTemplate = document.getElementById(components.restaurantList.elements.restaurantTemplate);
            if (restaurantTemplate) {
                db.collection("restaurants").get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        //template elements don't have child nodes until you grab its ".content"
                        let rest = restaurantTemplate.content.cloneNode(true);
                        let restData = doc.data();
                        rest.getElementById(`${components.restaurantList.elements.restaurantName}`).innerHTML = restData.name;
                        rest.getElementById(`${components.restaurantList.elements.checkbox}`).attributes.dataId = doc.id;

                        document.getElementById(components.restaurantList.elements.restaurantContainer).append(rest);

                    });
                });
            }

        });
    })
    
}


/** 
 * Inserts navbar 
 */
function insertNavbar() {
    let nav = document.getElementById(components.navbar.placeholder);
    ajaxGET("/components/navbar.html", function (data) {
        nav.innerHTML = data;
    });
}

/** 
 * Inserts footer 
 */
function insertFooter() {
    let footer = document.getElementById(components.footer.placeholder);
    ajaxGET("/components/footer.html", function (data) {
        footer.innerHTML = data;
    });
}



console.log("pages.js end loading");