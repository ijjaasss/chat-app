import cloudinary from "../lib/cloudnary.js"
import { getReceiverSoketId, io } from "../lib/socket.js"
import Messagee from "../models/message.model.js"
import User from "../models/user.model.js"

export const getUsersForSideBar= async (req,res)=>{
try {
    const loggedInUserId=req.user._id
    const filteruser= await User.find({_id:{$ne:loggedInUserId}}).select("-password")
    res.status(200).json(filteruser)


} catch (error) {
    console.log('get users for sidbar error is',error.message)
    res.status(500).json({message:"internal server error"})
}
}

export const getMessage =async (req,res)=>{
try {
    const { id:userToChatId }=req.params
const myId=req.user._id
const message=await Messagee.find({
    $or:[
        {senderId:myId,resiverId:userToChatId},
        {senderId:userToChatId,resiverId:myId},

    ]
})
res.status(200).json(message)
} catch (error) {
    console.log('messege geting error is',error.message)
    res.status(500).json({message:"internal server error"})
}
}
export const SendMessage=async (req,res)=>{
  try {
    const {text,image}=req.body
    const {id:resiverId}=req.params
    const senderId=req.user._id
    let imagUrl;
    if(image){
        const uploadResponse=await cloudinary.uploader.upload(image)
        imagUrl=uploadResponse.secure_url
    }
    const newMessage= new Messagee({
        senderId,
        resiverId,
        text,
        image:imagUrl
    })
    await newMessage.save()
    const resiverSoketId=getReceiverSoketId(resiverId)
    if(resiverSoketId){
        io.to(resiverSoketId).emit('newMessage',newMessage)
    }
    res.status(201).json(newMessage)
  } catch (error) {
    console.log('error in send messege ',error.message)
    res.status(500).json({message:"internal server error"})
  }
}
