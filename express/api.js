const alibay = require("./alibay");
const fs = require("fs");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.raw({ type: "*/*" }));
var passwords = {};
var userIDs = {};
var userListing = {};
var globalListings = {};
try {
  passwords = JSON.parse(fs.readFileSync("passwords.json"));
} catch (err) {
  console.log("No password list exist");
}
try {
  userIDs = JSON.parse(fs.readFileSync("userIDs.json"));
} catch (err) {
  console.log("No user list exist");
}
try {
  userListing = JSON.parse(fs.readFileSync("userListing.json"));
} catch (err) {
  console.log("No user listings list exist");
}
try {
  itemsSold = JSON.parse(fs.readFileSync("itemsSold.json"));
} catch (err) {
  console.log("no items sold exist");
}
try {
  itemsBought = JSON.parse(fs.readFileSync("itemsBought.json"));
} catch (err) {
  console.log("no items bought exist");
}
app.post("/signup", (req, res) => {
  console.log("signup");
  let json = JSON.parse(req.body);
  if (json.username === "") return res.send("Please enter a username");
  else if (json.password === "") return res.send("Please enter a password");
  else if (json.passwordConfirm === "")
    return res.send("Please confirm password");
  else if (passwords[json.username]) {
    return res.send("Username has already been taken");
  } else if (json.password !== json.passwordConfirm) {
    return res.send("Confirmation password does not match password");
  } else {
    userIDs[json.username] = alibay.genUserID();
    passwords[json.username] = json.password;
    fs.writeFileSync("passwords.json", JSON.stringify(passwords));
    fs.writeFileSync("userIDs.json", JSON.stringify(userIDs));
    res.send("Signup successful");
  }
});
app.post("/login", (req, res) => {
  console.log("login");
  let json = JSON.parse(req.body);
  if (json.username === "") return res.send("Please enter your username");
  else if (json.password === "") return res.send("Please enter your password");
  else if (!passwords[json.username]) {
    return res.send("An account with this username does not exist");
  } else if (passwords[json.username] !== json.password) {
    return res.send("Incorrect password");
  } else if (passwords[json.username] === json.password) {
    res.send("Log in successful");
  }
});
app.post("/newListing", (req, res) => {
  console.log("new listing");
  let json = JSON.parse(req.body);
  let userID = userIDs[json.username];
  userListing = alibay.createListing(
    userID,
    json.username,
    json.itemname,
    json.price,
    json.description
  );
  alibay.saveListings();
  res.send(alibay.getListing(userListing));
});
app.get("/globalListings", (req, res) => {
  console.log("global listing");
  let globalListings = alibay.allListings();
  res.send(alibay.mapIDToListing(globalListings));
});
app.get("/sortByPrice", (req, res) => {
  console.log("sort by price");
  let listingsByPrice = alibay.sortByPrice();
  res.send(listingsByPrice);
});
app.post("/search", (req, res) => {
  console.log("search");
  searchArray = [];
  let json = JSON.parse(req.body);
  let safeSearch = json.searchTerm.toLowerCase();
  let searchResults1 = alibay.searchForListings(safeSearch, "description");
  searchResults1.map(item => searchArray.push(item));
  let searchResults2 = alibay.searchForListings(safeSearch, "itemName");
  searchResults2.map(item => searchArray.push(item));
  let searchResults3 = alibay.searchForListings(safeSearch, "price");
  searchResults3.map(item => searchArray.push(item));
  res.send(searchArray);
});
app.post("/buy", (req, res) => {
  console.log("buy");
  let json = JSON.parse(req.body);
  let sellerID = userIDs[json.sellerName];
  let buyerID = userIDs[json.buyerName];
  let listingID = json.listingID;
  let buyItem = alibay.buy(buyerID, sellerID, listingID);
  alibay.saveSold();
  alibay.saveBought();
  res.send("purchase successful");
});
app.post("/userListings", (req, res) => {
  console.log("user listings");
  let json = JSON.parse(req.body);
  let userID = userIDs[json.username];
  console.log("json ",json);
  console.log("userID ", userID);
  let userListings = alibay.userListings(userID);
  res.send(alibay.mapIDToListing(userListings));
});
app.post("/userBought", (req, res) => {
  console.log("user bought");
  let json = JSON.parse(req.body);
  let userID = userIDs[json.username];
  let userBoughtListings = alibay.allItemsBought(userID);
  //let jsonResponse = JSON.stringify(userSoldListings);
  res.send(alibay.mapIDToListing(userBoughtListings));
});
app.post("/userSold", (req, res) => {
  console.log("user sold");
  let json = JSON.parse(req.body);
  let userID = userIDs[json.username];
  let userSoldListings = alibay.allItemsSold(userID);
  //let jsonResponse = JSON.stringify(userSoldListings);
  res.send(alibay.mapIDToListing(userSoldListings));
});
app.listen(4000);
