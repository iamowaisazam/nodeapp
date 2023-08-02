const express = require('express')
const app =  express.Router()
const multer  = require('multer')


//Validations
const { 
    LoginRequest,
    RegisterRequest
} = require('./request/AuthRequest')


//Controllers
const AuthController = require('./controllers/AuthController')

//Middlewares
const isLoggedIn = require('./middlewares/isLoggedInMiddleware');


//users
app.post('/login',LoginRequest,AuthController.login);
app.post('/register',RegisterRequest,AuthController.register);
app.post('/getProfile',isLoggedIn,AuthController.getProfile);





module.exports = app