console.log("pages.js start loading");
console.log(globalLoaded);

/**
 * Adds event listeners to login and sign up buttons. It 
 * redirects window to login.html, which 
 */
function doAllIndex() {
    console.log("Start index");
    insertNavbar();
    insertFooter();
    let login = document.getElementById('loginButton');
    let signup = document.getElementById('signupButton');

    login.addEventListener("click", function (e) {
        window.location.href = domain + "/entry?authStyle=login";
    })
    signup.addEventListener("click", function (e) {
        console.log("Signup event start");
        window.location.href = domain + "/entry?authStyle=signup";
        console.log("Login event end");
    })
    console.log("End Index");
}

/**
 * Insert login/signup 
 */
function doAllEntry() {
    let url = new URL(window.location.href);
    let search_param = url.searchParams;
    let login = document.getElementById("putLoginHere");
    if (search_param.get("authStyle") === "login") {
        ajaxGET("/components/login.html", function (data) {
            login.innerHTML = data;
            addButtonToMap("loginSubmitButton");
        })
    } else if (search_param.get("authStyle") === "signup") {
        ajaxGET("/components/signup.html", function (data) {
            login.innerHTML = data;
            addButtonToMap("signupSubmitButton");
        });
    } else {
        console.log("Failed");
    }
}
/**
 * 
 */
function addButtonToMap(button) {
    let userInfo = document.getElementById("userInfo");
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
    console.log("Navbar insertion start");
    let nav = document.getElementById("putNavbarHere");
    ajaxGET("/components/navbar.html", function (data) {
        nav.innerHTML = data;
        console.log("navbar inserted");
    });
    console.log("Navbar insertion end");
}

/** 
 * Inserts footer 
 */
function insertFooter() {
    console.log("Footer insertion start");
    let footer = document.getElementById("putFooterHere");
    ajaxGET("/components/footer.html", function (data) {
        footer.innerHTML = data;
        console.log("footer inserted");
    });
    console.log("Footer insertion end");
}

/**
 * Redirect to map after clicking login/signup button in entry.html
 * 
 * linked in:
 *  -login.html
 *  -signup.html
 */
function goToMap() {
    let url = new URL(window.location.href);
    let search_param = url.searchParams;
    if (search_param.get("authStyle") === "login") {
        let login = document.getElementById("loginSubmitButton");
        login.addEventListener("click", function (e) {
            alert("alsdkfhijawoge");
            window.location.href = domain + "/map";
        });
    } else if (search_param.get("authStyle") === "signup") {
        let signup = document.getElementById("signupSubmitButton");
        signup.addEventListener("click", function (e) {
            window.location.href = domain + "/map";
        });
    } else {
        console.log("Failed");
    }

}


console.log("pages.js end loading");