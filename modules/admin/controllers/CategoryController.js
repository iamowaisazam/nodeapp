
const CategoryModel = require("../models/Category");
const formidable = require('formidable');



// 
// 
// 
const index = async (req,res) => {
    try {
        const data = await CategoryModel.find();
        res.render("admin/categories/index",{
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

  
  
    res.render("admin/categories/create",{});
}


// 
// 
// 
const store = async (req,res) => {

    try {

        const isAlreadyAdded = await CategoryModel.findOne({slug:req.body.slug});
        if(isAlreadyAdded){
            req.flash('error','Category Allready Added Please Write Unique Slug');
           return res.render("admin/categories/create",{old:req.body});
        }

        let data = {
            title:req.body.title,
            slug:req.body.slug,
            status:req.body.status,
            description:req.body.description,
        }
 
        if(req.file != undefined){
            data.image = req.file.filename;
        }

        const u = await CategoryModel.create(data);
        res.redirect('/admin/categories/index');

    } catch (error) {
        res.end(error);
    }

}


// 
// 
// 
const edit = async (req,res) => {


    const id = req.params.id;
    const data = await CategoryModel.findOne({_id:id});
    
    if(data){
        res.render("admin/categories/edit",{
            data:data,
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
        slug:req.body.slug,
        description:req.body.description,
        status:req.body.status,
    };

    
    if(req.file != undefined){
        data.image = req.file.filename;
    }

    const isAlreadyAdded = await CategoryModel.findOne({slug:req.body.slug});
    if(isAlreadyAdded && isAlreadyAdded.id != id){
        req.flash('error','Category Allready Added Please Unique Name');
       return res.redirect('/admin/categories/edit/'+id);
    }


    // try {

        const cc = await CategoryModel.findOneAndUpdate({_id:id},data);
        res.redirect('/admin/categories/edit/'+id);

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
        const cc = await CategoryModel.findOneAndRemove({_id:id});
        res.redirect('/admin/categories/index');
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