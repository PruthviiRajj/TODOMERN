import express from 'express'
import userRouter from './routes/users.js'
import taskRouter from './routes/task.js'
import cookieParser from 'cookie-parser'
import {config} from 'dotenv'
import { errorMiddleware } from './middleware/error.js'
import cors from 'cors'

export const app = express()

config({
    path:"./data/.env"
})

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:[process.env.FRONTEND_URI],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
}))

app.get("/",(req,res)=>{
    res.send("done")
})

app.use("/api/v1/users",userRouter)
app.use("/api/v1/tasks",taskRouter)
app.use(errorMiddleware)


