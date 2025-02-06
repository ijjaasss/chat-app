import { create } from "zustand";
import { axiosInstens } from "../lib/axios.js";
import toast from "react-hot-toast";
import {io} from 'socket.io-client'
const BASE_URL=import.meta.env.MODE=="developement"?'http://localhost:8080':"/"
export const useAuthStore=create((set,get)=>({
    authUser:null,
    isSignUp:false,
    isLoginIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    onlineUsers:[],
    socket:null,
    checkAuth:async ()=>{
        try {
            const res=await axiosInstens.get('/auth/check')
            set({authUser:res.data})
            get().connectSoket()
        } catch (error) {
            set({authUser:null})
            console.log('error in check auth',error)
        }finally{
            set({isCheckingAuth:false})
        }
    },
    signup: async (data)=>{
        set({isSignUp:true})
   try {
   const response= await axiosInstens.post(`/auth/signup`,data)
   console.log(response.data)
   toast.success('account create success fully')
   get().connectSoket()
   set({authUser:response.data})
   } catch (error) {
    console.log(error)
    toast.error(error.response.data.message)
   }finally{
    set({isSignUp:false})
   }
    },
    login:async(data)=>{
       set({isLoginIn:true})
       try {
        const response=await axiosInstens.post('/auth/login',data)
        set({authUser:response.data})
        toast.success('login successfully')
        get().connectSoket()
       } catch (error) {
        toast.error(error.response.data.message)
       }finally{
        set({isLoginIn:false})
       }
    },
    logOut:async ()=>{
try {
    await axiosInstens.post('/auth/logout')
    set({authUser:null})
    toast.success('logged out successfully')
    get().disconnectSoket()
} catch (error) {
    toast.error(error.response.data.message)
}
    },
    updateProfile: async (data)=>{
        set({isUpdatingProfile:true})
        try {
            const res= await axiosInstens.put('/auth/update-profile',data)
            set({authUser:res.data})
            toast.success('profile updated success fully')

        } catch (error) {
            console.log('error in update profile',error)
            toast.error(error.response.data.message)
        }finally{
            set({isUpdatingProfile:false})
        }
    },
    connectSoket: () => {
        const { authUser, socket } = get();
       
        if (!authUser) return;
    
        if (socket && !socket.connected) {
            console.log("Reconnecting socket...");
            socket.connect();
            return;
        }
      
    
        if (!socket) {
            const newSocket = io(BASE_URL, { query: { userID: authUser._id } });
            newSocket.connect();
            set({ socket: newSocket });
    
            newSocket.on('connect', () => {
                console.log('Socket connected:', newSocket.id);
            });
    
            newSocket.on('getOnlineUsers', (userIDS) => {
                console.log('Received online users:', userIDS);
                set({ onlineUsers: userIDS });
            });
        }
    },
    
    
    disconnectSoket: () => {
        const socket = get().socket;
        if (socket && socket.connected) {
            socket.disconnect();
            set({socket: null});
        }
    }
    
}))