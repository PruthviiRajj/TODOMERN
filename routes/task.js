import express from 'express'
import { deleteTask, getMyTask, newTask, updateTask } from '../controllers/task.js'
import {isAuthenticated} from '../middleware/auth.js'

const router = express.Router()

router.use(isAuthenticated)

router.get("/new",newTask)

router.get("/my",getMyTask)

router.route("/:id").put(updateTask).delete(deleteTask)

export default router