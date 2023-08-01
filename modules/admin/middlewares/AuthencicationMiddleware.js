const UserModel = require("../models/User");
const { getAuthDetail } = require("../utils/Auth");

const isLoggedIn = async (req,res,next) => {

    // console.log(req.file);

    // try {

        if(req.cookies.token){

            let token = req.cookies.token;
            let user = await getAuthDetail(token);

            req.auth = user;
            res.locals ={
                auth:user
            };
            next();

        }else{
            
            console.log('token_not_found');
            res.redirect('/admin/login');
        }
    
        
    // } catch (error) {
    //     res.end(error);       
    // }

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