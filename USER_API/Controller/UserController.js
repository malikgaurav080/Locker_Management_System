const userModel = require('../models/User');
const userKeys = require('../models/keys');
const jwtModel = require('../models/jwt')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const NodeCache = require('node-cache')
const myCache = new NodeCache()

const { wrongAlert, loggedIn, signupAlert, lockerRequest } = require('../mail/mailAlert')
const { validation } = require('../utills/validationSchema');
const { encrypt, decrypt} = require('../utills/AES')
const { Keyvalidation } = require('../utills/keysValidation')
const { logout_validation } = require('../utills/logout_Validation')



  

const signUpUser = async (req, res) =>{

    const {username, email, password, key1, key2, key3, key4, key5} = req.body;

    try {
        //Validate for Email and Password
        const { error } = validation({ 
            email:req.body.email, 
            password:req.body.password
        });
		if (error)
			return res.status(400).json({ error: true, message: error.details[0].message });

        //checking if user already existing or not
        const existingUser = await userModel.findOne({ email : email});
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }

        //Decrypt the password with the help of bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        //create a new user in the database users
        const result = await userModel.create({
            email: email,
            password: hashedPassword,
            username: username
        });

        //Validating keys => all keys should be Unique
        const err  = Keyvalidation(
            [req.body.key1,req.body.key2,req.body.key3,req.body.key4,req.body.key5]
            );
        if (err){
            //if any error in keys validation so it will delete the created user from the database
            await userModel.findByIdAndRemove(result.id);
            return res.status(400).json({ error: true,message: err});
        }

        //storing the keys in the seprate database Keys
        const keys = await userKeys.create({
            userId: result.id,
            key1: encrypt(key1),
            key2: encrypt(key2),
            key3: encrypt(key3),
            key4: encrypt(key4),
            key5: encrypt(key5)
        });

        //Send the Signup Alert On mail from the bank
        signupAlert(result.email);
        res.status(201).json({error: false, message: "Account created sucessfully"});
        
    } catch (error) {
        res.status(500).json({Error:true, Message: error});
    }
}



const logInUser = async (req, res)=>{
    
    const {email, password} = req.body;

    try {
        //Validation for Email and Password
        const { error } = validation({
            email:req.body.email, 
            password:req.body.password
        });
        if (error)
			return res.status(400).json({ error: true, message: error.details[0].message });
        
        //checking if user exixting or not
        const existingUser = await userModel.findOne({ email : email});
        if(!existingUser){
            return res.status(404).json({message: "User not found"});
        }

        //if user exist then match the password 
        const matchPassword = await bcrypt.compare(password, existingUser.password);

        //if wrong password then send the wrong password mail alert to the user
        if(!matchPassword){
            wrongAlert(existingUser.email);  
            return res.status(400).json({message : "Invalid Credentials"});
        }

        //if password is correct then creating a token with the help of JWT
        const token = jwt.sign({email : existingUser.email, id : existingUser._id }, process.env.SECRET_KEY, {expiresIn:'15m'});

        //store token in JWT model for Logout reference
        await jwtModel.create({
            jwt: token
        });

        //Sending login alert to the user
        loggedIn(existingUser.email);

        //user Loggedin Now
        res.status(200).json({message: "Logged in sucessfully", token: token, error: false});

    } catch (error) {
        res.status(500).json({message: "Something went wrong", Error: error});
    }
}



//User can only see his own data after user signin token authentication
const profileDetails = async (req, res) => {
    const msg = logout_validation(req.headers.authorization);
    console.log(msg);
    // if(msg){
    //     return res.status(400).json({message: msg});
    // }
    //Finding user with the help of email that is return by middleware useAuth
    userModel.find({email : req.email}, (err, docs) => {
        if (!err) {
            res.status(200).json({error:false, Profile:docs});
        } else {
            res.send(err);
        }
    });
}

//Admin have capability to see all the user Details aften Admin signin token authentication
const GetallDetails = async(req, res) => {

    userModel.find({}, (err, docs) => {

        if(myCache.has('uniqueeKey')){
            console.log('Retrieved value from cache !!')
            res.status(200).json(myCache.get('uniqueeKey'));
        } else {

        let result = {error:false, Profile:docs};
        myCache.set('uniqueeKey',result)
        console.log('Value not present in cache,' + ' performing computation')
        res.json(result)
        }
    });
}

//For JMeter Testing
const Details = async(req, res) => {
    userModel.find({}, (err, docs) => {
        if (!err) {
            res.status(200).send(docs);
        } else {
            res.send(err);
        }
    });
}


// User can send request to the Admin for Locker Creation
const SendRequest = async (req, res) =>{ 

    const data = { userEmail: req.email, Requ: req.body.Requ };

    userModel.find({email : req.email}, (err, docs) => {
        if (!err) {
            //Using Fetch request will store in the Admin database
            fetch('http://localhost:3002/admin/requests', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .catch((error) => {
                console.error('Error:', error);
            });

            //sending email to user and admin
            lockerRequest(req.email)
            res.status(200).json({error:false, message: "Request has been sent to Admin for New Locker"});
        } else {
            res.send(err);
        }
    });
}



const ResetPassword = async (req, res) =>{

    const {email, key1, key2, key3, key4, key5} = req.query;
    const { newPassword} = req.body;

    //Validating Email and Password
    try {
        const { error } = validation({ 
            email: req.query.email, 
            password: req.body.newPassword
        });
		if (error)
			return res.status(400).json({ error: true, message: error.details[0].message });
        
        //Validating Keys, all should be unique
        const err  = Keyvalidation(
            [req.query.key1, req.query.key2, req.query.key3, req.query.key4, req.query.key5]
            );
        if (err){
            return res.status(400).json({ error: true,message: err});
        }

        //Encrypting new pass with bcrypt
        const hashPassword = await bcrypt.hash(newPassword, 10);
        
        //Finding user with Email
        userModel.find({ email : req.query.email}, (err, docs) => {
            if (!err) {
                if (docs.length == 0) {
                    res.status(404).send({message: "User Not exists with this Email"});
                } else {   
                    
                    let udocs = docs;
                    //Finding Keys with UserId
                    userKeys.find({userId: udocs[0].id}, (errr, kdocs) => {
                        if (!errr) {   
                            if (kdocs.length == 0) {
                                res.status(404).send({message: "Keys Not exists For this User"});
                            }

                        
                        // console.log(decrypt(kdocs[0].key1));
                        // console.log(decrypt(kdocs[0].key2));
                        // console.log(decrypt(kdocs[0].key3));
                        // console.log(decrypt(kdocs[0].key4));
                        // console.log(decrypt(kdocs[0].key5));

                        if(req.query.key1 == decrypt(kdocs[0].key1) && 
                            req.query.key2 == decrypt(kdocs[0].key2) && 
                            req.query.key3 == decrypt(kdocs[0].key3) && 
                            req.query.key4 == decrypt(kdocs[0].key4) && 
                            req.query.key5 == decrypt(kdocs[0].key5)){

                                userModel.updateOne({email: req.query.email}, {password: hashPassword}, (err, docs) => {
                                    if (!err) {
                                        res.status(200).send({ message: 'Password Updated Successfully' });
                                    } else {
                                        throw err;
                                    }
                                })
                        } else {
                            res.send("Keys Mismatch")
                        }
                        } else {
                            res.send(errr)
                    }
                    })         
                }
            } else {
                res.send(err);
            }
        });
        
    } catch (error) {
        res.status(500).json({Error:true,Message: error});
    }

}


const logout = async (req, res) =>{
            user1 = await jwtModel.find({ jwt : req.body.jwt})
            // console.log(user1[0])
            if (user1 == null) {
                res.status(404).json({ message: `Needs to be Login first....` });
            } else {
                    await jwtModel.updateOne({ _id: user1[0]._id }, {
                    flag: 1
                })
                res.status(200).json({ message: 'Logged-Out' });
            }
        }

module.exports={signUpUser,logInUser,profileDetails,
                 GetallDetails, SendRequest, Details, ResetPassword, logout};
