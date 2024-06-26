import jwt from 'jsonwebtoken'

export const sendCookie = (user,res,statusCode,message)=>{
    const token = jwt.sign({
        _id:user[0]._id
    },process.env.JWT_SECRET_KEY)
    
    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "None",
        secure: process.env.NODE_ENV !== "Development"
    })
    

    res.status(statusCode).json({
        success:true,
        message
    })
}