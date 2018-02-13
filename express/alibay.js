const assert = require("assert");
let itemsBought = {}; // map that keeps track of all the items a user has bought
let itemsSold = {};
let globalInventory = {};
function loadListings() {
    try {
        let contents = fs.readFileSync("marketplace.json");
        globalInventory = JSON.parse(contents);
    } catch (err) { }
}
function saveListings() {
    return fs.writeFileSync("marketplace.json", JSON.stringify(globalInventory));
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
allItemsBought returns the IDs of all the items bought by a buyer
    parameter: [buyerID] The ID of the buyer
    returns: an array of listing IDs
*/
function allItemsBought(buyerID) {
    console.log("here I am", buyerID);
    return itemsBought[buyerID];
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
function createListing(sellerID, price, description) {
    let listingID = genUserID();
    let listingObj = {};
    listingObj.didSell = false;
    listingObj.forSale = true;
    listingObj.price = price;
    listingObj.description = description;
    globalInventory[listingID] = listingObj;
    sellerSold = itemsSold[sellerID];
    if (!sellerSold) {
        sellerSold = [];
    }
    sellerSold.push(listingObj);
    itemsSold[sellerID] = sellerSold;
    listingID = globalInventory[listingID];
    console.log("yooohooo", listingID);
    return listingID;
}
/* 
getItemDescription returns the itemDescription of a listing
    parameter: [listin6ID] The ID of the listing
    returns: An object containing the price and description properties.
*/
function getItemDescription(listingID) {
    if (listingID === undefined) {
        let listingID = {};
        listingID["price"] = 27;
        console.log("this is the sold array", sellerSold);
        return listingID.price;
    }
    console.log("whats wrong", listingID.price);
    let itemDescription = {
        price: listingID.price,
        description: listingID.description
    };
    console.log("booboo", itemDescription);
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
    listingID.forSale = false;
    listingID.didSell = true;
    buyerBought = itemsBought[buyerID];
    if (!buyerBought) {
        buyerBought = [];
    }
    buyerBought.push(listingID);
    buyerBought = itemsBought[buyerID];
    return buyerBought;
}
console.log("!!!!!!!!!!!!!!!!!!!!!!", globalInventory, itemsSold)
/* 
allItemsSold returns the IDs of all the items sold by a seller
    parameter: [sellerID] The ID of the seller
    returns: an array of listing IDs
*/
function allItemsSold(sellerID) {
    let filtered = itemsSold[sellerID].filter(item => item.didSell);
    return filtered;
}
/*
allListings returns the IDs of all the listings currently on the market
Once an item is sold, it will not be returned by allListings
    returns: an array of listing IDs
*/
allListings = () => {
    ally = globalInventory;
    return ally;
};
/*
searchForListings returns the IDs of all the listings currently on the market
Once an item is sold, it will not be returned by searchForListings
    parameter: [searchTerm] The search string matching listing itemDescriptions
    returns: an array of listing IDs
*/
function searchForListings(searchTerm) {
    return item;
}
module.exports = {
    genUserID, // This is just a shorthand. It's the same as genUserID: genUserID.
    initializeUserIfNeeded,
    putItemsBought,
    getItemsBought,
    createListing,
    getItemDescription,
    buy,
    allItemsSold,
    allItemsBought,
    allListings
    // Add all the other functions that need to be exported
};