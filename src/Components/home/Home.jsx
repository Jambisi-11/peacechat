
// import React, { useState } from "react";
// import Menu from "../Menus/Menu";
// import ChatLog from "../chatLog/ChatLog";
// import Contact from "../Contact/Contact";
// import Notification from "../Notification/Notification";
// import Call from "../Call/Call";
// import Settings from "../Settings/Settings";
// import ChatBody from "../chatBody/Chatbody";

// const Home = ({ darkMode, setDarkMode }) => {
//   const [activeView, setActiveView] = useState("chat"); // default to chat log
//   const [selectedContact, setSelectedContact] = useState(null);

//   const renderMainView = () => {
//     switch (activeView) {
//       case "chat":
//         return <ChatLog onSelectContact={setSelectedContact} />;
//       case "contact":
//         return <Contact onSelectContact={setSelectedContact} />;
//       case "notification":
//         return <Notification />;
//       case "call":
//         return <Call />;
//       case "settings":
//         return <Settings />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
//       <Menu
//         darkMode={darkMode}
//         setDarkMode={setDarkMode}
//         activeView={activeView}
//         setActiveView={setActiveView}
//       />
//       <div className="flex flex-grow">
//         <div className="w-[22em] border-r dark:border-gray-800">
//           {renderMainView()}
//         </div>
//         <div className="flex-grow">
//           {selectedContact ? (
//             <ChatBody contact={selectedContact} />
//           ) : (
//             <div className="h-full flex items-center w-[68em] justify-center text-gray-400">
//               Select a contact to start chatting
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;



import React, { useState } from "react";
import Menu from "../Menus/Menu";
import ChatLog from "../chatLog/ChatLog";
import Contact from "../Contact/Contact";
import Notification from "../Notification/Notification";
import Call from "../Call/Call";
import Settings from "../Settings/Settings";
import ChatBody from "../chatBody/Chatbody";

const Home = ({ darkMode, setDarkMode }) => {
  const [activeView, setActiveView] = useState("chat");
  const [selectedContact, setSelectedContact] = useState(null);

  const renderMainView = () => {
    switch (activeView) {
      case "chat":
        return <ChatLog onSelectContact={setSelectedContact} />;
      case "contact":
        return <Contact onSelectContact={setSelectedContact} />;
      case "notification":
        return <Notification />;
      case "call":
        return <Call />;
      case "settings":
        return <Settings />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      {/* Left Menu */}
      <Menu
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {/* Main View and Chat Body */}
      <div className="flex flex-grow">
        {/* Sidebar panel (ChatLog, Contact, etc.) */}
        <div className="w-[22em] border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
          {renderMainView()}
        </div>

        {/* Chat Body panel */}
        <div className="flex-grow h-screen">
          {selectedContact ? (
            <ChatBody contact={selectedContact} />
          ) : (
            <div className="h-full flex items-center w-[68em] justify-center text-gray-400">
              Select a contact to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
