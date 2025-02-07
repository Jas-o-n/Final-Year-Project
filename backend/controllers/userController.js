import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

// login user
const loginUser = async (req,res) => {
    const {password,email} = req.body;
    try {
        const user = await userModel.findOne({email})
        
        if (!user) {
            return res.json({success:false,message:"User does not exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password)
        
        if (!isMatch) {
            return res.json({success:false,message:"Password is incorrect"})
        }
        
        const token = createToken(user._id)
        const isAdmin = user.isAdmin
        res.json({success:true,token,isAdmin})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})        
    }
}

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

// register user
const registerUser = async (req,res) => {
    const {name,password,email} = req.body;
    try {
        // check if user exists
        const exists = await userModel.findOne({email})
        
        if (exists) {
            return res.json({success:false,message:"User already exists"})
        }
        
        // validate email format
        if (!validator.isEmail(email)) {
            return res.json({success:false,message:"Please enter a valid email"})
        }

        // validate password strength
        if (password.length<8) {
            return res.json({success:false,message:"Please enter a longer password"})
        }
        
        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })
        
        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})        
    }
}

// list all users
const listUser = async (req,res) => {
    try {
        const users = await userModel.find({});
        res.json({success:true,data:users})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// get user by ID
const getUsersByIDs = async (req, res) => {
    try {
        const { userIDs } = req.body; // Expecting an array of user IDs
        const users = await userModel.find({ _id: { $in: userIDs } });
        res.json({ success: true, data: users });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// remove user
const removeUser = async (req,res) => {
    try {
        const user = await userModel.findById(req.body.id);
        await userModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"User Removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})        
    }
}

// upgrade user
const upgradeUserPriv = async (req,res) => {
    try {
        const user = await userModel.findById(req.body.id);
        await userModel.findByIdAndUpdate(req.body.id,{isAdmin:true});
        res.json({success:true,message:"User Privileges Upgraded"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})        
    }
}

// downgrade user
const downgradeUserPriv = async (req,res) => {
    try {
        const user = await userModel.findById(req.body.id);
        await userModel.findByIdAndUpdate(req.body.id,{isAdmin:false});
        res.json({success:true,message:"User Privileges Downgraded"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})        
    }
}

export {loginUser,registerUser,listUser,getUsersByIDs,removeUser,upgradeUserPriv,downgradeUserPriv}