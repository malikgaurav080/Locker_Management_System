const adminModel = require("../models/admin");
const requestModel = require("../models/userRequest")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();


const signup = async (req, res) =>{

    const {username, email, password} = req.body;
    try {

        const existingUser = await adminModel.findOne({ email : email});
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await adminModel.create({
            email: email,
            password: hashedPassword,
            username: username
        });

        res.status(201).json({message: "SignUp Successfully", error: false, user: result});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }

}

const signin = async (req, res)=>{
    
    const {email, password} = req.body;

    try {
        
        const existingUser = await adminModel.findOne({ email : email});
        if(!existingUser){
            return res.status(404).json({message: "User not found"});
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password);

        if(!matchPassword){
            return res.status(400).json({message : "Invalid Credentials"});
        }

        const token = jwt.sign({email : existingUser.email, id : existingUser._id }, process.env.ADMIN_SECRET_KEY, {expiresIn:'15m'});
        res.status(200).json({message: "LoggedIn Successfully", error: false, user: existingUser, token: token});


    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }

}


const GenerateRequest = async (req, res)=>{
    
    const {userEmail, Requ} = req.body;
    try {

        const existingUser = await requestModel.findOne({ userEmail : userEmail});
        if(existingUser){
            return res.status(400).json({message: "Your request already have been generated"});
        }

        const result = await requestModel.create({
            userEmail: userEmail,
            Requ: Requ
        });

        res.status(201).json({user: result, message: "Request sent successfully"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }

}

module.exports = { signin, signup, GenerateRequest };