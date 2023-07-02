const express = require('express')
const app =  express.Router()
const multer  = require('multer')

const upload = multer({
    storage:multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null,Date.now()+file.originalname)
    }
  })
  
}

);
 

//middleware..
const {isLoggedIn,isLoggedOut} = require('../middlewares/AuthencicationMiddleware')


const UserController = require('../controllers/UserController')
const RoleController = require('../controllers/RoleController')
const PermissionController = require('../controllers/PermissionController')
const ProductController = require('../controllers/ProductController')
const DashboardController = require('../controllers/DashboardController')
const AdminAuthController = require('../controllers/AdminAuthController')
const CategoryController = require('../controllers/CategoryController')



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
app.get('/profile/:id',isLoggedIn,DashboardController.profile);
app.post('/update_profile/:id',[upload.single("img"),isLoggedIn],DashboardController.update_profile);




//users
app.get('/users/index',isLoggedIn,UserController.index);
app.get('/users/create',isLoggedIn,UserController.create);
app.post('/users/store',isLoggedIn,UserController.store);
app.get('/users/edit/:id',isLoggedIn,UserController.edit);
app.post('/users/update/:id',isLoggedIn,UserController.update);
app.get('/users/delete/:id',isLoggedIn,UserController.del);

app.get('/roles/index',isLoggedIn,RoleController.index);
app.get('/roles/create',isLoggedIn,RoleController.create);
app.post('/roles/store',isLoggedIn,RoleController.store);
app.get('/roles/edit/:id',isLoggedIn,RoleController.edit);
app.post('/roles/update/:id',isLoggedIn,RoleController.update);
app.get('/roles/delete/:id',isLoggedIn,RoleController.del);

app.get('/permissions/index',isLoggedIn,PermissionController.index);
app.get('/permissions/create',isLoggedIn,PermissionController.create);
app.post('/permissions/store',isLoggedIn,PermissionController.store);
app.get('/permissions/edit/:id',isLoggedIn,PermissionController.edit);
app.post('/permissions/update/:id',isLoggedIn,PermissionController.update);
app.get('/permissions/delete/:id',isLoggedIn,PermissionController.del);

app.get('/categories/index',isLoggedIn,CategoryController.index);
app.get('/categories/create',isLoggedIn,CategoryController.create);
app.post('/categories/store',[upload.single("image"),isLoggedIn],CategoryController.store);
app.get('/categories/edit/:id',isLoggedIn,CategoryController.edit);
app.post('/categories/update/:id',[upload.single("image"),isLoggedIn],CategoryController.update);
app.get('/categories/delete/:id',isLoggedIn,CategoryController.del);

app.get('/products/index',isLoggedIn,ProductController.index);
app.get('/products/create',isLoggedIn,ProductController.create);
app.post('/products/store',[upload.single("image"),isLoggedIn],ProductController.store);
app.get('/products/edit/:id',isLoggedIn,ProductController.edit);
app.post('/products/update/:id',[upload.single("image"),isLoggedIn],ProductController.update);
app.get('/products/delete/:id',isLoggedIn,ProductController.del);






module.exports = app