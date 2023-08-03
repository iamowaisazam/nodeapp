const RoleModel = require("../../../models/Role");
const PermissioneModel = require("../../../models/Permission");
const RolePermissionModel = require("../../../models/RolePermission");


const bcrypt = require("bcrypt");
const { updatePermission,getPermissions } = require("../../../utils/Permission");

// 

// 
// 
const index = async (req,res) => {
    try {

        const data = await RoleModel.findAll();
       return res.render("roles/index",{
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
   return res.render("roles/create",{});
}


// 
// 
// 
const store = async (req,res) => {

    try {

        const isAlreadyAdded = await RoleModel.findOne({where:{name:req.body.name}});
        if(isAlreadyAdded){
            req.flash('error','Role Allready Added Please Write Unique Name');
           return res.render("roles/create",{old:req.body});
        }

        const u = await RoleModel.create({
            name:req.body.name,
        });
        req.flash('success','Record Added');
       return res.redirect('/admin/roles/index');

    } catch (error) {
        res.end(error);
    }

}


// 
// 
// 
const edit = async (req,res) => {


    const id = req.params.id;
    const data = await RoleModel.findOne({where:{id:id}});
    const permissions = await getPermissions(id)

    if(data){
        res.render("roles/edit",{
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
        res.redirect('roles/edit/'+id);

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
        const cc = await RoleModel.destroy({where:{id:id}});
        req.flash('success','Record Deleted');
        res.redirect('/admin/roles/index');
    } catch (error) {
        req.flash('error','Something Went Wrong');
        res.redirect('/admin/roles/index');
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