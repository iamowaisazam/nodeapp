const UserModel = require("../models/User");
const multer  = require('multer');
const { userPermission } = require("../utils/Permission");


const upload = multer({
    storage:multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+".jpg")
    }
  })
});
  



// 
// 
// 
const dashboard = async (req,res) => {

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

        let saveData = {
                name:req.body.name,  
                company:req.body.company,
                job:req.body.job,
                country:req.body.country,
                state:req.body.state,
                city:req.body.city,
                street_address:req.body.street_address,
                phone:req.body.phone,
                about:req.body.about,
                facebook:req.body.facebook,
                twitter:req.body.twitter,
                instagram:req.body.instagram,
                linkedin:req.body.linkedin,
        };
        if(req.file != undefined){
            saveData.image = req.file.filename;
        }
        
        let user = await UserModel.findOneAndUpdate({_id:req.params.id},saveData); 
        req.flash('success','Profile Updated');
        res.redirect("/admin/profile/"+user._id);
        
    } catch (error) {
       res.end(error);
    }
}



module.exports = {
    dashboard,
    profile,
    update_profile
 
}