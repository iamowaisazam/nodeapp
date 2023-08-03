const PermissionModel = require("../../../models/Permission");
const bcrypt = require("bcrypt")

// 
// 
// 
const index = async (req,res) => {
    try {
        const data = await PermissionModel.findAll();
        res.render("permissions/index",{
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
    res.render("permissions/create",{});
}


// 
// 
// 
const store = async (req,res) => {

    try {

        const isAlreadyAdded = await PermissionModel.findOne({where:{name:req.body.name}});
        if(isAlreadyAdded){
            req.flash('error','Permission Allready Added Please Unique Name');
           return res.render("permissions/create",{old:req.body});
        }


        const u = await PermissionModel.create({
            title:req.body.title,
            name:req.body.name,
            type:req.body.type,
        });
        req.flash('success','Permission Added');
       return res.redirect('/admin/permissions/index');
    } catch (error) {
        res.json(error);
    }

}


// 
// 
// 
const edit = async (req,res) => {

    const id = req.params.id;
    const data = await PermissionModel.findOne({_id:id});
    if(data){
        res.render("admin/permissions/edit",{data:data});
    }else{
        res.json({message:"Not Found"});
    }
   
}

// 
// 
// 
const update = async (req,res) => {

    const id = req.params.id;

    const isAlreadyAdded = await PermissionModel.findOne({name:req.body.name});
    if(isAlreadyAdded && isAlreadyAdded._id != id){
        req.flash('error','Permission Allready Added Please Unique Name');
       return res.render("admin/permissions/create",{old:req.body});
    }

    let data = {
        title:req.body.title,
        name:req.body.name,
        type:req.body.type,
    };
    try {
        const cc = await PermissionModel.findOneAndUpdate({_id:id},data);   
        res.redirect('/admin/permissions/edit/'+id);

    } catch (error) {
        res.json({message:"Not Found"});
    }
}


// 
// 
// 
const del = async (req,res) => {

    const id = req.params.id;
    try {
        const cc = await PermissionModel.destroy({where:{id:id}});
        res.redirect('/admin/permissions/index');
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