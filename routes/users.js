
import express from 'express'

import { getAllUsers, getMyProfile, login, logout, newUser } from '../controllers/users.js'
import { isAuthenticated } from '../middleware/auth.js'

const router = express.Router()

router.get("/all",getAllUsers)

router.post("/new",newUser)

router.post("/login",login)

router.post("/logout",logout)

router.get("/myprofile", isAuthenticated,getMyProfile)

export default router