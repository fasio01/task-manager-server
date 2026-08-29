import express from 'express'

import { login, logoutUser, register } from '../controllers/userController.js'
const route = express.Router()

route.post("/register",register)
route.post("/login",login)
route.post("/logout",logoutUser)
export default route