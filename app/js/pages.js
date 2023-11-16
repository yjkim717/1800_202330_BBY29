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
 * Inserts navbar 
 */
function insertNavbar() {
    console.log("Navbar insertion start");
    let nav = document.getElementById("putNavbarHere");
    ajaxGET("/components/navbar.html", function(data){
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
    ajaxGET("/components/footer.html", function(data){
        footer.innerHTML = data;
        console.log("footer inserted");
    });
    console.log("Footer insertion end");
}

/**
 * Insert login/signup 
 */
function insertLogin() {
    if ((window.localStorage.getItem("authStyle") ?? "login") === "login"){
        $("#put-login-here").load("/components/login.html");
    }else{
        $("#put-login-here").load("/components/signup.html");
    }
}

console.log("pages.js end loading");