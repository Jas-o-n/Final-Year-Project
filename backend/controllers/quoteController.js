import quoteModel from "../models/quoteModel.js"

// add quote
const addQuote = async (req,res) => {
    try {
        const quote = new quoteModel(req.body);
        await quote.save();
        res.json({success:true,message:"Quote Request Submitted Successfully"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error Submitting Quote Request"})
    }
}

// remove quote
const removeQuote = async (req,res) => {
    try {
        await quoteModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Quote Request Removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error Removing Quote Request"})        
    }
}

// list all quotes
const listQuote = async (req,res) => {
    try {
        const quotes = await quoteModel.find({});
        res.json({success:true,data:quotes})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error Fetching Quotes"})
    }
}

export {addQuote,listQuote,removeQuote}