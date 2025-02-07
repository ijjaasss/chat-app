import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkelton from "./skeltons/MessageSkelton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

function ChatContainer() {
  const { message, getMessage, isMessagesLoding, selectedUsers, subscribeToMessage, unSubscribeFromMessages } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef();

  useEffect(() => {
    getMessage(selectedUsers._id);
    subscribeToMessage();
    return () => unSubscribeFromMessages();
  }, [selectedUsers._id, getMessage, subscribeToMessage, unSubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && message) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);

  if (isMessagesLoding) return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <MessageSkelton />
      <MessageInput />
    </div>
  );

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
   
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {message.map((messages) => (
          <div 
            key={messages._id}
            className={`flex items-start ${messages.senderId === authUser._id ? 'justify-end' : 'justify-start'} space-x-3`}
            ref={messageEndRef}
          >
            {/* Avatar (behind the message bubble) */}
            <div className="relative w-10 h-10">
              <img 
                src={messages.senderId === authUser._id ? authUser.profilepic || "/image/usericon.png" : selectedUsers.profilepic || "/image/usericon.png"} 
                alt="profilepic" 
                className="absolute top-0 left-0 w-full h-full object-cover rounded-full z-0"
              />
            </div>
            
            {/* Message Bubble */}
            <div className={`relative flex flex-col space-y-2 p-3 rounded-lg ${messages.senderId === authUser._id ? 'bg-blue-500 text-white self-end' : 'bg-green-500 text-white self-start'} max-w-xs z-10`}>
              <div className="whitespace-pre-wrap">{messages.text}</div>
              {messages.image && (
                <img 
                  src={messages.image} 
                  alt="attachment" 
                  className="w-full h-auto rounded-md"
                />
              )}
              
              {/* Message Timestamp inside the bubble */}
              <div className={`text-xs text-gray-300 mt-1 ${messages.senderId === authUser._id ? 'self-end text-right' : 'self-start text-left'}`}>
                <time>{formatMessageTime(messages.createdAt)}</time>
              </div>
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
}

export default ChatContainer;
