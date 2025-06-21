// Chat.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      <h2>Welcome to PeaceChat, {user?.name}!</h2>
      <button onClick={handleLogout}>Logout</button>
      {/* Your chat layout goes here */}
    </div>
  );
};

export default Chat;
