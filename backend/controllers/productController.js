import productModel from "../models/productModel.js"

// add product
const addProduct = async (req,res) => {

    console.log(req.body);

    const product = new productModel({
        name:req.body.name,
        category:req.body.category
    })
    try {
        await product.save();
        res.json({success:true,message:"Product Added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

// remove product

const removeProduct = async (req,res) => {
    try {
        const product = await productModel.findById(req.body.id);
        await productModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Product Removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})        
    }
}

// list all products
const listProduct = async (req,res) => {
    try {
        const products = await productModel.find({});
        res.json({success:true,data:products})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}


export {addProduct,listProduct,removeProduct}