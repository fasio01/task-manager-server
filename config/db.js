import mongoose from 'mongoose'

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("mongdb atlas connected")
    } catch (error) {
        console.log(`mongo db connection failed ${error}`)
    }
}

export default connectDB
