const express = require('express');
const bodyParser = require('body-parser');
const retreatRoutes = require('./routes/retreatsRoute.js');
const bookingRoutes = require('./routes/booking.js');
const Pool = require("./config/database.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: true,
        credentials: true,
    })
)

app.use('/api/v1/retreats', retreatRoutes);
app.use('/api/v1/book', bookingRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  Pool.connect()
    .then(() => {
        console.log('PostgreSQL database connected successfully');
    })
    .catch(err => {
        console.error('Error connecting to PostgreSQL database:', err.stack);
        process.exit(1);
    });
});
