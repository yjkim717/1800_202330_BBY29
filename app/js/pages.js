console.log("pages.js start loading");
function loginPage() {
    window.localStorage.setItem("authStyle", "login");
    window.location.href = "./login.html";
}

function signupPage() {
    window.localStorage.setItem("authStyle", "signup");
    window.location.href = "./login.html";
}

console.log("Start login and signup render");
let login = document.getElementById('loginButton');
let signup = document.getElementById('signupButton');
login.addEventListener("click", function (e) {
    console.log("Login event start");
    window.location.href = "http://localhost:8000/login";
    let url = new URL(window.location.href);
    let search_params = url.searchParams;
    search_params.set("authStyle", "login");
    console.log("Login event end");
})
signup.addEventListener("click", function (e) {
    console.log("Signup event start");
    window.location.href = "/login";
    let url = new URL(window.location.href);
    let search_params = url.searchParams;
    search_params.set("authStyle", "signup");
    console.log("Login event end");
})
function doAllIndex() {

}
doAllIndex();

console.log("pages.js end loading");