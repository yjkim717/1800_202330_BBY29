console.log("pages.js start loading");

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
        console.log("Login event start");
        window.location.href = domain + "/login?authStyle=login";
        console.log("Login event end");
    })
    signup.addEventListener("click", function (e) {
        console.log("Signup event start");
        window.location.href = "/login?authStyle=signup";
        console.log("Login event end");
    })
    console.log("End Index");
}

/**
 * Insert login/signup 
 */
function doAllLogin() {
    let url = new URL(window.location.href);
    let search_param = url.searchParams;
    let login = document.getElementById("putLoginHere");
    if (search_param.get("authStyle") === "login") {
        ajaxGET("/components/login.html", function (data) {
            login.innerHTML = data;
            console.log("login inserted");
        });
    } else if (search_param.get("authStyle") === "signup") {
        ajaxGET("/components/signup.html", function (data) {
            login.innerHTML = data;
            console.log("signup inserted");
        });
    } else {
        console.log("Failed");
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



console.log("pages.js end loading");