import { Camera, Mail, User } from "lucide-react"
import { useAuthStore } from "../store/useAuthStore"
import { useState } from "react"

const ProfilePage = () => {
    const {authUser,isUpdatingProfile,updateProfile}=useAuthStore()
   const [selectedImage,setSelectedImage]=useState(null)
    const HandleImageUplod=(e)=>{
       const file=e.target.files[0]
  
       if(!file)return;
       const reader=new FileReader()
       reader.readAsDataURL(file)
       reader.onload=async ()=>{
        const base64Image=reader.result
        setSelectedImage(base64Image)
        await updateProfile({profilepic: base64Image})
       }
    }
  return (
    <div className="h-screen pt-20">
        <div className="max-w-2xl mx-auto p-4 py-8">
            <div className="bg-gray-300 rounded-xl p-6 space-y-8">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold">Profile</h1>
                    <p className="mt-2">your profile information</p>
                </div>
                {/* avatar upload section */}
                 <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                        <img 
                        src={selectedImage||authUser.profilepic||'/image/usericon.png'}
                         alt="profile"
                         className="size-32 rounded-full object-cover border-4"
                          />
                          <label 
                          htmlFor="avatar-upload"
                          className={`absolute bottom-0 right-0 bg-gray-800 hover:scale-105
                            p-2 rounded-full cursor-pointer transition-all duration-200
                             ${isUpdatingProfile ?'animate-pulse pointer-events-none':""}
                            `}
                          >
                            <Camera className="w-5 h-5 text-gray-200"/>
                             <input 
                             type="file"
                             id="avatar-upload"
                             className="hidden"
                             accept="image/*"
                             onChange={HandleImageUplod}
                             disabled={isUpdatingProfile}
                              />
                          </label>
                    </div>
                    <p className="text-sm text-zinc-400">
                     {isUpdatingProfile?'uploding':'click the camera icon to update youre photo'}
                    </p>
                 </div>

                 <div className="space-y-6">
                    <div className="space-y-1.5">
                        <div className="text-sm text-zinc-700 flex items-center gap-2">
                            <User className="w-4 h-4"/>
                                  Full name
                        </div>
                        <p className="px-4 py-2.5 bg-gray-200 rounded-lg border">{authUser?.fullName}</p>
                    </div>
                    <div className="space-y-1.5">
                        <div className="text-sm text-zinc-700 flex items-center gap-2">
                            <Mail className="w-4 h-4"/>
                                  Email address
                        </div>
                        <p className="px-4 py-2.5 bg-gray-200 rounded-lg border">{authUser?.email}</p>
                    </div>
                 </div>

                 <div className="mt-6 bg-gray-500 rounded-xl p-6">
                    <h2 className="text-lg font-medium mb-4">Account Information</h2>
                    <div className="space-y-3 text-sm">
                        <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                            <span>Member Since</span>
                            <span>{authUser.createdAt?.split('T')[0]}</span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                           <span>Account Status</span>
                           <span className="text-green-900">Active</span>
                        </div>
                    </div>
                 </div>
                 
            </div>
        </div>
    </div>
  )
}

export default ProfilePage