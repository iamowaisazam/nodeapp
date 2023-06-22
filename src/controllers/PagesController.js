const User = require("../models/User");


// 
// 
// 
const home = async (req,res) => {

    // return res.render("admin/home",{

    // });
    res.redirect('/admin');

}


// 
// 
// 
const about = async (req,res) => {

    return res.render("front/about",{

    });

}


// 
// 
// 
const contact = async (req,res) => {
  
    return res.render("front/contact",{
        
    });
}




module.exports = {
    home,
    about,
    contact,
}