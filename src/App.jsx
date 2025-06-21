
// App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./Components/home/Home";
import ChatBox from "./Components/ChatBox/ChatBox";
import Chatbody from "./Components/chatBody/Chatbody";
import ChatLog from "./Components/chatLog/ChatLog";
import Login from "./Components/login/Login";
import Menu from "./Components/Menus/Menu";
import Signup from "./Components/signup/Signup";
import Chat from "./Components/Chat/Chat";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const isAuthenticated = !!localStorage.getItem("user");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={isAuthenticated ? "/Home" : "/login"} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/home" element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/menu" element={<Menu darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/chatlog" element={<ChatLog />} />
        <Route path="/chatbody" element={<Chatbody />} />
        <Route path="/chatbox" element={<ChatBox />} />
      </Routes>
    </Router>
  );
};

export default App;
