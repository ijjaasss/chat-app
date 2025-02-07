import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

function ChatHeader() {
  const { selectedUsers, setSelectUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2.5 border-b border-gray-300">
      <div className="flex items-center justify-between gap-4 sm:gap-6 md:gap-8">
        {/* Profile Pic and Info */}
        <div className="flex items-center gap-3 md:gap-4 flex-wrap sm:flex-nowrap">
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUsers.profilepic || "/image/usericon.png"}
                alt={selectedUsers.fullName}
                className="rounded-full"
              />
            </div>
          </div>

          {/* User Info (name and online/offline status) */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:ml-4">
            <h3 className="font-medium text-base">{selectedUsers.fullName}</h3>
            <p className="text-sm text-base-content/70 sm:ml-2">
              {onlineUsers.includes(selectedUsers._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
}

export default ChatHeader;
