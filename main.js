const express = require('express');
const session = require('express-session')
const flash = require('express-flash')
const cookieParser = require("cookie-parser");
const path = require("path");
const dotenv = require("dotenv").config();
const sequelize = require('./config/mysql');


//Initialization..
const app = express();


//URL Encoding SET
app.use('/static',express.static(path.join(__dirname, "./public")));

//Session Define
app.use(session({
   secret:"test",
   cookie:{maxAge:60000},
   resave:false,
   saveUninitialized:false,
}));

app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));



//Auth Modules
app.use('/api/v1',require("./modules/api/Auth/AuthRoute"));
app.use('/api/v1',require("./modules/api/User/UserRoute"));






//Server Start
app.listen(3000,() => {
   console.log("serving http://localhost:3000/");
});