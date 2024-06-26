import ErrorHandler from "../middleware/error.js"
import { Task } from "../models/task.js"

export const newTask = async(req,res,next)=>{
   try {
    const { title, description } = req.body

    if(!title) return next(new ErrorHandler("Please Provide Title And Description",400))

    await Task.create({
        title,
        description,
        user:req.user
    })

    res.status(201).json({
        success: true,
        message:"Task Added Successfully"
    })
   } catch (error) {
    next(error)
   }
}

export const getMyTask = async(req,res,next)=>{
    try {
        const tasks = await Task.find({user:req.user._id})

        res.status(200).json({
            success: true,
            tasks
        })
    } catch (error) {
        next(error)
    }
}

export const updateTask = async(req,res,next)=>{
    try {
        
    const { id } = req.params

    
    const task = await Task.findById(id)
    
    if(!task) return next(new ErrorHandler("Please Provide Id",400))

    task.isCompleted = !task.isCompleted

    await task.save()

    res.status(200).json({
        success: true,
        message:"Task Updated"
    })
    } catch (error) {
        next(error)
    }
}

export const deleteTask = async(req,res,next)=>{
    try {
        
    const { id } = req.params
    
    
    const task = await Task.findById(id)
    console.log(task)
    if(!task) return next(new ErrorHandler("Please Provide Id",400))

    await task.deleteOne()

    res.status(200).json({
        success: true,
        message:"Task Deleted"
    })
    } catch (error) {
        next(error)
    }
}