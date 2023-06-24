const UserModel = require("../models/User");



// 
// 
// 
const dashboard = async (req,res) => {

    // console.log(req.user);

    return res.render("admin/dashboard");

}

const profile = async (req,res) => {

    try {

        let user = await UserModel.findOne({_id:req.params.id});
        return res.render("admin/profile",{user:user});
        
    } catch (error) {
        res.end(error);
    }
    
    
}

const update_profile = async (req,res) => {
    
    try {

        
       let user = await UserModel.findOneAndUpdate({_id:req.params.id},{
            name:req.body.name,  
            company:req.body.company,
            job:req.body.job,
            country:req.body.country,
            state:req.body.state,
            city:req.body.city,
            street_address:req.body.street_address,
            phone:req.body.phone,
            about:req.body.about
          }); 

        //   console.log(user);

          req.flash('success','Profile Updated');
          res.redirect("/admin/profile/"+user._id);
        
    } catch (error) {
       res.end(error);
    }
  
   
    return res.render("admin/profile");
}



module.exports = {
    dashboard,
    profile,
    update_profile
 
}