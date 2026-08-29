import express from 'express'

import { login, logoutUser, register } from '../controllers/usercontroller.js'
const route = express.Router()

route.post("/register",register)
route.post("/login",login)
route.post("/logout",logoutUser)
export default route