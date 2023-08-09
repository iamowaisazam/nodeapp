const express = require('express')
const app =  express.Router()


//Validations
const { 
    StoreRequest
} = require('./UserRequest')


//Controllers
const UserController = require('./UserController')

//Middlewares
const {isLoggedIn} = require('../Auth/AuthMiddleware');


//users
app.get('/users/index',[isLoggedIn,StoreRequest],UserController.index);
app.post('/users/store/',[isLoggedIn,StoreRequest],UserController.store);
app.get('/users/update/:id',[isLoggedIn,StoreRequest],UserController.update);
app.get('/users/find/:id',[isLoggedIn,StoreRequest],UserController.find);




module.exports = app