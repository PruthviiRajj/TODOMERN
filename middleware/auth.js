import jwt from 'jsonwebtoken'
import { User } from '../models/register.js'

export const isAuthenticated = async(req,res,next)=>{
    const { token } = req.cookies

    if(!token){
        return res.status(400).json({
            success:false,
            message:"Login first"
        })
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)

    req.user = await User.findById(decoded._id)

    next()
}