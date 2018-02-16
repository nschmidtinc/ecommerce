const assert = require("assert");
const fs = require("fs");
let itemsBought = {}; // map that keeps track of all the items a user has bought
let itemsForSale = {};
let itemsSold = {};
let globalInventory = {};
try {
  let contents = fs.readFileSync("globalInventory.json");
  globalInventory = JSON.parse(contents);
} catch (err) { console.log("hi rodger"); }
function saveListings() {
  return fs.writeFileSync(
    "globalInventory.json",
    JSON.stringify(globalInventory)
  );
}
function saveSold() {
  return fs.writeFileSync("itemsSold.json", JSON.stringify(itemsSold));
}
function saveBought() {
  return fs.writeFileSync("itemsBought.json", JSON.stringify(itemsBought));
}
/*
Before implementing the login functionality, use this function to generate a new UserID every time.
*/
function genUserID() {
  return Math.floor(Math.random() * 100000000);
}
function putItemsBought(userID, value) {
  itemsBought[userID] = value;
}
function getItemsBought(userID) {
  var ret = itemsBought[userID];
  if (ret == undefined) {
    return null;
  }
  return ret;
}
/*
initializeUserIfNeeded adds the UserID to our database unless it's already there
parameter: [userID] the UserID of the user.
returns: A promise
*/
function initializeUserIfNeeded(userID) {
  var items = getItemsBought[userID];
  if (items == undefined) {
    return putItemsBought(userID, []);
  }
}

/* 
createListing adds a new listing to our global state.
This function is incomplete. You need to complete it.
    parameters: 
      [sellerID] The ID of the seller
      [price] The price of the item
      [description] A description describing the item
    returns: A promise containing the ID of the new listing
*/
function createListing(sellerID, sellerName, itemName, price, description) {
  let listingID = genUserID();
  let listingObj = {
    listingID: listingID,
    sellerID,
    sellerName,
    itemName,
    price,
    description,
    didSell: false,
    isDeleted: false
  };
  globalInventory[listingID] = listingObj;
  if (!itemsForSale[sellerID]) itemsForSale[sellerID] = [];
  itemsForSale[sellerID].push(listingID);
  return listingID;
}
/* 
getItemDescription returns the itemDescription of a listing
    parameter: [listin6ID] The ID of the listing
    returns: An object containing the price and description properties.
*/
function getItemDescription(listingID) {
  let itemDescription = {
    price: globalInventory[listingID].price,
    description: globalInventory[listingID].description
  };
  return itemDescription;
}
/* 
buy changes the global state.
Another buyer will not be able to purchase that listing
The listing will no longer appear in search results
The buyer will see the listing in his history of purchases
The seller will see the listing in his history of items sold
    parameters: 
     [buyerID] The ID of buyer
     [sellerID] The ID of seller
     [listingID] The ID of listing
    returns: A promise indicating that the action was done
*/
function buy(buyerID, sellerID, listingID) {
  var listing = globalInventory[listingID];
  listing.forSale = false;
  listing.didSell = true;
  buyerBought = itemsBought[buyerID];
  if (!buyerBought) {
    buyerBought = [];
  }
  sellerSold = itemsSold[sellerID];
  if (!sellerSold) {
    sellerSold = [];
  }
  sellerSold.push(listing);
  itemsSold[sellerID] = sellerSold;
  buyerBought.push(listing);
  itemsBought[buyerID] = buyerBought;
  return buyerBought;
}
/* 
allItemsSold returns the IDs of all the items sold by a seller
    parameter: [sellerID] The ID of the seller
    returns: an array of listing IDs
*/
function sortByPrice() {
  let sortGlobalByPrice = [];
  let searchableByPrice = Object.keys(globalInventory).filter(
    item => globalInventory[item].didSell === false
  );
  let searchIt = searchableByPrice
    .map(item1 => globalInventory[item1].price)
    .sort(function (a, b) {
      return a - b;
      let sortIt = searchIt.map(item => {
        if (globalInventory[item1].price === item) {
          searchIt.push(sortGlobalByPrice[item1]);
        }
      });
      return sortByGlobalPrice;
    });
}
function userListings(userID) {
  return Object.keys(globalInventory).filter(item => globalInventory[item].sellerID === userID && globalInventory[item].didSell === false && globalInventory[item].isDeleted === false);
}
function getListing(listingID) {
  return globalInventory[listingID];
}
function mapIDToListing(arrayofListings) {
  return arrayofListings.map(listingID => globalInventory[listingID]);
}
function allItemsSold(sellerID) {
  if (!itemsSold[sellerID]) return [];
  return itemsSold[sellerID].map(element => element.listingID);
}
/*
allItemsBought returns the IDs of all the items bought by a buyer
    parameter: [buyerID] The ID of the buyer
    returns: an array of listing IDs
*/
function allItemsBought(buyerID) {
  if (!itemsBought[buyerID]) return [];
  return itemsBought[buyerID].map(element => element.listingID);
}
/*
allListings returns the IDs of all the listings currently on the market
Once an item is sold, it will not be returned by allListings
    returns: an array of listing IDs
*/
allListings = () => {
  return Object.keys(globalInventory).filter(item => globalInventory[item].didSell === false && globalInventory[item].isDeleted === false);
};
function deleteListing(listingID) {
  globalInventory[listingID].isDeleted = true;
}
/*
searchForListings returns the IDs of all the listings currently on the market
Once an item is sold, it will not be returned by searchForListings
    parameter: [searchTerm] The search string matching listing itemDescriptions
    returns: an array of listing IDs
*/
function searchForListings(searchTerm) {
  let searchArray = [];
  let elementCount = -1;
  let searchable = Object.keys(globalInventory).filter(item => globalInventory[item].didSell === false && globalInventory[item].isDeleted === false);
  searchable.map(item => {
    if (globalInventory[item]["description"].toLowerCase().indexOf(searchTerm) !== -1) {
      searchArray.push(globalInventory[item]);
    }
    else if (globalInventory[item]["itemName"].toLowerCase().indexOf(searchTerm) !== -1) {
      searchArray.push(globalInventory[item]);
    }
    else if (globalInventory[item]["price"].toLowerCase().indexOf(searchTerm) !== -1) {
      searchArray.push(globalInventory[item]);
    }
  });
  return searchArray;
}
module.exports = {
  genUserID, // This is just a shorthand. It's the same as genUserID: genUserID.
  saveListings,
  initializeUserIfNeeded,
  putItemsBought,
  getItemsBought,
  createListing,
  getItemDescription,
  buy,
  searchForListings,
  allItemsSold,
  allItemsBought,
  allListings,
  userListings,
  getListing,
  sortByPrice,
  mapIDToListing,
  deleteListing
  // Add all the other functions that need to be exported
};