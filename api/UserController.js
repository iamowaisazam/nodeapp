const RoleModel = require("../models/Role");
const User = require("../models/User");


// 
// 
// 
const users = async (req,res) => {

    try {
        const user = await User.find();
        let response = await user.map((obj) => {
            obj.image = "https://rich-tan-capybara-wig.cyclic.app/static/admin/"+obj.image;
            return obj;
        });
        return res.status(200).json(response);
   
    } catch (error) {
        res.send(error);
    }

}




// 
// 
// 
const register = async (req,res) => {

    try {
        let pp = await bcrypt.hash(req.body.password,10);
        const u = User.create({
            name:req.body.name,
            email:req.body.email,
            password:pp,
            image:null,
            role_id:"6498c50ebb1baab4f96a31aa",
        });

        return res.json({
            "message":"Register Success Please Login",
            "data":u,
        });

        
    } catch (error) {
        return res.json({
            "message":"Register Failed",
            "data":u,
        });
    }   
}



// 
// 
// 
const login = async (req,res) => {

    let email = req.body.email;
    let password = req.body.password;

    const response = await User.findOne({email:email});
    if(response == null){
        return res.json({
            "message":"Incorect Email Or Password",
            "data":null,
        });
    }

    let dbpass = response.password;
    let compare = await bcrypt.compare(password,dbpass);
    if(compare == false){
        return res.json({
            "message":"Incorect Email Or Password",
            "data":null,
        });
    }

    return res.json({
        "message":"Incorect Email Or Password",
        "data":response,
    });

}



module.exports = {
    users,
    login,
    register,
}