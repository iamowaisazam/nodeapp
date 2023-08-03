const express = require('express');
const session = require('express-session')
const flash = require('express-flash')
const cookieParser = require("cookie-parser");
const path = require("path");
const dotenv = require("dotenv").config();
const sequelize = require('./config/mysql');






//  ______________________________________DB
// const User = require('./models/User');
// const Role = require('./models/Role');
// const Permission = require('./models/Permission').sync({alter:true});
// const UserRole = require('./models/UserRole');
// const RolePermission = require('./models/RolePermission');

(async () => {

   // await sequelize.sync({alter:true}).then(() => {

      // Role.create({
      //    name:"Admin",
      //    description:".."
      // });

      // Role.create({
      //    name:"Customer",
      //    description:".."
      // });
      
   // });

 })();
//  ______________________________________DB





//Initialization..

// console.log(path.join(__dirname, "modules","admin","views"));

const app = express()


//URL Encoding SET
app.use('/static',express.static(path.join(__dirname, "./public")));

// set the view engine to ejs
app.set("views", path.join(__dirname,"modules","admin","views"));
app.set('view engine', 'ejs');


app.use(session({
   secret:"test",
   cookie:{maxAge:60000},
   resave:false,
   saveUninitialized:false,
}));

app.use(flash());
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));




app.locals.settings = {
   site_name:"Admin Panel",

};




//Router Service Providers
app.use('/admin',require("./modules/admin/route"));
app.use('/api/v1',require("./modules/api/route"));


//Server Start
app.listen(3000,() => {

   console.log("serving http://localhost:3000/");
})