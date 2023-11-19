



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
            addButtonToMap(components.login.elements.loginSubmitButton, components.login.container);
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
function addButtonToMap(button, authStyle) {
    let userInfo = document.getElementById(authStyle);
    if (userInfo) {
        let signupSubmitButton = document.getElementById(button);
        if (signupSubmitButton) {
            signupSubmitButton.addEventListener("click", function (e) {
                window.location.href = domain + "/map";
            });
        } else {
            console.log("signup submit button not found");
        }
    } else {
        console.log("signup element not found");
    }
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