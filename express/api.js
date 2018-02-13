const alibay = require('./alibay')
const express = require('express')
const app = express()

app.get('/itemBought', (req, res) => {
    var userID = req.query.userID;
    res.send(JSON.stringify(alibay.getItemsBought(userID)));
});

app.listen(4000);