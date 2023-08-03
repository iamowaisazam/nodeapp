
const ProductModel = require("../../../models/Product");
const CategoryModel = require("../../../models/Category");




// 
// 
// 
const index = async (req,res) => {
    try {
        const data = await ProductModel.find();
        res.render("admin/products/index",{
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

    let categories = await CategoryModel.find();

    res.render("admin/products/create",{categories});
}


// 
// 
// 
const store = async (req,res) => {

    try {

        const isAlreadyAdded = await ProductModel.findOne({slug:req.body.slug});
        if(isAlreadyAdded){
            req.flash('error','Product Allready Added Please Write Unique Slug');
           return res.render("admin/products/create",{old:req.body});
        }

        let data = {
            title:req.body.title,
            slug:req.body.slug,
            status:req.body.status,
            description:req.body.description,
            category_id:req.body.category_id,
            price:req.body.price,
        }
 
        if(req.file != undefined){
            data.image = req.file.filename;
        }

        const u = await ProductModel.create(data);
        res.redirect('/admin/products/index');

    } catch (error) {
        res.end(error);
    }

}


// 
// 
// 
const edit = async (req,res) => {


    const id = req.params.id;
    const data = await ProductModel.findOne({_id:id});
    let categories = await CategoryModel.find();
    
    if(data){
        res.render("admin/products/edit",{
            data:data,
            categories
            
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
        title:req.body.title,
        slug:req.body.slug,
        description:req.body.description,
        status:req.body.status,
        category_id:req.body.category_id,
        price:req.body.price,
    };
    
    if(req.file != undefined){
        data.image = req.file.filename;
    }

    const isAlreadyAdded = await ProductModel.findOne({slug:req.body.slug});
    if(isAlreadyAdded && isAlreadyAdded.id != id){
        req.flash('error','Product Allready Added Please Unique Name');
       return res.redirect('/admin/products/edit/'+id);
    }

    // try {
        const cc = await ProductModel.findOneAndUpdate({_id:id},data);
        res.redirect('/admin/products/edit/'+id);
    // } catch (error) {
        // res.json({message:"Not Found"});
    // }

}


// 
// 
// 
const del = async (req,res) => {

    const id = req.params.id;
    try {
        const cc = await ProductModel.findOneAndRemove({_id:id});
        res.redirect('/admin/products/index');
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