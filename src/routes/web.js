const express = require('express')
const app =  express.Router()

//middleware..
const {isLoggedIn,isLoggedOut} = require('../middlewares/AuthencicationMiddleware')


const UserController = require('../controllers/UserController')
const ProductController = require('../controllers/ProductController')
const DashboardController = require('../controllers/DashboardController')
const AdminAuthController = require('../controllers/AdminAuthController')



//Dashboard
app.get('/',isLoggedIn,DashboardController.dashboard);
app.get('/dashboard',isLoggedIn,DashboardController.dashboard);

//Authentication and Registeration
app.get('/logout',isLoggedIn,AdminAuthController.logout);
app.get('/login',isLoggedOut,AdminAuthController.login);
app.post('/login/submit',isLoggedOut,AdminAuthController.login_submit);
app.get('/register',isLoggedOut,AdminAuthController.register);
app.post('/register/submit',isLoggedOut,AdminAuthController.register_submit);
app.get('/forget-password',isLoggedOut,AdminAuthController.forgetPassword);
app.post('/forget-password/submit',isLoggedOut,AdminAuthController.forgetPasswordSubmit);
app.get('/new-password/:token',isLoggedOut,AdminAuthController.newPassword);
app.post('/new-password/submit/:token',isLoggedOut,AdminAuthController.newPasswordSubmit);




//users
app.get('/users/index',isLoggedIn,UserController.index);
app.get('/users/create',isLoggedIn,UserController.create);
app.post('/users/store',isLoggedIn,UserController.store);
app.get('/users/edit/:id',isLoggedIn,UserController.edit);
app.post('/users/update/:id',isLoggedIn,UserController.update);
app.get('/users/delete/:id',isLoggedIn,UserController.del);






module.exports = app