

// import React from "react";
// import { Link } from "react-router-dom";
// import Menu from "../Menus/Menu";

// const Home = () => {
//   return (
//     <div>
//       <Menu/>
//       <Link to="/Menu" className="block text-blue-600 hover:underline">
//         Menu
//       </Link>
//       <Link to="/Chatlog" className="block text-blue-600 hover:underline">
//         Chatlog
//       </Link>
//       <Link to="/Chatbody" className="block text-blue-600 hover:underline">
//         Chatbody
//       </Link>
//       <Link to="/ChatBox" className="block text-blue-600 hover:underline">
//         ChatBox
//       </Link>
//       <Link to="/" className="block text-blue-600 hover:underline">
//         Home
//       </Link>
//     </div>
//   );
// };

// export default Home;

import React from "react";
import { Link } from "react-router-dom";
import Menu from "../Menus/Menu";
import ChatLog from "../chatLog/ChatLog";

const Home = ({ darkMode, setDarkMode }) => {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      {/* ✅ Pass props to Menu */}
      <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
      {/* <ChatLog darkMode={darkMode} setDarkMode={setDarkMode} /> */}
      {/* <Link to="/Menu" className="block text-blue-600 hover:underline">
        Menu
      </Link>
      <Link to="/Chatlog" className="block text-blue-600 hover:underline">
        Chatlog
      </Link>
      <Link to="/Chatbody" className="block text-blue-600 hover:underline">
        Chatbody
      </Link>
      <Link to="/ChatBox" className="block text-blue-600 hover:underline">
        ChatBox
      </Link>
      <Link to="/" className="block text-blue-600 hover:underline">
        Home
      </Link> */}
    </div>
  );
};

export default Home;

