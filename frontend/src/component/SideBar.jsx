import { useEffect, useState } from "react"
import { useChatStore } from "../store/useChatStore"
import SlidebarSkelton from "./skeltons/SlidebarSkelton"
import { User } from "lucide-react"
import { useAuthStore } from "../store/useAuthStore"

function SideBar() {
    const { getUsers, users, selectedUsers, setSelectUser, isUsersLoding } = useChatStore()
    const [showOnlineOnly, setShowOnlineOnly] = useState(false)
    const { onlineUsers } = useAuthStore()

    useEffect(() => {
        getUsers()
    }, [getUsers])

    if (isUsersLoding) return <SlidebarSkelton />

    const filteruser = showOnlineOnly ? users.filter(user => onlineUsers.includes(user._id)) : users

    return (
        <aside className="h-full w-20 lg:w-72 border-r border-gray-300 flex flex-col transition-all duration-200">
            {/* Top Section */}
            <div className="border-b border-gray-300 w-full p-5">
                <div className="flex items-center gap-2">
                    <User className="size-6" />
                    <span className="font-medium hidden lg:block">Contacts</span>
                </div>
                {/* Online Only Filter */}
                <div className="mt-3 hidden lg:flex items-center gap-2">
                    <label className="cursor-pointer flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={showOnlineOnly}
                            onChange={(e) => setShowOnlineOnly(e.target.checked)}
                            className="h-4 w-4 text-blue-500 border-gray-300 rounded-sm focus:ring-blue-500"
                        />
                        <span className="text-sm">Show only online</span>
                    </label>
                    <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
                </div>
            </div>

            {/* User List Section */}
            <div className="overflow-y-auto w-full py-3">
                {filteruser.map((user) => (
                    <button
                        key={user._id}
                        onClick={() => setSelectUser(user)}
                        className={`
                            w-full p-3 flex items-center gap-3
                            hover:bg-gray-300 transition-colors
                            ${selectedUsers?._id === user._id ? "bg-gray-300 ring-1 ring-gray-300" : ""}
                        `}
                    >
                        <div className="relative mx-auto lg:mx-0">
                            <img
                                src={user.profilepic || "/image/usericon.png"}
                                alt={user.name}
                                className="size-12 object-cover rounded-full"
                            />
                            {onlineUsers.includes(user._id) && (
                                <span
                                    className="absolute bottom-0 right-0 size-3 bg-green-500 
                                    rounded-full ring-2 ring-zinc-900"
                                />
                            )}
                        </div>

                        {/* Name and Status (Visible on larger screens) */}
                        <div className="hidden lg:block text-left min-w-0">
                            <div className="font-medium truncate">{user.fullName}</div>
                            <div className="text-sm text-zinc-400">
                                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                            </div>
                        </div>
                    </button>
                ))}
                {/* No Users Available */}
                {filteruser.length === 0 && (
                    <div className="text-center text-zinc-500 py-4">No Online Users</div>
                )}
            </div>
        </aside>
    )
}

export default SideBar
