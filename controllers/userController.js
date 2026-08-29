import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const userexist = await User.findOne({ email })
        if (userexist) {
            return res.status(401).json({ message: "user already exist" })
        }
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            name,
            email,
            password: hashpassword
        })

        res.status(200).json({ message: "user registered successfully", user })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const login = async(req,res) => {
    try {
        const {email,password} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({message:"wrong email"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch) return res.status(401).json({message:"password not matched"})
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})
        res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    }).status(200).json({
      message: 'Login successful',
       token,  
      user: { id: user._id, name: user.name, email: user.email }
    })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const logoutUser = (req, res) => {
  res.clearCookie('token',{
     httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  })
  res.status(200).json({ message: 'Logged out successfully' })
}