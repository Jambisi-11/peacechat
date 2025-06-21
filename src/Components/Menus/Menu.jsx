import React, { useState, useEffect } from 'react';
import {
  ChatBubbleBottomCenterTextIcon,
  UserIcon,
  BellIcon,
  PhoneIcon,
  Cog6ToothIcon,
  SunIcon,
} from '@heroicons/react/24/solid';
import Logo from '../../assets/logo.png';
import defaultProfilePic from '../../assets/User.png';

const Menu = ({ darkMode, setDarkMode, activeView, setActiveView }) => {
  const [user, setUser] = useState(null);
  const [ProfilePicInput, setProfilePicInput] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('user'));
      setUser(stored);
    } catch {
      setUser(null);
    }
  }, []);

  const handleProfilePicUpdate = async () => {
    if (!ProfilePicInput || !user?.userId) return alert('Please select a file');

    const formData = new FormData();
    formData.append('profilePic', ProfilePicInput);

    try {
      const res = await fetch(`http://localhost:5000/api/upload/${user.userId}`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      const updatedUser = { ...user, profilePic: data.user.profilePic };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert('Failed to upload ProfilePic');
    }
  };

  const menuItems = [
    { icon: ChatBubbleBottomCenterTextIcon, key: 'chat' },
    { icon: UserIcon, key: 'contact' },
    { icon: BellIcon, key: 'notification' },
    { icon: PhoneIcon, key: 'call' },
  ];

  return (
    <div className="flex flex-col items-center justify-between w-16 min-h-screen py-6 bg-white dark:bg-gray-900 border-r dark:border-gray-800">
      {/* Top Logo and Icons */}
      <div>
        <img src={Logo} alt="Logo" className="w-8 h-8 mb-4 ml-2 rounded-full" />
        {menuItems.map(({ icon: Icon, key }) => (
          <div
            key={key}
            onClick={() => setActiveView(key)}
            className={`p-3 my-2 cursor-pointer rounded hover:text-green-500 ${
              activeView === key ? 'text-gray-400 ' : 'text-green-600'
            }`}
          >
            <Icon className="w-6 h-6" />
          </div>
        ))}
      </div>

      {/* Bottom - Theme, Settings, ProfilePic */}
      <div className="flex flex-col items-center space-y-6">
        <SunIcon
          onClick={() => setDarkMode(!darkMode)}
          className="w-6 h-6 cursor-pointer text-green-500"
        />
        <Cog6ToothIcon
          onClick={() => setActiveView('settings')}
          className={`w-6 h-6 cursor-pointer ${
            activeView === 'settings' ? 'text-gray-400' : 'text-green-600'
          }`}
        />
        <img
          src={user?.profilePic ? `http://localhost:5000${user.profilePic}` : defaultProfilePic}
          alt="ProfilePic"
          className="w-8 h-8 mt-4 border-2 border-green-500 rounded-full object-cover cursor-pointer"
          onClick={() => setShowModal(true)}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultProfilePic;
          }}
        />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-2 text-center">Upload Profile Picture</h3>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePicInput(e.target.files[0])}
              className="border p-2 rounded w-full mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600"
                onClick={handleProfilePicUpdate}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
