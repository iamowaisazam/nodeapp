const RoleModel = require("../models/Role");
const User = require("../models/User");
const bcrypt = require("bcrypt")

// 
// 
// 
const index = async (req,res) => {

    try {

        const user = await User.find();
        res.render("admin/users/index",{
            data:user
        });

    } catch (error) {

        res.send(error);
    }

    
}


// 
// 
// 
const create = async (req,res) => {

     let roles = await RoleModel.find();
  
    res.render("admin/users/create",{
      roles:roles
    });

}


// 
// 
// 
const store = async (req,res) => {

    try {
        
        let password = await bcrypt.hash(req.body.password,10);
        

        const u = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:password,
            role_id:req.body.role_id,
            image:null,
        });

        res.redirect('/admin/users/index');

    } catch (error) {
        res.json(error);
    }

}


// 
// 
// 
const edit = async (req,res) => {

    const id = req.params.id;
    const data = await User.findOne({_id:id});
    let roles = await RoleModel.find();
    if(data){

        res.render("admin/users/edit",{
            data:data,
            roles
        });
        
    }else{
    
        res.json({message:"Not Found"});
    }
   
}

// 
// 
// 
const update = async (req,res) => {

    const id = req.params.id;
    let data = {
        name:req.body.name,
        email:req.body.email,
        role_id:req.body.role_id,
    };
    
    if(req.body.password != ""){
        data.password = await bcrypt.hash(req.body.password,10);
    }
    
    try {
        const cc = await User.findOneAndUpdate({_id:id},data);   
        res.redirect('/admin/users/edit/'+id);

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
        const cc = await User.findOneAndRemove({_id:id});
        res.redirect('/admin/users/index');
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