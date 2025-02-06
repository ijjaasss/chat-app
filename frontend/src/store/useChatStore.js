
import { create } from "zustand";
import { axiosInstens } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore= create((set,get)=>({
    message:[],
    users:[],
    selectedUsers:null,
    isUsersLoding:false,
    isMessagesLoding:false,
    getUsers:async()=>{
    set({isUsersLoding:true})
    try {
        const res=await axiosInstens.get(`/message/users`)

        set({users:res.data})
    } catch (error) {
      toast.error(error.response.data.message)
    }finally{
        set({isUsersLoding:false})
    }
    },
    getMessage:async (userId)=>{
  set({isMessagesLoding:true})
  try {
    const response=await axiosInstens.get(`message/${userId}`);
    set({message:response.data})
  } catch (error) {
    toast.error(error.response.data.message)
  }finally{
    set({isMessagesLoding:false})
  }
    },
    sendMessage:async (messageData)=>{
const {message,selectedUsers}=get()
try {
  const res=await axiosInstens.post(`/message/send/${selectedUsers._id}`,messageData)
  set({message:[...message,res.data]})
} catch (error) {
  toast.error(error.response.data.message)
}
    },
    subscribeToMessage:()=>{
const {selectedUsers}=get()
if(!selectedUsers)return;
const socket=useAuthStore.getState().socket
socket.on('newMessage',(newMessage)=>{

  if(newMessage.senderId!==selectedUsers._id)return;
  set({
    message:[...get().message,newMessage]
  })
})
    },
    unSubscribeFromMessages:()=>{
      const socket=useAuthStore.getState().socket
      socket.off('newMessage')
    },

    setSelectUser:async (selectedUsers)=>{
      set({selectedUsers})
    }
}))