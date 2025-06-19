

// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Home from "./Components/home/Home";
// import ChatBox from "./Components/ChatBox/ChatBox";
// import Chatbody from "./Components/chatBody/Chatbody";
// import ChatLog from "./Components/chatLog/ChatLog";
// import Login from "./Components/login/Login";
// import Menu from "./Components/Menus/Menu";
// import Signup from "./Components/signup/Signup";

// const App = () => {
//   const [darkMode, setDarkMode] = useState(false);

//   // Apply dark class to <html>
//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [darkMode]);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route
//           path="/Menu"
//           element={<Menu darkMode={darkMode} setDarkMode={setDarkMode} />}
//         />
//         <Route
//   path="/"
//   element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />}
// />

//         <Route path="/ChatLog" element={<ChatLog />} />
//         <Route path="/Chatbody" element={<Chatbody />} />
//         <Route path="/ChatBox" element={<ChatBox />} />
//         <Route path="/Login" element={<Login />} />
//         <Route path="/Signup" element={<Signup />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Components/home/Home";
import ChatBox from "./Components/ChatBox/ChatBox";
import Chatbody from "./Components/chatBody/Chatbody";
import ChatLog from "./Components/chatLog/ChatLog";
import Login from "./Components/login/Login";
import Menu from "./Components/Menus/Menu";
import Signup from "./Components/signup/Signup";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

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
        <Route path="/" element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/Menu" element={<Menu darkMode={darkMode} setDarkMode={setDarkMode} />} />
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
