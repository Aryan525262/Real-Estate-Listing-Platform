const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {body, validationResult} = require('express-validator');
const api = "properties@12345";
const fetchuser = require("../middleware/fetchuser");
//Router 1: Create a User using: POST "/api/auth/createuser". No Login required
router.post("/Createuser", [
    body('name',"Enter a valid Name").isLength({min:3}),
    body("email", "Enter a valid Email").isEmail(),
    body("password","Password must be atleast 8 characters").isLength({min:8})
    ],
    async (req,res) =>{
        let success = false;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({success, errors: errors.array()});
        }
        try{
            let user = await User.findOne({email: req.body.email});
            if(user){
                return res.status(400).json({success, error: "User with this email already exists"});
            }
            const salt = await bcrypt.genSalt(10);
            const scrPass = await bcrypt.hash(req.body.password, salt);
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: scrPass,
                role: req.body.role
            });
            const data = {
                user:{
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, api);
            success = true;
            res.json({success, authToken});
        }catch(error){
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);
//Router 2: Authenticate a User using: Post "/api/auth/Login". No login required
router.post("/Login", [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password cannot be blank").exists()
    ],
    async(req,res)=>{
        let success = false;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({success, errors: errors.array()});
        }
        const {email, password} = req.body;
        try{
            let user = await User.findOne({email});
            if(!user){
                return res.status(400).json({success, error: "Please try to Login again with correct credentials"});
            }
            const passCompare = await bcrypt.compare(password, user.password);
            if(!passCompare){
                success = false;
                return res.status(400).json({success, error: "Please try to Login with correct credentials"});
            }
            const data = {
                user:{
                    id: user.id,
                    role: user.role
                }
            };
            const authToken = jwt.sign(data,api);
            success = true;
            res.json({success, authToken});
        }catch(error){
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);
//Router 3: Get Logged in User details using: Post "/api/auth/getuser". Login required
router.post("/getuser", fetchuser, async(req,res)=>{
    try{
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});
module.exports = router;