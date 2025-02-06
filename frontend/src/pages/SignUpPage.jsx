import { useState } from "react"
import { useAuthStore } from "../store/useAuthStore"
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react"
import { Link } from "react-router-dom"
import AuthImagePattern from "../component/AuthImagePattern"
import toast from "react-hot-toast"


const SignUpPage = () => {
    const [showPassword,setShowPassword]=useState(false)
    const [formData,setFormData]=useState({
        fullName:'',
        email:'',
        password:''
    })
    const {signup,isSignUp}=useAuthStore()
    const validateForm=()=>{
    if(!formData.fullName.trim()){
       return toast.error('full name is reqiur')
    }
    if(!formData.email.trim()){
        return toast.error('emai is reqiur')
     }
     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

if (!emailRegex.test(formData.email)) {
    return toast.error('Please enter a valid email address');
}
     if(!formData.password.trim()){
        return toast.error('password is reqiur')
     }
     if(formData.password.length<6){
        return toast.error('password must be at leats 6 charachter')
     }
     return true
    }
    const HandleSubmit=(e)=>{
        e.preventDefault()
        if(validateForm())signup(formData);
    }
  return (
    <div className="min-h-screen grid lg: grid-cols-2">
        {/* left side*/ }
        <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
            {/* LOGO */}
            <div className="text-center mb-8 ">
                <div className="flex flex-col items-center gap-2 group">
                    <div
                    className="size-12 rounded-xl  bg-purple-700 flex items-center justify-center group-hover:bg-purple-900 transition-colors" 
                    >
                    <MessageSquare className="size-6 text-purple-200"/>
                    </div>
                    <h1 className="text-2xl font-bold mt-2">Create Account</h1>
                    <p className="text-base">Get started with your free account</p>

                </div>

            </div>
            <form onSubmit={HandleSubmit} className="space-y-6">
  <div className="form-control">
    <label className="label">
      <span className="label-text font-medium">Full Name</span>
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <User className="size-5 text-base-content/40"/>
      </div>
      <input 
        type="text" 
        className="input w-full pl-10 border p-1 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
        placeholder="John Doe"
        value={formData.fullName}
        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
      />
    </div>
  </div>
  <div className="form-control">
    <label className="label">
      <span className="label-text font-medium">email</span>
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Mail className="size-5 text-base-content/40"/>
      </div>
      <input 
        type="text" 
        className="input w-full pl-10 border p-1 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
        placeholder="example@email.com"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
    </div>
  </div>
  <div className="form-control">
    <label className="label">
      <span className="label-text font-medium">Passwrd</span>
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Lock className="size-5 text-base-content/40"/>
      </div>
      <input 
        type={showPassword?"text":'password'}
        className="input w-full pl-10 border p-1 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
        placeholder="******"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button type="button"
       className="absolute inset-y-0 right-0 pr-3 flex items-center"
       onClick={()=>setShowPassword(!showPassword)}
       >
      {
        showPassword?(
            <EyeOff className="size-5 text-base-content/40"/>
        ):(
            <Eye className="size-5 text-base-content/40"/>
        )
      }
      </button>
    </div>
  </div>
  <button type="submit" className="w-full bg-purple-800 text-white py-2 rounded-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
  {isSignUp?(
    <>
    <Loader2 className="size-5 animate-spin"/>
    loding..
    </>
  ):(
    'Create Account'
  )
}
  </button>
</form>
<div className="text-center">
    <p className="text-base-content/60">Already have an account ?{''} <Link to='/login' className="text-blue-500 hover:text-blue-700"> sign in</Link></p>

</div>
        </div>
        </div>

        {/* right side */}
<AuthImagePattern 
title='join our community'
subtitle='connect with frinds ,share moments'
/>
    </div>
  )
}

export default SignUpPage