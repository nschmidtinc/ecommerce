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
} catch (err) { console.log("No list exists"); }

app.get('/listAllItems', (req, res) => {
    res.send(JSON.stringify(items));
});

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
app.listen(4000);

// {
//     "User 1": {
//         "Item 1 ID": {
//             "Item Properties": {
//                 "Price": "10",
//                 "Description": "User 1, Item 1"
//             }
//         },
//         "Item 2 ID": {
//             "Item Properties": {
//                 "Price": "20",
//                 "Description": "User 1, Item 2"
//             }
//         },
//         "Item 3 ID": {
//             "Item Properties": {
//                 "Price": "30",
//                 "Description": "User 1, Item 3"
//             }
//         }
//     },
//     "User 2": {
//         "Item 1 ID": {
//             "Item Properties": {
//                 "Price": "40",
//                 "Description": "User 2, Item 1"
//             }
//         },
//         "Item 2 ID": {
//             "Item Properties": {
//                 "Price": "50",
//                 "Description": "User 2, Item 2"
//             }
//         },
//         "Item 3 ID": {
//             "Item Properties": {
//                 "Price": "60",
//                 "Description": "User 2, Item 3"
//             }
//         },
//         "Item 4 ID": {
//             "Item Properties": {
//                 "Price": "70",
//                 "Description": "User 2, Item 4"
//             }
//         },
//         "Item 5 ID": {
//             "Item Properties": {
//                 "Price": "80",
//                 "Description": "User 2, Item 5"
//             }
//         }
//     }
// }