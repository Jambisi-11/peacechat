
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from '../Menus/Menu';
import ChatLog from '../chatLog/ChatLog';
import Contact from '../Contact/Contact';
import Notification from '../Notification/Notification';
import Call from '../Call/Call';
import Settings from '../Settings/Settings';
import ChatBody from '../chatBody/Chatbody';

const Home = ({ darkMode, setDarkMode }) => {
  const [activeView, setActiveView] = useState('chat');
  const [selectedContact, setSelectedContact] = useState(null);
  const navigate = useNavigate();

  // ✅ Safe way to parse user from localStorage
  const user = (() => {
    try {
      const raw = localStorage.getItem('user');
      if (raw && raw !== 'undefined') return JSON.parse(raw);
    } catch {
      return null;
    }
  })();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const renderMainView = () => {
    switch (activeView) {
      case 'chat':
        return <ChatLog onSelectContact={setSelectedContact} />;
      case 'contact':
        return <Contact onSelectContact={setSelectedContact} />;
      case 'notification':
        return <Notification />;
      case 'call':
        return <Call />;
      case 'settings':
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
        <div className="w-[21em] dark:border-gray-800 overflow-y-auto">
          {renderMainView()}
        </div>

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

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
