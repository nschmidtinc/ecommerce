var alibay = require('./alibay');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.raw({ type: "*/*" }));
var fs = require('fs');

var passwords = {};
var items = {};

try {
    passwords = JSON.parse(fs.readFileSync("users.json"));
    items = JSON.parse(fs.readFileSync("test.json"));
} catch (err) { console.log("No list exist"); }

app.post('/signup', (req, res) => {
    console.log("in the server");
    var json = JSON.parse(req.body);

    if (json.username === "") return res.send("Please enter a username");
    else if (json.password === "") return res.send("Please enter a password");
    else if (json.passwordConfirm === "") return res.send("Please confirm password");
    else if (passwords[json.username]) { return res.send("Username has already been taken"); }
    else if (json.password !== json.passwordConfirm) { return res.send("Confirmation password does not match password"); }
    else {
        passwords[json.username] = json.password;
        fs.writeFileSync("users.json", JSON.stringify(passwords));
        res.send("Signup successful");
    }
});
app.post('/login', (req, res) => {
    var json = JSON.parse(req.body);

    if (json.username === "") return res.send("Please enter your username");
    else if (json.password === "") return res.send("Please enter your password");
    else if (!passwords[json.username]) { return res.send("An account with this username does not exist"); }
    else if (passwords[json.username] !== json.password) { return res.send("Incorrect password"); }
    else if (passwords[json.username] === json.password) { res.send("Log in successful"); }
});

app.get('/itemBought', (req, res) => {
    var userID = req.query.userID;
    res.send(JSON.stringify(alibay.getItemsBought(userID)));
});

app.get('/listAllItems', (req, res) => {
    res.send(JSON.stringify(items));
});
app.post('/newListing', (req, res) => {
    let payload = JSON.parse(req.body.toString());
    let sellerID = payload.userID;
    let price = payload.price;
    let description = payload.description;
    createListing(sellerID, price, description);
});
app.listen(4000);

app.get('/itemBought', (req, res) => {
    var userID = req.query.userID;
    res.send(JSON.stringify(alibay.getItemsBought(userID)));
});

app.get('/listAllItems', (req, res) => {
    res.send(JSON.stringify(items));
});
app.post('/newListing', (req, res) => {
    let payload = JSON.parse(req.body.toString());
    let sellerID = payload.userID;
    let price = payload.price;
    let description = payload.description;
    createListing(sellerID, price, description);
});
app.listen(4000);
