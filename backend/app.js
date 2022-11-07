const express = require('express');
// const cors = require('cors');

const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");

const fileUpload = require("express-fileupload");

const errorMiddleware = require('./middleware/error');

const dotenv = require('dotenv');
//yo locate garyeko .env file
dotenv.config({ path: 'backend/config/config.env' });
const api = process.env.API_URL;


//middleware

//cross origin resource sharing
// app.use(cors({
//     origin: "*",
// }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());


//Route imports
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
const order = require('./routes/orderRoute');
const payment = require('./routes/paymentRoute');

app.use(`${api}`, product);
app.use(`${api}`, user);
app.use(`${api}`, order);
app.use(`${api}`, payment);
//position matters sadly ducking top down approach
//middleware for error
app.use(errorMiddleware);

module.exports = app;
