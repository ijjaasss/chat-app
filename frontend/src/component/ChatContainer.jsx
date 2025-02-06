import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkelton from "./skeltons/MessageSkelton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

function ChatContainer() {
  const { message, getMessage, isMessagesLoding, selectedUsers ,subscribeToMessage,unSubscribeFromMessages} = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef=useRef()

  useEffect(() => {
    getMessage(selectedUsers._id);
    subscribeToMessage()
    return ()=>unSubscribeFromMessages()
  }, [selectedUsers._id, getMessage,subscribeToMessage,unSubscribeFromMessages]);
useEffect(()=>{
  if(messageEndRef.current&&message){
    messageEndRef.current.scrollIntoView({behavior:"smooth"}) 
  }
},[message])
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
      <p className="text-center text-gray-500">Messages</p>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {message.map((messages) => (
          <div 
            key={messages._id}
            className={`flex ${messages.senderId === authUser._id ? 'justify-end' : 'justify-start'} items-start space-x-3`}
            ref={messageEndRef}
          >
            <div className="w-10 h-10 rounded-full border">
              <img 
                src={messages.senderId === authUser._id ? authUser.profilepic || "/image/usericon.png" : selectedUsers.profilepic || "/image/usericon.png"} 
                alt="profilepic" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <div className="text-xs text-gray-500">
                <time>{formatMessageTime(messages.createdAt)}</time>
              </div>
              <div className="flex flex-col space-y-2 p-3 bg-gray-100 rounded-lg max-w-xs">
                {messages.image && (
                  <img 
                    src={messages.image} 
                    alt="attachment" 
                    className="w-full h-auto rounded-md"
                  />
                )}
                {messages.text && <p className="whitespace-pre-wrap">{messages.text}</p>}
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
