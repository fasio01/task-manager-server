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
    origin: function (origin, callback) {
        if (!origin || /\.vercel\.app$/.test(origin) || origin === "http://localhost:5173") {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true
}))
app.get('/', (req, res) => {
    res.send('Task Manager API is Running Successfully!')
})
app.use("/user",authroute)
app.use("/task",taskroute)
// app.listen(port,() => console.log(`server running on port ${port}`))
export default app