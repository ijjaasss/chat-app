import ChatContainer from "../component/ChatContainer";
// import NoChatSelected from "../component/NoChatSelected";
import SideBar from "../component/SideBar";
import { useChatStore } from "../store/useChatStore";

const HomePage = () => {
  const { selectedUsers } = useChatStore();

  return (
    <div className="h-screen bg-gray-200">
      <div className="flex items-center justify-center pt-16 ">
        <div className="bg-gray-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-4rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            {/* <SideBar /> */}
            {!selectedUsers ? <SideBar /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
