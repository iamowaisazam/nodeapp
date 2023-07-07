const express = require('express');
const session = require('express-session')
const flash = require('express-flash')
const cookieParser = require("cookie-parser");
const path = require("path");
const dotenv = require("dotenv").config();
const connectDB = require("./config/database");



//Initialization..
// connectDB();

const app = express()


//URL Encoding SET
app.use('/static',express.static(path.join(__dirname, "./public")));

// set the view engine to ejs
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');




app.use(session({
   secret:"test",
   cookie:{maxAge:60000},
   resave:false,
   saveUninitialized:false,
}))
app.use(flash());
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));




app.locals.settings = {
   site_name:"Admin Panel",

};




//Router Service Providers
app.use('/',require("./routes/web"));
app.use('/admin',require("./routes/admin"));
app.use('/api/v1',require("./routes/api"));


//Server Start
app.listen(3000,() => {

   console.log("serving http://localhost:3000/");
})