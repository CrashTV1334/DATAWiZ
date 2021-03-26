var express = require("express");
var app = express();

app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 3000;

app.get("/", function (req, res) {
    res.render("index.ejs");
});

app.get("/veteran", function (req, res) {
    res.render("./veteran/index.ejs");
});

app.get("/veteran/analyse", function (req, res) {
    res.render("./veteran/analyseFacility.ejs");
});

app.get("/veteran/compare", function (req, res) {
    res.render("./veteran/compareFacility.ejs");
});

app.get("/veteran/outliers", function (req, res) {
    res.render("./veteran/outliers.ejs");
});

app.get("/covid", function (req, res) {
    res.render("./covid/index.ejs");
});

app.get("/covid/analyse", function (req, res) {
    res.render("./covid/analyseState.ejs");
});

app.get("/covid/compare", function (req, res) {
    res.render("./covid/compareState.ejs");
});

app.get("/covid/outliers", function (req, res) {
    res.render("./covid/outliers.ejs");
});

app.get("/about", function (req, res) {
    res.render("about.ejs");
});

app.listen(port, function () {
    console.log("server started on port 3000");
});