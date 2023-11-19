

// name of html files 
let htmlAlias =
{
    //entry.html
    entry: "entry",
    index: "index",
    restaurantList: "restaurantList"
}

let domain = "http://localhost:8000";

/**
 * Elements
    placeholder = the element we dynamically add the content into
    container = the parent element of the content
    elements = relevant children element of the content, or other elements related to content
 */
let components = 
{
    footer: {
        placeholder: "putFooterHere",
        container: "footer",
        elements: undefined
    },
    navbar: {
        placeholder: "putNavbarHere",
        container: "navbar",
        elements: undefined
    },
    login: {
        placeholder: "putSigninHere",
        container: "login",
        elements: {
            loginButton: "loginButton",
            loginSubmitButton: "loginSubmitButton"
        }
    },
    signup: {
        placeholder: "putSigninHere",
        container: "signup",
        elements: {
            signupButton: "signupButton",
            signupSubmitButton: "signupSubmitButton"
        }
    },
    logo: {
        placeholder: "logo",
        container: "logoText",
        elements: undefined
    },
    search: {
        placeholder: undefined,
        container: undefined,
        elements: {
            searchBar: "searchBar",
            searchButton: "searchButton"
        }
    }, 
    map: {
        placeholder: "putMapHere",
        container: undefined,
        elements: undefined
    }, 
    restaurantList: {
        placeholder: "putRestaurantHere",
        container: "restaurantList",
        elements: {
            form: "restaurantListForm",
            restaurantTemplate: "restaurantTemplate",
            restaurantName: "restaurantName",
            numberOfPeople: "numberOfPeople",
            checkbox: "restaurantCheckBox"
        }
    }, 
    

}

// Functions
function ajaxGET(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            callback(this.responseText);
        } else {
            console.log(this.status);
        }
    }
    xhr.open("GET", url);
    xhr.send();
    return new Promise((resolve, reject)=>{
        resolve("Success");
    });
}

