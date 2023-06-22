const express = require('express');
const session = require('express-session')
const flash = require('express-flash')

const path = require("path");
const ErrorHandler = require('./middlewares/ErrorHandler');
const dotenv = require("dotenv").config();
const connectDB = require("../src/config/database");


// connectDB();
const app = express()
app.use(session({
   secret:"test",
   cookie:{maxAge:60000},
   resave:false,
   saveUninitialized:false,
}))
app.use(flash());




//URL Encoding SET
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/static',express.static(path.join(__dirname, "../public")));


// set the view engine to ejs
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');


//Router Service Providers
app.use('/',require("./routes/web"));
app.use('/admin',require("./routes/admin"));


//Server Start
app.listen(3000,() => {

   console.log("serving http://localhost:3000/");
})