// import React from 'react'
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
// import Home from './Components/home/Home'
// import ChatBox from './Components/ChatBox/ChatBox'
// import Chatbody from './Components/chatBody/Chatbody'
// import ChatLog from './Components/chatLog/ChatLog'
// import Login from './Components/login/Login'
// import Menu from './Components/Menus/Menu'
// import Signup from './Components/signup/Signup'

// const App = () => {
//    return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/Menu" element={<Menu />} />
//         <Route path="/ChatLog" element={<ChatLog />} />
//         <Route path="/Chatbody" element={<Chatbody />} />
//         <Route path="/ChatBox" element={<ChatBox />} />
//       </Routes>
//     </Router>

//   )
// }

// export default App

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Components/home/Home";
import ChatBox from "./Components/ChatBox/ChatBox";
import Chatbody from "./Components/chatBody/Chatbody";
import ChatLog from "./Components/chatLog/ChatLog";
import Login from "./Components/login/Login";
import Menu from "./Components/Menus/Menu";
import Signup from "./Components/signup/Signup";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Menu" element={<Menu />} />
        <Route path="/ChatLog" element={<ChatLog />} />
        <Route path="/Chatbody" element={<Chatbody />} />
        <Route path="/ChatBox" element={<ChatBox />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
