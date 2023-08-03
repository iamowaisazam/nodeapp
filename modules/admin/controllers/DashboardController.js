const UserModel = require("../../../models/User");
const { userPermission } = require("../../../utils/Permission");


// 
// 
// @route admin/dashboard 
const dashboard = async (req,res) => {
    return res.render("dashboard");
}


// 
// 
// @route admin/profile/:id 
const profile = async (req,res) => {

    try {
        let user = await UserModel.findOne({id:req.params.id});
        return res.render("profile",{user:user});    
    } catch (error) {
        res.end(error);
    }
    
}  



// 
// 
// @route /admin/update_profile/{id}
const update_profile = async (req,res) => {
    
    try {

        let saveData = {
                full_name:req.body.full_name,  
                company:req.body.company,
                job:req.body.job,
                country:req.body.country,
                state:req.body.state,
                city:req.body.city,
                address:req.body.address,
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
        console.log(req.params.id);
        let user = await UserModel.update(
            saveData,
            {where:{id:req.params.id}}
        ); 
        req.flash('success','Profile Updated');
        res.redirect("/admin/profile/"+user.id);
        
    } catch (error) {
       res.end(error);
    }
    
}



module.exports = {
    dashboard,
    profile,
    update_profile
 
}