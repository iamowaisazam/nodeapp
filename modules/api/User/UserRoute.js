const express = require('express')
const app =  express.Router()


//Validations
// const { 
//     LoginRequest,
//     RegisterRequest
// } = require('./AuthRequest')


//Controllers
const UserController = require('./UserController')

//Middlewares
const {isLoggedIn} = require('../Auth/AuthMiddleware');


//users
app.get('/users/index',isLoggedIn,UserController.index);
app.get('/users/view/:id',isLoggedIn,UserController.view);




module.exports = app