const express = require('express')
const app =  express.Router()
const multer  = require('multer')



const UserController = require('../api/UserController')
const ProductController = require('../api/ProductController')

//users
app.get('/users',UserController.users);
app.post('/login',UserController.login);
app.post('/register',UserController.register);
app.get('/products',ProductController.all_products);
app.get('/categories',ProductController.all_categories);


module.exports = app