

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import {
  PaperAirplaneIcon,
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';

const socket = io('http://localhost:5000'); // Adjust if your backend is hosted elsewhere

const ChatBody = ({ contact, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!contact) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/messages/${contact._id}`);
        setMessages(res.data);
      } catch (err) {
        console.error('Failed to load messages', err);
      }
    };

    fetchMessages();

    // Join socket room
    socket.emit('joinRoom', contact._id);

    // Listen for incoming messages
    socket.on('receiveMessage', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.emit('leaveRoom', contact._id);
      socket.off('receiveMessage');
    };
  }, [contact]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = {
      contactId: contact._id,
      sender: 'You',
      content: input,
    };

    try {
      const res = await axios.post('http://localhost:5000/api/messages', newMessage);
      setMessages((prev) => [...prev, res.data]);
      socket.emit('sendMessage', { room: contact._id, message: res.data });
      setInput('');
    } catch (err) {
      console.error('Failed to send message', err);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col w-[68em] flex-1 h-screen dark:border-gray-700">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-2 text-white rounded-t">
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
        <div className="flex items-center gap-3 relative">
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

          <EllipsisVerticalIcon
            className="h-6 w-6 text-white cursor-pointer hover:text-gray-200"
            onClick={() => setShowMenu(!showMenu)}
          />
          {showMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow-md z-50">
              <ul className="text-sm text-black dark:text-white">
                <li
                  onClick={async () => {
                    try {
                      await axios.delete(`http://localhost:5000/api/messages/${contact._id}`);
                      setMessages([]);
                    } catch (err) {
                      console.error('Failed to clear chat', err);
                    }
                  }}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                >
                  Clear Chat
                </li>
                <li
                  onClick={onClose}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                >
                  Close Chat
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}
          >
            <div className="bg-green-500 px-3 text-black py-2 rounded-lg text-sm shadow max-w-xs">
              <p className="text-[16px]">{msg.content}</p>
              <p className="text-[10px] text-right text-gray-800">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
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
