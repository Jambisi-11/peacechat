// import React, { useState, useEffect } from 'react';
// import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

// const ChatBody = ({ contact, onClose }) => {
//   const [messagesPerContact, setMessagesPerContact] = useState({});
//   const [input, setInput] = useState('');
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     if (contact) {
//       const existingMessages = messagesPerContact[contact.phone] || [];
//       setMessages(existingMessages);
//     }
//   }, [contact, messagesPerContact]);

//   const sendMessage = () => {
//     if (!input.trim()) return;
//     const newMessage = {
//       text: input,
//       sender: 'You',
//       timestamp: new Date().toLocaleTimeString(),
//     };

//     const updatedMessages = [...messages, newMessage];

//     setMessages(updatedMessages); // update current view
//     setMessagesPerContact((prev) => ({
//       ...prev,
//       [contact.phone]: updatedMessages, // save by phone number
//     }));
//     setInput('');
//   };

//   if (!contact) return null;

//   return (
//     <div className="flex mt-0 flex-col w-[68em] h-[41em]">
//       {/* Header */}
//       <div className="text-white px-4 py-2 rounded-t flex justify-between">
//         <div className="flex items-center gap-3">
//           {contact.image && (
//             <img
//               src={contact.image}
//               alt={contact.name}
//               className="w-10 h-10 rounded-full object-cover"
//             />
//           )}
//           <p className="font-medium">{contact.name}</p>
//         </div>
//         <button onClick={onClose} className="text-sm bg-white text-green-500 px-2 py-1 rounded">Close</button>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 p-4 overflow-y-auto space-y-2">
//         {messages.map((msg, idx) => (
//           <div key={idx} className="flex justify-end">
//             <div className="bg-green-500 px-3 text-black py-2 rounded-lg text-sm shadow">
//               <p className="text-[18px]">{msg.text}</p>
//               <p className="text-[10px] text-right text-gray-900">{msg.timestamp}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Input */}
//       <div className="flex items-center p-2 border-green-500 border-t">
//         <input
//           type="text"
//           placeholder="Type a message..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
//           className="flex-1 border border-green-500 rounded px-3 py-2 mr-2 focus:outline-none"
//         />
//         <div onClick={sendMessage} className="cursor-pointer relative">
//           <PaperAirplaneIcon className="h-6 w-6 text-green-500 hover:text-green-700 -rotate-45" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatBody;

import React, { useState } from 'react';
import {
  PaperAirplaneIcon,
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';

const ChatBody = ({ contact }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage = {
      text: input,
      sender: 'You',
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages([...messages, newMessage]);
    setInput('');
  };

  if (!contact) {
    return (
      <div className="flex-1 flex w-[72em] h-[41em] items-center justify-center border-l dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-400">
        <p className="text-lg">Select a contact to start chatting</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-[68em] h-[40em] bg-white dark:bg-gray-900 border-l dark:border-gray-800">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-2 border-gray-900 dark:border-gray-700  text-white rounded-t">
        {/* Contact Info */}
        <div className="flex items-center gap-3">
          {contact.image && (
            <img
              src={contact.image}
              alt={contact.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <p className="font-medium">{contact.name}</p>
        </div>

        {/* Right Section: Search + Menu */}
        <div className="flex items-center gap-3 relative">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-full px-4 py-1 text-gray-100 text-sm focus:outline-none w-24"
            />
            <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 absolute top-2 right-3" />
          </div>

          {/* Three-Dot Menu */}
          <div className="relative">
            <EllipsisVerticalIcon
              className="h-6 w-6 text-white cursor-pointer hover:text-gray-200"
              onClick={() => setShowMenu(!showMenu)}
            />
            {showMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow-md z-50">
                <ul className="text-sm text-black dark:text-white">
                  <li
                    onClick={() => setMessages([])}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    Clear Chat
                  </li>
                  <li
                    onClick={() => alert('Feature not implemented')}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    Delete Contact
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-2">
        {messages.map((msg, idx) => (
          <div key={idx} className="flex justify-end">
            <div className="bg-green-500 px-3 text-black py-2 rounded-lg text-sm shadow max-w-xs">
              <p className="text-[16px]">{msg.text}</p>
              <p className="text-[10px] text-right text-gray-800">{msg.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center p-3 border-t border-green-500">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-1 border border-green-500 rounded-full px-4 py-2 mr-2 focus:outline-none"
        />
        <div onClick={sendMessage} className="cursor-pointer relative">
          <PaperAirplaneIcon className="h-6 w-6 text-green-500 hover:text-green-700 -rotate-45" />
        </div>
      </div>
    </div>
  );
};

export default ChatBody;
