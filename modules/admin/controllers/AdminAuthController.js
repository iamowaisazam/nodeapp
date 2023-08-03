const User = require("../../../models/User");
const bcrypt = require("bcrypt");
const { sentVerification,sentForgetPasswordEmail } = require("../../../utils/email");


// 
// 
// 
const login = async (req,res) => {
    
 
//    console.log(req.cookies.token);
    return res.render("login");
}


// 
// 
// 
const login_submit = async (req,res) => {


      let email = req.body.email;
      let password = req.body.password;

      const response = await User.findOne({email:email});
      if(response == null){
          req.flash('error','Incorect Email Or Password');
          return res.render("login",{
            old:req.body,
          });
      }

      let dbpass = response.password;
      let compare = await bcrypt.compare(password,dbpass);
      if(compare == false){
        req.flash('error','Incorect Email Or Password');
        return res.render("login",{
            old:req.body,
          });
      }

     await res.cookie("token",response._id);
      req.flash('success','Login Success');
      res.redirect('/admin/dashboard');
}

// 
// 
// 
const register = async (req,res) => {

    return res.render("register",{

    });

}


// 
// 
// 
const register_submit = async (req,res) => {


    try {
        let pp = await bcrypt.hash(req.body.password,10);
        const u = User.create({
            name:req.body.name,
            email:req.body.email,
            password:pp,
            image:null,
            role_id:1,
        });
        req.flash('success','Register Success Please Login');
        res.redirect('login');
        
    } catch (error) {
        res.end(error);
    }   
}



// 
// 
// 
const forgetPassword = async (req,res) => {

   
    return res.render("forgetPassword");
}


// 
// 
// 
const forgetPasswordSubmit = async (req,res) => {

    let email = req.body.email;
    const response = await User.findOne({email:email});
    if(response == null){

        req.flash('error','Email Not Found');
        return res.render("forgetPassword",{
          old:req.body,
        });

    }

    let token = (Math.random() + 1).toString(36).substring(7);
    console.log(response);
    const cc = await User.findOneAndUpdate({_id:response._id},{forget_password_token:token});  
    sentForgetPasswordEmail(email,token);
    
    req.flash('error','Email Sent Please Check');
    return  res.redirect('forget-password');
   
}


// 
// 
// 
const newPassword = async (req,res) => {

    let token = req.params.token;
    const response = await User.findOne({forget_password_token:token});
    if(response == null){
        req.flash('error','Password Reset Link Expired');
        return  res.redirect('/admin/forget-password');
    }

    res.render('newPassword',{data:response});  
}


// 
// 
// 
const newPasswordSubmit = async (req,res) => {


    let token = req.params.token;
    const response = await User.findOne({forget_password_token:token});
    if(response == null){
        req.flash('error','Password Reset Link Expired');
        return  res.redirect('forget-password');
    }

    let password1 = req.body.password1;
    let password2 = req.body.password2;

    if(password1 != password2){
        req.flash('error','Password Must Be Same');
        return res.render("newPassword",{
            old:req.body,
            data:response,
        });
    }


    let data = {};
    data.password = await bcrypt.hash(req.body.password1,10);
    data.forget_password_token = null;
    const cc = await User.findOneAndUpdate({_id:response._id},data);   
    req.flash('success','Password Changed');
    return  res.redirect('login');

}




// 
// 
// 
const logout = async (req,res) => {
  
    res.clearCookie("token");
    req.flash('success','User Logout Success');
    res.redirect('login');

}


module.exports = {
    login,
    login_submit,
    register,
    register_submit,
    logout,
    forgetPassword,
    forgetPasswordSubmit,
    newPassword,
    newPasswordSubmit
  
}