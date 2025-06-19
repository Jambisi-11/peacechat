


import React, { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

const ChatBody = ({ contact, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Avoid rendering if no contact is provided
  if (!contact) return null;

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

  return (
    <div className="flex mt-0 flex-col w-[68em] h-[41em]">
      {/* Header */}
      <div className=" text-white px-4 py-2 rounded-t flex justify-between">
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
        {/* <h2 className="font-semibold">{contact.name}, {contact.phCode}, {contact.phone}</h2> */}
        <button onClick={onClose} className="text-sm bg-white text-green-500 px-2 py-1 rounded">Close</button>
      </div>

      {/* Messages */}
      <div className="flex-1  p-4 overflow-y-auto space-y-2">
        {messages.map((msg, idx) => (
          <div key={idx} className="flex justify-end">
            <div className="bg-green-500 px-3 text-black py-2 rounded-lg text-sm shadow">
              <p className='text-[18px]'>{msg.text}</p>
              <p className="text-[10px] text-right text-gray-900">{msg.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center p-2 border-green-500 border-t">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-1 border border-green-500 rounded px-3 py-2 mr-2 focus:outline-none"
        />
        {/* <button onClick={sendMessage} className="bg-green-500 text-white px-4 py-2 rounded">Send</button> */}
      <div onClick={sendMessage} className="cursor-pointer relative">
  <PaperAirplaneIcon className="h-6 w-6 text-green-500 hover:text-green-700 -rotate-45" />
</div>
      
      </div>
    </div>
  );
};

export default ChatBody;
