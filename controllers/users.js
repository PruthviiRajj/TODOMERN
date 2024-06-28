import bcrypt from 'bcrypt'
import { User } from "../models/register.js"
import { sendCookie } from "../utils/features.js"
import ErrorHandler from '../middleware/error.js'

export const getAllUsers = async(req,res)=>{

    const users = await User.find({})
    
    res.json({
        success:true,
        users
    })
}

export const newUser = async(req,res,next)=>{
    try {
        

    const { name,email,password } = req.body

    if(!name) return next(new ErrorHandler("please Provide name,email and Password",400))
    if(!email) return next(new ErrorHandler("please Provide name,email and Password",400))
    if(!password) return next(new ErrorHandler("please Provide name,email and Password",400))
    
    const users  = await User.findOne({email})
    
    if(users) return next(new ErrorHandler("User Already Exists",400))

    const hashedPassword = await bcrypt.hash(password,10)    

    const user = await User.create({
        name,
        email,
        password:hashedPassword
    })

    return res.status(200).json({
        success:true,
        message:"User is created"
    })

    } catch (error) {
        next(error)
    }
}

export const login = async(req,res,next)=>{
    try {
        const {email,password} = req.body

        if(!email) return next(new ErrorHandler("Please Provide Email And Password"))
        if(!password) return next(new ErrorHandler("Please Provide Email And Password"))
        
        const user = await User.find({email}).select("+password")
    
        if(!user){
            return next(new ErrorHandler("Invalid Email And Password",400))
        }
        
        const isMatched = await bcrypt.compare(password,user[0].password)
    
        if(isMatched){
    
            sendCookie(user,res,200,`Welcome Back ${user[0].name}`)
            
        }else{
            return next(new ErrorHandler("Invalid Email And Password",400))
        }
    } catch (error) {
        next(error)
    }
}

export const logout = async(req,res)=>{

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        sameSite:process.env.NODE_ENV === "Development"? "lax":None,
        secure:process.env.NODE_ENV === "Development"? false:true,
    })

    return res.status(200).json({
        success:true,
        message:"Logged Out Successfully"
    })
}

export const getMyProfile =(req,res)=>{

    res.status(200).json({
        success:true,
        user:req.user
    })
}