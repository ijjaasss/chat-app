import cloudinary from "../lib/cloudnary.js"
import { generateToken } from "../lib/utils.js"
import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'
export const signup= async (req,res)=>{
    const {fullName,email,password}=req.body
   try {
if(!fullName ||!email || !password){
    return res.status(400).json({message:"all fields are require"})
}

    if(password.length<6){
      return res.status(400).json({message:"password must be at least 6 characters"})
    }
    const user=await User.findOne({email})
    if(user) return res.status(400).json({message:"email alredy exists"});
    const salt=await bcrypt.genSalt(10)
    const HashedPassword= await bcrypt.hash(password,salt)
    const newUser=new User({
        fullName,
        email,
        password:HashedPassword
    })
    if(newUser){
        generateToken(newUser._id,res)
        await newUser.save()
        res.status(201).json({
            _id: newUser._id,
            fullName:newUser.fullName,
            email: newUser.email,
            profilepic: newUser.profilepic
        })
    }else{
        return res.status(400).json({message:'invalid user data'})

    }
   
   } catch (error) {
    console.log('error is signup controll',error.message)
    res.status(500).json({message:'internal server error'})
   }
}
export const login= async (req,res)=>{
    const {email,password}=req.body
try {
    const user=await User.findOne({email})
    if(!user){
        return res.status(400).json({message:"user not fount"})
    }
  const isPasswordCorrect= await bcrypt.compare(password,user.password)
  if(!isPasswordCorrect){
    return res.status(400).json({message:"invalide credntiol"})
  }
  generateToken(user._id,res)
res.status(200).json({
    id:user._id,
    fullName:user.fullName,
    email:user.email,
    profilepic:user.profilepic
})
} catch (error) {
    console.log('error in login controll ',error.message)
    res.status(500).json({message:'internal server error'})
}
}

export const logout=async(req,res)=>{
    
try {
    res.cookie('jwt','',{maxAge:0})
    res.status(200).json({message:'logout success fully'})
} catch (error) {
    console.log('error in logout',error.message)
    res.status(500).json({message:"internal server error"})
}
}
export const updateProfile=async(req,res)=>{
try {
    const {profilepic}=req.body;
    const userId=req.user._id;
    if(!profilepic){
        return res.status(400).json({message:'profile pic is required'})
    }
 const upload= await cloudinary.uploader.upload(profilepic)
 const updatedUser=await User.findByIdAndUpdate(userId,{profilepic:upload.secure_url},{new:true})
 res.status(200).json(updatedUser)
} catch (error) {

    console.log('error update profile is',error.message)
    res.status(500).json({message:"internal server error"})
}
}
export const chekAuth= async (req,res)=>{
try {
    res.status(200).json(req.user)
} catch (error) {
    console.log('error update profile is',error.message)
    res.status(500).json({message:"internal server error"})
}
}