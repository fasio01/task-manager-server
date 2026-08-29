import express from 'express'
import cookieparser from 'cookie-parser'
import authroute from './routes/userRoute.js'
import taskroute from './routes/taskRoute.js'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js'

const app = express()
app.use(async (req, res, next) => {
    await connectDB()
    next()
})
const port = process.env.PORT || 5000
app.use(express.json())
app.use(cookieparser())
app.use(cors({
    origin:process.env.CLIENT_URL || "http://localhost:5173",
    credentials:true
}))
app.use("/user",authroute)
app.use("/task",taskroute)
// app.listen(port,() => console.log(`server running on port ${port}`))
export default app