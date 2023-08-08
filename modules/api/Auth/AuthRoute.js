const express = require('express')
const app =  express.Router()


//Validations
const { 
    LoginRequest,
    RegisterRequest
} = require('./AuthRequest')


//Controllers
const AuthController = require('./AuthController')

//Middlewares
const {isLoggedIn} = require('./AuthMiddleware');


//users
app.post('/login',LoginRequest,AuthController.login);
app.post('/register',RegisterRequest,AuthController.register);
app.post('/getProfile',isLoggedIn,AuthController.getProfile);




module.exports = app