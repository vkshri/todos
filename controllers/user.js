import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) =>{
    try{
        const {fullName, email, password} = req.body
        
        if(!fullName || !email || !password){
            return res.status(403).json({
                success: false,
                message: "All field are required."
            })
        }
        // finding user with thgis user id already exist or not
        const user = await User.findOne({email});
        if(user){
            return res.status(403).json({
                success: false,
                message: "User Already Exist."
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullName,
            email,
            password:hashedPassword
        });
        return res.status(201).json({
            success: true,
            message: "Account Created Successfully."
        })
    }catch(error){
       console.log(error);
    }
}



export const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(403).json({
                success: false,
                message: "All field are required."
            });
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(403).json({
                success: false,
                message: "Incorrect email or Password."
            });
        }
        const isPasswordmatch = await bcrypt.compare(password, user.password);
        if(!isPasswordmatch){
            return res.status(403).json({
                success: false,
                message: "Incorrect email or Password."
            });
        }

        const token = await jwt.sign({userId:user._id}, process.env.SECRET_KEY,{expiresIn:'1d'})
        
        

        return res.status(200).cookie("token", token, {httpOnly:true, sameSite:"strict", maxAge:24*60*60*100,}).json({
            success: true,
            message: `Welcome back ${user.fullName}`
        });
    }catch(error){
        console.log(error);
    }
}


export const logout = async (_, res) => {
    try{
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            success:true,
            message:"user logout successfully. "
        });

    }catch(error){
        console.log(error);
    }
}