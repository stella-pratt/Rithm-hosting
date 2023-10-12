var host = "127.0.0.1";
var port = 1338;
var express = require("express");

var app = express();

/* Loads in index.html */
app.use('/', express.static('.'));

/* Load JSON, build html for seating, send it back to page */
app.get("/bookings", function (req, res) {
    const fs = require('fs');

    fs.readFile('./js/seats.json', 'utf8', (error, data) => {
        if (error) {
            console.log(error);
            return;
        }
        res.send(JSON.parse(data));
    })
});
// node js/seats_info

/* On receiving the post data from the form, check it and save it to JSON */
app.post("/submit-booking", function (req, res) {
    res.send("Well done")
});

/* Run the site */
app.listen(port, host);