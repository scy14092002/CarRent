const express=require("express")
const bcrypt=require("bcrypt")

const jwt = require("jsonwebtoken");
const User=require("../models/user")
const router=express.Router()
const checkLogin=require('../middleware/checkLogin')


router.post("/signup",async(req ,res)=>{
    try{
        const {name,username,password}=req.body;
        const existingUser= await User.findOne({username})
        if (existingUser){
            return res.status(400).json({
                msg:"User already exists"
            })
        }
        const hashedPassword= await bcrypt.hash(password,10)
        const user= new User({
            name,
            username,
            password:hashedPassword
        })
        await user.save()
        res.status(200).json({
            msg:"User is created successfully",
            User:{
                name:user.name,
                username:user.username,
                
            }
        })

    }
    catch(error){
        res.status(500).json({
            error:error.message
        })

    }
})
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({
                msg: "Invalid username or password"
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                msg: "Invalid username or password"
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.json({
            msg: "Login successful",
            access_token: token
        });

    } catch (error) {
        res.status(500).json({
            msg: "Server error",
            error: error.message
        });
    }
});

router.get("/profile", checkLogin, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                msg: "User not found"
            });
        }

        res.json({
            user
        });

    } catch (error) {
        res.status(500).json({
            msg: "Server error",
            error: error.message
        });
    }
});
module.exports=router