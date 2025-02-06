function MessageSkelton() {
    const skeletonMessages = Array(6).fill(null);
  
    return (
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {skeletonMessages.map((_, idx) => (
          <div key={idx} className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"}`}>
            <div className="chat-image avatar">
              <div className="w-12 h-12 rounded-full bg-gray-300 animate-pulse">
              </div>
            </div>
  
            <div className="chat-header mb-2">
              <div className="h-4 w-24 bg-gray-300 animate-pulse" />
            </div>
  
            <div className="chat-bubble bg-transparent p-0">
              <div className="h-16 w-[240px] bg-gray-300 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  export default MessageSkelton;
  