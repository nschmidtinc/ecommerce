const alibay = require('./alibay');

function test() {
    var sellerID = alibay.genUserID();
    var buyerID = alibay.genUserID();

    alibay.initializeUserIfNeeded(sellerID)
    alibay.initializeUserIfNeeded(buyerID)

    var listing1ID = alibay.createListing(sellerID, 500000, "A very nice boat")
    var listing2ID = alibay.createListing(sellerID, 1000, "Faux fur gloves")
    var listing3ID = alibay.createListing(sellerID, 100, "Running shoes")
    var product2Description = alibay.getItemDescription(listing2ID)

    buy(buyerID, sellerID, listing2ID)
    buy(buyerID, sellerID, listing3ID)

    var allSold = alibay.allItemsSold(sellerID)
    var soldDescriptions = allSold.map(alibay.getItemDescription)
    var allBought = alibay.allItemsBought(buyerID)
    var allBoughtDescriptions = allBought.map(getItemDescription)
    var listings = allListings()
    var boatListings = searchForListings("boat")
    var shoeListings = searchForListings("shoes")
    var boatDescription = getItemDescription(listings[0])
    var boatItemDescription = boatDescription.itemDescription;
    var boatPrice = boatDescription.price;
    assert(allSold.length == 2); // The seller has sold 2 items
    assert(allBought.length == 2); // The buyer has bought 2 items
    assert(listings.length == 1); // Only the boat is still on sale
    assert(boatListings.length == 1); // The boat hasn't been sold yet
    assert(shoeListings.length == 0); // The shoes have been sold
    assert(boatItemDescription == "A very nice boat");
    assert(boatPrice == 500000);
}
test();