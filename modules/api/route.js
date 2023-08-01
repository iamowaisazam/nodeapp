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



//users
app.post('/login',LoginRequest,AuthController.login);
app.post('/register',RegisterRequest,AuthController.register);




module.exports = app