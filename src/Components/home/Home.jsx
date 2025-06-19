
import React from "react";
import Menu from "../Menus/Menu";
import ChatLog from "../chatLog/ChatLog";
import ChatBody from "../chatBody/Chatbody";

const Home = ({ darkMode, setDarkMode }) => {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white flex">
      {/* Flex children: left side = Menu, right side = ChatLog */}
      <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
      <ChatLog darkMode={darkMode} setDarkMode={setDarkMode} />
      <ChatBody darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
};

export default Home;
