

function loginPage(){
    window.localStorage.setItem("authStyle", "login");
    window.location.href = "./login.html";
}

function signupPage(){
    window.localStorage.setItem("authStyle", "signup");
    window.location.href = "./login.html";
}