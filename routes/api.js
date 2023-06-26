const express = require('express')
const app =  express.Router()
const multer  = require('multer')



const UserController = require('../api/UserController')

//users
app.get('/users',UserController.users);
app.post('/login',UserController.login);
app.post('/register',UserController.register);


module.exports = app