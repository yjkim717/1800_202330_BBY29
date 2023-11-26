let htmlAlias =
{
    //entry.html
    entry: "entry",
    index: "index",
    restaurantList: "restaurantList"
}

// REQUIRES
const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs");

// Virtual Paths
app.use("/js", express.static("app/js"));
app.use("/css", express.static("public/css"));
app.use("/img", express.static("public/img"));
app.use("/font", express.static("public/font"));
app.use("/components", express.static("public/components"));
app.use("/html", express.static("app/html"));

app.get("/", function (req, res) {
    let doc = fs.readFileSync("./app/html/index.html", "utf8");
    res.send(doc);
});

app.get("/entry", function (req, res) {
    let doc = fs.readFileSync("./app/html/entry.html", "utf8");
    res.send(doc);
});

app.get("/map", function (req, res) {
    let doc = fs.readFileSync("./app/html/map.html", "utf8");
    res.send(doc);
});

app.get("/status", function (req, res) {
    let doc = fs.readFileSync("./app/html/status.html", "utf8");
    res.send(doc);
});

app.get("/components/navbar.html", function(req, res){
    let doc = fs.readFileSync("/public/components/navbar.html", "utf8");
    res.send(doc);
});

app.get("/components/login.html", function(req, res){
    let doc = fs.readFileSync("/public/components/login.html", "utf8");
    res.send(doc);
});

app.get("/components/signup.html", function(req, res){
    let doc = fs.readFileSync("/public/components/signup.html", "utf8");
    res.send(doc);
});

app.get("/components/" + htmlAlias.restaurantList + ".html", function(req, res){
    let doc = fs.readFileSync("/public/components/" + htmlAlias.restaurantList + ".html", "utf8");
    res.send(doc);
});

let port = 8000;
app.listen(port, function () {
    console.log("Example app listening on port " + port + "!");
});