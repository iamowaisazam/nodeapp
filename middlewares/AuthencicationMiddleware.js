const UserModel = require("../models/User");

const isLoggedIn = async (req,res,next) => {

    try {

        if(req.cookies.token){
            
            let token = req.cookies.token;
            const User = await UserModel.findOne({_id:token});
            let globalData = {
                auth:User
            }
            req.user = globalData;
            res.locals = globalData;
            next();

        }else{
            
            console.log('token_not_found');
            res.redirect('/admin/login');
        }
     
    } catch (error) {
        res.end(error);
        
    }
}

const isLoggedOut = async (req,res,next) => {

    try {

        if(req.cookies.token){
            res.redirect('/admin/dashboard');
          
        }else{
            next();
          
        }
     
    } catch (error) {
        
    }
}


module.exports = {
    isLoggedIn,
    isLoggedOut
}