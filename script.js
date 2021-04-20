const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())
app.use(express.json())

app.listen(3000 || process.env.PORT);

let rooms = []
let bookings = []

//Displaying rooms and also with booking data
app.get("/listrooms", function (req, res) {
    res.json(rooms)
})

//create room with following format as example in postman
// {
//     "roomName":"max",
//     "seatsAvailable":2,
//     "amentities":["Heater","Ac","UPS"],
//     "price":2000,
//     "booked" : false
// }
app.post("/createroom", function (req, res) {
    req.body.id = rooms.length + 1;
    rooms.push(req.body);
    res.json({
        "message": "Done"
    })
})

//booking room for customers in below format
// {
//     "customer":"doo",
//     "date":"03/07/1998",
//     "starttime": "02:54am",
//     "endtime" : "12:54pm"
// }
app.post("/bookroom", function (req, res) {
    let booking = req.body;
    for (let i = 0; i < rooms.length; i++) {
        var flag = 0;
        if (!rooms[i].booked) {
            rooms[i].booked = true;
            rooms[i].customer = booking.customer;
            rooms[i].date = booking.date;
            rooms[i].starttime = booking.starttime;
            rooms[i].endtime = booking.endtime;
            booking.roomid = rooms[i].id;
            flag = 1;
            break;
        }
    }
    if (flag == 0) {
        res.json({
            message: "All Rooms are booked"
        })
    }
    bookings.push(booking)
    res.json({
        message: "Room Booked"
    })
})

//List all customers with booked data
app.get("/customers", function(req,res){
    res.json(bookings)
})