import { MessageSquare } from "lucide-react"

function NoChatSelected() {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-gray-100/50">
        <div className="max-w-md text-center space-y-6">
            {/* icon display */}
            <div className="flex justify-center gap-4 mb-4">
                <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-blue-500 flex items-center justify-center animate-bounce">
                        <MessageSquare className="w-8 h-8 text-blue-700"/>
                    </div>
                </div>
            </div>
            {/* welcome text */}
            <h2 className="text-2xl font-bold">Welcom To Chat App</h2>
            <p className="text-gray-700">
                Select a conversation from the sidebar to start chatting
            </p>
        </div>
    </div>
  )
}

export default NoChatSelected
