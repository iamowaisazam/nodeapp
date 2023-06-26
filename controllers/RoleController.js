const RoleModel = require("../models/Role");
const PermissioneModel = require("../models/Permission");
const RolePermissionModel = require("../models/RolePermission");


const bcrypt = require("bcrypt");
const { updatePermission,getPermissions } = require("../utils/Permission");

// 
// 
// 
const index = async (req,res) => {
    try {
        const data = await RoleModel.find();
        res.render("admin/roles/index",{
            data:data
        });
    } catch (error) {
        res.send(error);
    }
}


// 
// 
// 
const create = async (req,res) => {

  
  
    res.render("admin/roles/create",{});
}


// 
// 
// 
const store = async (req,res) => {

    try {

        const isAlreadyAdded = await RoleModel.findOne({title:req.body.title});
        if(isAlreadyAdded){
            req.flash('error','Role Allready Added Please Write Unique Name');
           return res.render("admin/roles/create",{old:req.body});
        }


        const u = await RoleModel.create({
            title:req.body.title,
        });
        res.redirect('/admin/roles/index');

    } catch (error) {
        res.end(error);
    }

}


// 
// 
// 
const edit = async (req,res) => {


    const id = req.params.id;
    const data = await RoleModel.findOne({_id:id});
    const permissions = await getPermissions(id)


    if(data){
        res.render("admin/roles/edit",{
            data:data,
            permissions:permissions,
        });
    }else{
        res.json({message:"Not Found"});
    }
   
}

// 
// 
// 
const update = async (req,res) => {

    // console.log(req.body);

    const id = req.params.id;
    let data = {
        title:req.body.title,
    };

    // try {

        const cc = await RoleModel.findOneAndUpdate({_id:id},data);
        updatePermission(id,req.body.perm);

      
        res.redirect('/admin/roles/edit/'+id);

    // } catch (error) {
    //     res.json({message:"Not Found"});
    // }
}

// 
// 
// 
const del = async (req,res) => {

    const id = req.params.id;
    try {
        const cc = await RoleModel.findOneAndRemove({_id:id});
        res.redirect('/admin/roles/index');
    } catch (error) {
        res.json({message:"Not Found"});
    }
}



module.exports = {
    index,
    create,
    store,
    edit,
    update,
    del
}