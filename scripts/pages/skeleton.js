/** 
 *  Puts html components into pages
 */

/** Inserts default navbar 
 * 
 */
function insertNavbarDefault() {
    $("#put-navbar-here").load("/components/navbar.html")
}

function insertFooterDefault() {
    $("#put-footer-here").load("/components/footer.html")
}

function insertLogin() {
    if ((window.localStorage.getItem("authStyle") ?? "login") === "login"){
        $("#put-login-here").load("/components/login.html");
    }else{
        $("#put-login-here").load("/components/signup.html");
    }
}
