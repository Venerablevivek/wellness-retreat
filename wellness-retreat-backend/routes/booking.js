const express = require('express');
const router = express.Router();

const {bookRetreat, getAllBookings} = require("../controller/BookingController.js");

router.post('/book-retreat', bookRetreat);
router.get('/get-all-bookings', getAllBookings);

module.exports = router;
