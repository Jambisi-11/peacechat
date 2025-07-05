

// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import socket from "../../socket"; // import centralized socket instance
// import {
//   PaperAirplaneIcon,
//   EllipsisVerticalIcon,
//   MagnifyingGlassIcon,
// } from "@heroicons/react/24/solid";

// const ChatBody = ({ contact, onClose }) => {
//   const user = JSON.parse(localStorage.getItem("user")); // logged-in user
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [search, setSearch] = useState("");
//   const [showMenu, setShowMenu] = useState(false);
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     if (!contact || !user) return;

//     // Fetch chat history for the selected contact
//     const fetchMessages = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/messages/${contact._id}`
//         );
//         setMessages(res.data);
//       } catch (err) {
//         console.error("Failed to load messages", err);
//       }
//     };

//     fetchMessages();

//     // Join the socket room named after contact ID
//     socket.emit("joinRoom", contact._id);

//     // Listen for incoming messages in this room
//     const handleReceiveMessage = (msg) => {
//       // Convert IDs to strings for safe comparison
//       const msgSender = msg.sender?.toString();
//       const msgReceiver = msg.receiver?.toString();
//       const contactId = contact._id?.toString();
//       const userId = user._id?.toString();

//       // Only add messages relevant to this conversation
//       if (
//         (msgSender === contactId && msgReceiver === userId) ||
//         (msgSender === userId && msgReceiver === contactId)
//       ) {
//         setMessages((prev) => [...prev, msg]);
//       }
//     };

//     socket.on("receiveMessage", handleReceiveMessage);

//     // Cleanup on unmount or when contact/user changes
//     return () => {
//       socket.emit("leaveRoom", contact._id);
//       socket.off("receiveMessage", handleReceiveMessage);
//     };
//   }, [contact, user]);

//   // Send new message
//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const newMessage = {
//       contactId: contact._id,
//       sender: user._id,
//       receiver: contact._id,
//       content: input.trim(),
//       timestamp: new Date(),
//     };

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/messages",
//         newMessage
//       );

//       // Add message to UI
//       setMessages((prev) => [...prev, res.data]);

//       // Emit message to socket room for real-time update
//       socket.emit("sendMessage", { room: contact._id, message: res.data });

//       setInput("");
//     } catch (err) {
//       console.error("Failed to send message", err);
//     }
//   };

//   // Auto-scroll to bottom when messages update
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div className="flex flex-col w-[68em] flex-1 h-screen dark:border-gray-700">
//       {/* Header */}
//       <div className="flex justify-between items-center px-4 py-2 text-white rounded-t bg-gray-800">
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

//         <div className="flex items-center gap-3 relative">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="rounded-full px-4 py-1 text-gray-100 text-sm focus:outline-none w-24 bg-gray-700 placeholder-gray-400"
//             />
//             <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 absolute top-2 right-3" />
//           </div>

//           <EllipsisVerticalIcon
//             className="h-6 w-6 text-white cursor-pointer hover:text-gray-300"
//             onClick={() => setShowMenu((prev) => !prev)}
//           />

//           {showMenu && (
//             <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow-md z-50">
//               <ul className="text-sm text-black dark:text-white">
//                 <li
//                   onClick={async () => {
//                     try {
//                       await axios.delete(
//                         `http://localhost:5000/api/messages/${contact._id}`
//                       );
//                       setMessages([]);
//                       setShowMenu(false);
//                     } catch (err) {
//                       console.error("Failed to clear chat", err);
//                     }
//                   }}
//                   className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
//                 >
//                   Clear Chat
//                 </li>
//                 <li
//                   onClick={() => {
//                     setShowMenu(false);
//                     onClose();
//                   }}
//                   className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
//                 >
//                   Close Chat
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-gray-900">
//         {messages
//           .filter((msg) =>
//             msg.content.toLowerCase().includes(search.toLowerCase())
//           )
//           .map((msg, idx) => (
//             <div
//               key={idx}
//               className={`flex ${
//                 msg.sender.toString() === user._id.toString()
//                   ? "justify-end"
//                   : "justify-start"
//               }`}
//             >
//               <div
//                 className={`px-3 py-2 rounded-lg text-sm shadow max-w-xs ${
//                   msg.sender.toString() === user._id.toString()
//                     ? "bg-green-500 text-black"
//                     : "bg-gray-700 text-white"
//                 }`}
//               >
//                 <p className="text-[16px]">{msg.content}</p>
//                 <p className="text-[10px] text-right text-gray-300">
//                   {new Date(msg.timestamp).toLocaleTimeString()}
//                 </p>
//               </div>
//             </div>
//           ))}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input */}
//       <div className="flex items-center p-3 border-t border-green-500 bg-gray-800">
//         <input
//           type="text"
//           placeholder="Type a message..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           className="flex-1 border border-green-500 rounded-full px-4 py-2 mr-2 focus:outline-none bg-gray-900 text-white placeholder-gray-400"
//         />
//         <div onClick={sendMessage} className="cursor-pointer relative">
//           <PaperAirplaneIcon className="h-6 w-6 text-green-500 hover:text-green-700 -rotate-45" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatBody;



import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import socket from "../../socket"; // centralized socket instance
import {
  PaperAirplaneIcon,
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";

const ChatBody = ({ contact, onClose }) => {
  const user = JSON.parse(localStorage.getItem("user")); // logged-in user
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!contact || !user) return;

    // Create unique room ID by combining user IDs in a consistent order
    const roomId = [user._id, contact._id].sort().join("_");

    // Join the socket room for this conversation
    socket.emit("joinRoom", roomId);

    // Fetch chat history for the selected contact
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/messages/${contact._id}`
        );
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to load messages", err);
      }
    };

    fetchMessages();

    // Listen for incoming messages in this room
    const handleReceiveMessage = (msg) => {
      const msgSender = msg.sender?.toString();
      const msgReceiver = msg.receiver?.toString();
      const contactId = contact._id?.toString();
      const userId = user._id?.toString();

      // Only add messages relevant to this conversation
      if (
        (msgSender === contactId && msgReceiver === userId) ||
        (msgSender === userId && msgReceiver === contactId)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);

    // Cleanup when component unmounts or contact/user changes
    return () => {
      socket.emit("leaveRoom", roomId);
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [contact, user]);

  // Send new message
  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = {
      contactId: contact._id,
      sender: user._id,
      receiver: contact._id,
      content: input.trim(),
      timestamp: new Date(),
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/messages",
        newMessage
      );

      // Add message to UI
      setMessages((prev) => [...prev, res.data]);

      // Emit message to socket room for real-time update
      const roomId = [user._id, contact._id].sort().join("_");
      socket.emit("sendMessage", { room: roomId, message: res.data });

      setInput("");
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col w-[68em] flex-1 h-screen dark:border-gray-700">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-2 text-white rounded-t bg-gray-800">
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
              className="rounded-full px-4 py-1 text-gray-100 text-sm focus:outline-none w-24 bg-gray-700 placeholder-gray-400"
            />
            <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 absolute top-2 right-3" />
          </div>

          <EllipsisVerticalIcon
            className="h-6 w-6 text-white cursor-pointer hover:text-gray-300"
            onClick={() => setShowMenu((prev) => !prev)}
          />

          {showMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow-md z-50">
              <ul className="text-sm text-black dark:text-white">
                <li
                  onClick={async () => {
                    try {
                      await axios.delete(
                        `http://localhost:5000/api/messages/${contact._id}`
                      );
                      setMessages([]);
                      setShowMenu(false);
                    } catch (err) {
                      console.error("Failed to clear chat", err);
                    }
                  }}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                >
                  Clear Chat
                </li>
                <li
                  onClick={() => {
                    setShowMenu(false);
                    onClose();
                  }}
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
      <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-gray-900">
        {messages
          .filter((msg) =>
            msg.content.toLowerCase().includes(search.toLowerCase())
          )
          .map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.sender.toString() === user._id.toString()
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`px-3 py-2 rounded-lg text-sm shadow max-w-xs ${
                  msg.sender.toString() === user._id.toString()
                    ? "bg-green-500 text-black"
                    : "bg-gray-700 text-white"
                }`}
              >
                <p className="text-[16px]">{msg.content}</p>
                <p className="text-[10px] text-right text-gray-300">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex items-center p-3 border-t border-green-500 bg-gray-800">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 border border-green-500 rounded-full px-4 py-2 mr-2 focus:outline-none bg-gray-900 text-white placeholder-gray-400"
        />
        <div onClick={sendMessage} className="cursor-pointer relative">
          <PaperAirplaneIcon className="h-6 w-6 text-green-500 hover:text-green-700 -rotate-45" />
        </div>
      </div>
    </div>
  );
};

export default ChatBody;
