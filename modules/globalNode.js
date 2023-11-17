const express = require("express");
const app = express();

// Alias for html
    
let htmlAlias = 
{
    //entry.html
    entry:"entry",
    index:"index"
}

// variables
let domain = "http://localhost:8000";


// Functions
let ajaxGet = function ajaxGET(url, callback){
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200){
            callback(this.responseText);
        }else{
            console.log(this.status);
        }
    }
    xhr.open("GET", url);
    xhr.send(); 
}

exports.htmlAlias = htmlAlias;
exports.ajaxGET = ajaxGet;
