// REQUIRES
const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs");

// Virtual Paths
app.use("/js", express.static("./app/js"));
app.use("/css", express.static("./public/css"));
app.use("/img", express.static("./public/img"));
app.use("/font", express.static("./public/font"));
app.use("/components", express.static("./public/components"));

app.get("/", function (req, res) {
    let doc = fs.readFileSync("./app/html/index.html", "utf8");
    res.send(doc);
});

let port = 8000;
app.listen(port, function () {
    console.log("Example app listening on port " + port + "!");
});