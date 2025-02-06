import { useAuthStore } from "../store/useAuthStore"
import { useChatStore } from "../store/useChatStore"
import { X } from "lucide-react";
function ChatHeader() {
    const { selectedUsers, setSelectUser } = useChatStore();
    const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2.5 border-b border-base-300">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
 
        <div className="avatar">
          <div className="size-10 rounded-full relative">
            <img src={selectedUsers.profilepic || "/image/usericon.png"} alt={selectedUsers.fullName}  className="rounded-full" />
          </div>
        </div>

        <div>
          <h3 className="font-medium">{selectedUsers.fullName}</h3>
          <p className="text-sm text-base-content/70">
            {onlineUsers.includes(selectedUsers._id) ? "Online" : "Offline"}
          </p>
        </div>
      </div>


      <button onClick={() => setSelectUser(null)}>
        <X />
      </button>
    </div>
  </div>
  )
}

export default ChatHeader
