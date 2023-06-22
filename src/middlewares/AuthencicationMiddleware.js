const isLoggedIn = async (req,res,next) => {

    try {

        if(req.session.user_id){

            next();
        }else{
            res.redirect('/admin/login');
        }
     
    } catch (error) {
        
    }
}

const isLoggedOut = async (req,res,next) => {

    try {

        if(req.session.user_id){
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