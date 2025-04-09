import productModel from "../models/productModel.js"
import providerModel from "../models/providerModel.js"

// add product
const addProduct = async (req,res) => {
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

// add provider
const addProvider = async (req, res) => {
    const provider = new providerModel({
        name: req.body.name,
        website: req.body.website,
        email: req.body.email,
        phone: req.body.phone,
        location: req.body.location,
        specialty: req.body.specialty,
        category: req.body.category
    })
    try {
        await provider.save();
        res.json({success: true, message: "Provider Added"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error"})
    }
}

// remove provider
const removeProvider = async (req, res) => {
    try {
        await providerModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Provider Removed"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"})        
    }
}

// list all providers
const listProviders = async (req, res) => {
    try {
        const providers = await providerModel.find({});
        res.json({success: true, data: providers})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"})
    }
}

export {addProduct, listProduct, removeProduct, addProvider, listProviders, removeProvider}