import { Link } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"
import { LogOut, MessageSquare,  User } from "lucide-react"


const Navbar = () => {
    const {logOut,authUser}=useAuthStore()
  return (
    <header
className=" border-b border-gray-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-gray-100/80"
    >
        <div className="container mx-auto px-4 h-16">
       <div className="flex items-center justify-between h-full">
        <div className="flex items-center gap-8">
        <Link to='/' className="flex items-center gap-2.5 hover:opacity-80 transition-all ">
    <div className="size-9 rounded-lg bg-blue-500  flex items-center justify-center">
        <MessageSquare  className="w-5 h-5 text-blue-900"/>
    </div>
    <h1 className="text-lg font-bold">റഹസ്യമുറി</h1>
    </Link>
        </div>
        <div className="flex items-center gap-2">
            
            {
                authUser&&(
                    <>
                    <Link to='/profilepage' className="px-3 py-1 gap-2">
                    <User className="size-5"/>
                    <span className="hidden sm:inline">Profile</span>
                    </Link>
                    <button className="flex gap-2 items-center" onClick={logOut}>
                        <LogOut className="size-5"/>
                        <span className="hidden sm:inline">logout</span>
                    </button>
                    </>
                )
            }
       </div>
       </div>
      
        </div>

    </header>
  )
}

export default Navbar