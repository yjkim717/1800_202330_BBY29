

// name of html files 
let htmlAlias =
{
    //entry.html
    entry: "entry",
    index: "index",
    restaurantList: "restaurantList"
}

let domain = "http://localhost:8000";



// Functions
function ajaxGET(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                resolve(this.responseText);
            } else {
                reject(this.status);
            }
        }
        xhr.open("GET", url);
        xhr.send();
    });
}


