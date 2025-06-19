import React, { useState } from "react";
import Logo from "../../assets/logo.png";
import {
  ChatBubbleBottomCenterTextIcon,
  UserIcon,
  BellIcon,
  PhoneIcon,
  Cog6ToothIcon,
  SunIcon,
} from "@heroicons/react/24/solid";
import user from "../../assets/User.png";
import ChatLog from "../chatLog/ChatLog";
import Contact from "../Contact/Contact";
import Notification from "../Notification/Notification"
import Call from "../Call/call"
import Settings from "../Settings/Settings";



const Menu = ({ darkMode, setDarkMode }) => {
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleDarkMode = () => {
    // console.log("toggleDarkMode clicked. darkMode:", darkMode);
    setDarkMode(!darkMode);
  };
// const Menu = () => {




  return (
    <div className="pt-6 w-16 min-h-screen">
      <div className="flex flex-col justify-between items-center h-[40em] ">
        <div className=" h-[50%] ">
          <div className="w-8 h-8 m-3">
            <img className="rounded-full " src={Logo} alt="" />
          </div>

          <div className="p-4 h-55 flex flex-col justify-between space-y-4">
            <div className="flex items-center space-x-2 text-green-600">
           
           <div
              // onClick={() => SetShowChatLog(!showChatLog)} // ✅ Match the correct setter name
              onClick={() => setActiveMenu(activeMenu === 'chat' ? null : 'chat')}

              className="cursor-pointer  hover:text-green-400 transition-colors"
            >
              <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
           </div>

            </div>
            <div className="flex items-center space-x-2 text-green-600">
              <div
                // onClick={() => setShowContact(!showContact)}
                onClick={() => setActiveMenu(activeMenu === 'contact' ? null : 'contact')}
                className="cursor-pointer hover:text-green-400 transition-colors"
              >
                <UserIcon className="h-6 w-6" />
              </div> 
            </div>

            <div className="flex items-center space-x-2 text-green-600">
              <div
                // onClick={() => setShowNotification(!showNotification)}
                onClick={() => setActiveMenu(activeMenu === 'notification' ? null : 'notification')}
                className="cursor-pointer hover:text-green-400 transition-colors"
              >
                <BellIcon className="h-6 w-6" />
              </div>
              
            </div>
            <div className="flex items-center space-x-2 text-green-600">
              <div
                // onClick={() => setShowCall(!showCall)}
                onClick={() => setActiveMenu(activeMenu === 'call' ? null : 'call')}
                className="cursor-pointer hover:text-green-400 transition-colors"
              >
                <PhoneIcon className="h-6 w-6" />
              </div>
              
              
            </div>
          </div>
         
        </div>
          {/* theme mode and settings */}
        <div className="justify-between">
            <div className="space-x-1 m-6 ">
             <div className="w-12 h-14 gap-6 text-green-500 flex items-center justify-center">

                      <div
                        onClick={toggleDarkMode}
                        className="cursor-pointer hover:text-yellow-400 transition-colors"
                      >
                        <SunIcon className="w-6 h-6 text-green-500 dark:text-green-600" />
                      </div>

                {/* <SunIcon className="w-6 h-6 " /> */}
              </div>
              <div className="w-12 h-12 text-green-500 flex items-center justify-center">
                <div
                  // onClick={() => setShowSettings(!showSettings)}
                  onClick={() => setActiveMenu(activeMenu === 'settings' ? null : 'settings')}
                  className="cursor-pointer hover:text-green-400 transition-colors"
                >
                  <Cog6ToothIcon className="w-6 h-6" />
                </div>
                
              </div>
            </div>

            <div>
              <div className="flex justify-center items-center space-y-4">
                <div className="w-8 h-px bg-green-500"></div>
              </div>

              <div className="flex justify-center item-center">
                <img className="mt-6 w-8 border-green-500 rounded-full" src={user} alt="User" />
              </div>
            </div>
        </div>
      </div>
         {/* 👇 ChatLog component rendered when state is true */}
    

      {activeMenu === 'chat' && (
  <div className="absolute top-0 left-16 z-50">
    <ChatLog />
  </div>
)}

{activeMenu === 'contact' && (
  <div className="absolute top-0 left-16 z-50">
    <Contact />
  </div>
)}

{activeMenu === 'notification' && (
  <div className="absolute top-0 left-16 z-50">
    <Notification />
  </div>
)}

{activeMenu === 'call' && (
  <div className="absolute top-0 left-16 z-50">
    <Call />
  </div>
)}

{activeMenu === 'settings' && (
  <div className="absolute top-0 left-20 z-50">
    <Settings />
  </div>
)}

    </div>
    
  );
};

export default Menu;
