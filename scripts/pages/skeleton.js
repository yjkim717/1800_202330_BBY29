/** 
 *  Puts html components into pages
 */

/** Inserts default navbar 
 * 
 */
function insertNavbarDefault(){
    $("#put-navbar-here").load("/components/navbar.html")
}

function insertFooterDefault(){
    $("#put-footer-here").load("/components/footer.html")
}

insertNavbarDefault();
insertFooterDefault();