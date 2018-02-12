var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.raw({ type: "*/*" }));
var fs = require('fs');
var passwords = {};

try {
    passwords = JSON.parse(fs.readFileSync("users.json"));
} catch (err) { console.log("No list exists"); }

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
// HAVEN'T WORKED ON THIS PART YET
app.post('/login', (req, res) => {
    var json = JSON.parse(req.body);
    var providedPassword = json.password;
    var actualPassword = passwords[json.username];
    if (providedPassword == actualPassword) {
        res.send("success");
    } else {
        res.send("failure");
    }
});
app.listen(4000);