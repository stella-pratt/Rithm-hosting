// node js/seats_info
var express = require("express");

var app = express();
var fs = require('fs');

/* Loads in index.html */
app.use('/', express.static('.'));

// if some one requests from /bookings
app.get("/bookings", function (req, res) {
    // read the file and send or log error
    fs.readFile('./js/seats.json', 'utf8', (error, data) => {
        if (error) {
            console.log(error);
            return;
        }
        res.send(JSON.parse(data));
    })
});


// recieve the data from the form
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post("/submit_booking", function (req, res) {
    // format the recieved info
    let email = req.body.email;
    let booked_seats = req.body.seats.split(",");

    // open the file to combine with new
    fs.readFile("./js/seats.json", 'utf8', (error, data) => {
        // check for any errors
        if (error) {
            console.log(error)
            return
        }
        const updated_seats = JSON.parse(data)
        // output the parsed data
        updated_seats[email] = booked_seats;
        // write the data back to file
        fs.writeFileSync("./js/seats.json", JSON.stringify(updated_seats));
    });
    // send user back to homepage
    res.send("orderconfirmed");
});

// run the site
app.listen(port, host);
