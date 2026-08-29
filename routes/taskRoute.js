import express from 'express'
import { protect } from '../middlewares/authmiddleware.js'
import { createTask, deleteTask, getTasks, updateTask } from '../controllers/taskController.js'
const route = express.Router()

route.post("/",protect,createTask)
route.get("/",protect,getTasks)
route.put("/:id",protect,updateTask)
route.delete("/:id",protect,deleteTask)

export default route