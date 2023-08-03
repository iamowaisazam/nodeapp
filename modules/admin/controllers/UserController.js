const RoleModel = require("../../../models/Role");
const User = require("../../../models/User");
const bcrypt = require("bcrypt")

// 
// 
// @route admin/users/index
const index = async (req,res) => {

    try {

        const user = await User.findAll();
        res.render("users/index",{
            data:user
        });

    } catch (error) {
        req.flash('error','Something Went Wrong');
        res.redirect('/admin/');
    }

}


// 
// 
// @route admin/users/create
const create = async (req,res) => {

     let roles = await RoleModel.findAll();
    res.render("users/create",{
      roles:roles
    });

}


// 
// 
// @route admin/users/store
const store = async (req,res) => {

    try {
        
        let password = await bcrypt.hash(req.body.password,10);
        const u = await User.create({
            full_name:req.body.full_name,
            email:req.body.email,
            password:password,
            roleId:req.body.roleId,
            image:null,
        });

        req.flash('success','Record Added');
        res.redirect('/admin/users/index');

    } catch (error) {
        req.flash('error','Something Went Wrong');
        res.redirect('/admin/users/index');
    }

}


// 
// 
// @route admin/users/edit/:id
const edit = async (req,res) => {
    
    try {

        const id = req.params.id;
        const data = await User.findOne({id:id});
        let roles = await RoleModel.findAll();
        if(data){
            res.render("users/edit",{
                data:data,
                roles
            });
        }else{
            req.flash('error','User Not Found');
            res.redirect('/admin/users/index');
        }
        
    } catch (error) {
        req.flash('error','Something Went Wrong');
        res.redirect('/admin/users/index');
    }


}

// 
// 
// @route admin/users/update/:id
const update = async (req,res) => {

    const id = req.params.id;
    let data = {
        full_name:req.body.full_name,
        email:req.body.email,
        roleId:Number(req.body.roleId),
    };
    
    if(req.body.password != ""){
        data.password = await bcrypt.hash(req.body.password,10);
    }
    
    try {
        const cc = await User.update(
            data,
            {where:{id:id}},
        );   
        req.flash('success','Record Updated');
        res.redirect('/admin/users/edit/'+id);
    } catch (error) {
        req.flash('error','Something Went Wrong');
        res.redirect('/admin/users/edit/'+id);
    }
    
}

// 
// 
// @route admin/users/delete/:id
const del = async (req,res) => {

    const id = req.params.id;
    try {
        const cc = await User.destroy({
            where: {
              id:id
            },
          });

        req.flash('success','Record Deleted');
        res.redirect('/admin/users/index');
    } catch (error) {
        req.flash('error','Something Went Wrong');
        res.redirect('/admin/users/index');
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