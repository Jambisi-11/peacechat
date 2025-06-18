// import React from 'react'
// import { Route } from 'react-router-dom'

// const Home = () => {
//   return (
//      <div className="p-4 space-y-2">
//       <Link to="/Menu">Menu</Link>
//       <Link to="/Chatlog" >Chatlog</Link>
//       <Link to="/Chatbody" >Chatbody</Link>
//       <Link to="/ChatBox" >ChatBox</Link>
//       <Link to="/" >Home</Link>
//     </div>

//   )
// }

// export default Home

import React from "react";
import { Link } from "react-router-dom";
import Menu from "../Menus/Menu";

const Home = () => {
  return (
    <div>
      <Menu/>
      <Link to="/Menu" className="block text-blue-600 hover:underline">
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
      </Link>
    </div>
  );
};

export default Home;
