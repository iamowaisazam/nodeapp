const CategoryModel = require("../models/Category");
const ProductModel = require("../models/Product");


// 
// 
// 
const all_products = async (req,res) => {

    try {
        const user = await ProductModel.find();
        let response = await user.map((obj) => {
            obj.image = "https://rich-tan-capybara-wig.cyclic.app/static/uploads/"+obj.image;
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
const all_categories = async (req,res) => {

    try {
        const user = await CategoryModel.find();

        let response = await user.map((obj) => {
            obj.image = "https://rich-tan-capybara-wig.cyclic.app/static/uploads/"+obj.image;
            return obj;
        });
        return res.status(200).json(response);
    } catch (error) {
        res.send(error);
    }
}






module.exports = {
    all_products,
    all_categories,
}