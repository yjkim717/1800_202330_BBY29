

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


