const alibay = require('./alibay');
const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.raw({ type: "*/*" }));
var passwords = {};
var userIDs = {};
var userListing = {};
var globalListings = {};
try {
    passwords = JSON.parse(fs.readFileSync("passwords.json"));
} catch (err) { console.log("No password list exist"); }
try {
    userIDs = JSON.parse(fs.readFileSync("userIDs.json"));
} catch (err) { console.log("No user list exist"); }
try {
    userListing = JSON.parse(fs.readFileSync("userListing.json"));
} catch (err) { console.log("No user listings list exist"); }
try {
    globalListing = JSON.parse(fs.readFileSync("globalListing.json"));
} catch (err) { console.log("No user listings list exist"); }
app.post('/signup', (req, res) => {
    console.log("signup");
    let json = JSON.parse(req.body);
    if (json.username === "") return res.send("Please enter a username");
    else if (json.password === "") return res.send("Please enter a password");
    else if (json.passwordConfirm === "") return res.send("Please confirm password");
    else if (passwords[json.username]) { return res.send("Username has already been taken"); }
    else if (json.password !== json.passwordConfirm) { return res.send("Confirmation password does not match password"); }
    else {
        userIDs[json.username] = alibay.genUserID();
        passwords[json.username] = json.password;
        fs.writeFileSync("passwords.json", JSON.stringify(passwords));
        fs.writeFileSync("userIDs.json", JSON.stringify(userIDs));
        res.send("Signup successful");
    }
});
app.post('/login', (req, res) => {
    console.log("login");
    let json = JSON.parse(req.body);
    if (json.username === "") return res.send("Please enter your username");
    else if (json.password === "") return res.send("Please enter your password");
    else if (!passwords[json.username]) { return res.send("An account with this username does not exist"); }
    else if (passwords[json.username] !== json.password) { return res.send("Incorrect password"); }
    else if (passwords[json.username] === json.password) { res.send("Log in successful"); }
});
app.post('/newListing', (req, res) => {
    console.log("new listing");
    let json = JSON.parse(req.body);
    let userID = userIDs[json.username];
    userListing = alibay.createListing(userID, json.username, json.itemname, json.price, json.description);
    console.log(userListing);
    alibay.saveListings();
    res.send(alibay.getListing(userListing));
});
app.post('/search', (req, res) => {
    let json = JSON.parse(req.body);
    let searchResults = alibay.searchForListings(json.searchTerm);
    //let jsonResponse = JSON.stringify(searchQuery);
    res.send(alibay.mapIDToListing(searchResults));
});
app.get('/globalListings', (req, res) => {
    let globalListings = alibay.allListings();
    // let jsonResponse = JSON.stringify(globalListings)
    // console.log(allListings())
    //fs.writeFileSync("globalListing.json", JSON.stringify(alibay.globalListings(globalListings)));
    res.send(alibay.mapIDToListing(globalListings));
});
app.post('/userListings', (req, res) => {
    let json = JSON.parse(req.body);
    let userID = userIDs[json.username];
    console.log("users items for sale");
    let userListings = alibay.userListings(userID);
    //let jsonResponse = JSON.stringify(userListings);
    res.send(alibay.mapIDToListing(userListings));
});
app.post('/userSold', (req, res) => {
    let json = JSON.parse(req.body);
    let userID = userIDs[json.username];
    let userSoldListings = alibay.allItemsSold(userID);
    //let jsonResponse = JSON.stringify(userSoldListings);
    res.send(alibay.mapIDToListing(userSoldListings));
});
app.post('/userBought', (req, res) => {
    let json = JSON.parse(req.body);
    let userID = userIDs[json.username];
    let userBoughtListings = alibay.allItemsBought(userID);
    //let jsonResponse = JSON.stringify(userSoldListings);
    res.send(alibay.mapIDToListing(userBoughtListings));
});
app.post('/buy', (req, res) => {
    let json = JSON.parse(req.body);
    let sellerID = userIDs[json.sellerName];
    let buyerID = userIDs[json.buyerName];
    let listingID = json.listingID;
    let buyItem = alibay.buy(buyerID, sellerID, listingID);
    res.send("purchase successful");
});
app.listen(4000);