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


const Menu = () => {

const [showChatLog, SetShowChatLog] = useState(false);
const [showContact, setShowContact] = useState(false);
const [showNotification, setShowNotification] = useState();
const [showCall, setShowCall] = useState();
  return (
    <div className="pt-6 bg-gray-800 h-screen w-16 ">
      <div className="flex flex-col justify-between items-center h-[40em] ">
        <div className=" h-[50%] ">
          <div className="w-8 h-8 m-3">
            <img className="rounded-full " src={Logo} alt="" />
          </div>

          <div className="p-4 h-55 flex flex-col justify-between space-y-4">
            <div className="flex items-center space-x-2 text-green-600">
           
           <div
              onClick={() => SetShowChatLog(!showChatLog)} // ✅ Match the correct setter name
              className="cursor-pointer hover:text-green-400 transition-colors"
            >
              <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
           </div>

            </div>
            <div className="flex items-center space-x-2 text-green-600">
              <UserIcon className="h-6 w-6" />
              <span></span>
            </div>
            <div className="flex items-center space-x-2 text-green-600">
              <BellIcon className="h-6 w-6" />
              <span></span>
            </div>
            <div className="flex items-center space-x-2 text-green-600">
              <PhoneIcon className="h-6 w-6" />
              <span></span>
            </div>
          </div>
         
        </div>
          {/* theme mode and settings */}
        <div className="justify-between">
            <div className="space-x-1 m-6 ">
             <div className="w-12 h-14 gap-6 text-green-500 flex items-center justify-center">
                <SunIcon className="w-6 h-6 " />
              </div>
              <div className="w-12 h-12 text-green-500 flex items-center justify-center">
                <Cog6ToothIcon className="w-6 h-6" />
              </div>
            </div>

            <div>
              <div class="flex justify-center items-center space-y-4">
                <div class="w-8 h-px bg-green-500"></div>
              </div>

              <div className="flex justify-center item-center">
                <img className="mt-6 w-8 border-green-500 rounded-full" src={user} alt="User" />
              </div>
            </div>
        </div>
      </div>
        {/* 👇 ChatLog component rendered when state is true */}
      {showChatLog && (
        <div className="absolute top-0 left-20 z-50">
          <ChatLog />
        </div>
      )}
    </div>
    
  );
};

export default Menu;
