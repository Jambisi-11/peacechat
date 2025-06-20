

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { PencilSquareIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';

// const ChatLog = ({ onSelectContact }) => {
//   const [contactIds, setContactIds] = useState([]);
//   const [contacts, setContacts] = useState([]);

//   // Get contact IDs with messages
//   useEffect(() => {
//     const fetchMessageContacts = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/messages/with-messages/ids');
//         setContactIds(res.data);
//       } catch (err) {
//         console.error('Error fetching message contact IDs:', err);
//       }
//     };
//     fetchMessageContacts();
//   }, []);

//   // Fetch contacts with those IDs
//   useEffect(() => {
//     const fetchContacts = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/contacts');
//         const filtered = res.data.filter(contact =>
//           contactIds.includes(contact._id)
//         );
//         setContacts(filtered);
//       } catch (err) {
//         console.error('Error fetching contacts:', err);
//       }
//     };
//     if (contactIds.length > 0) {
//       fetchContacts();
//     }
//   }, [contactIds]);

//   return (
//     <div className="min-h-screen w-[20em] bg-white text-black dark:bg-gray-900 dark:text-white">
//       <div className="flex justify-between items-center mt-6 px-6">
//         <p className="text-green-500 text-xl">Messages</p>
//         <PencilSquareIcon className="h-5 w-5 text-green-500 hover:text-green-800 cursor-pointer" />
//       </div>

//       <div className="mt-4 px-6 relative">
//         <input
//           type="text"
//           placeholder="Search..."
//           className="w-full pl-10 pr-4 py-2 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//         />
//         <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 ml-6 absolute left-3 top-2.5" />
//       </div>

//       <ul className="mt-4 px-6">
//         {contacts.map(contact => (
//           <li 
//           key={contact._id} 
//           className="mb-2 p-2 border-b border-gray-300 dark:border-gray-700 hover:bg-green-50 dark:hover:bg-green-900 rounded cursor-pointer">
//           onClick={() => onSelectContact(contact)} 
//             <div className="flex items-center gap-3">
//               {contact.image && (
//                 <img
//                   src={contact.image}
//                   alt={contact.name}
//                   className="w-8 h-8 rounded-full object-cover"
//                 />
//               )}
//               <div>
//                 <p className="font-medium">{contact.name}</p>
//                 <p className="text-sm text-gray-500">{contact.phCode}</p>
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ChatLog;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PencilSquareIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const ChatLog = ({ onSelectContact }) => {
  const [contactIds, setContactIds] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/messages/with-messages/ids')
      .then((res) => setContactIds(res.data))
      .catch((err) => console.error('Failed to fetch message contact IDs:', err));
  }, []);

  useEffect(() => {
    if (!contactIds.length) return;
    axios
      .get('http://localhost:5000/api/contacts')
      .then((res) => {
        const filtered = res.data.filter((c) => contactIds.includes(c._id));
        setContacts(filtered);
      })
      .catch((err) => console.error('Failed to fetch contacts:', err));
  }, [contactIds]);

  return (
    <div className="h-screen w-[20em] bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-700 p-6">
   <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-green-600">Messages</h2>
          <PencilSquareIcon className="h-6 w-6 text-green-500 hover:text-green-700 cursor-pointer" />
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>

        {/* Contact List */}
        <ul className="space-y-3">
          {contacts.map((contact) => (
            <li
              key={contact._id}
              onClick={() => onSelectContact(contact)}
              className="w-full border border-gray-200 dark:border-gray-700 p-4 rounded shadow-sm cursor-pointer hover:bg-green-100 dark:hover:bg-green-800 flex items-center gap-3"
            >
              {contact.image && (
                <img
                  src={contact.image}
                  alt={contact.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
              <div className="flex flex-col">
                <p className="font-medium">{contact.name}</p>
                <p className="text-sm text-gray-500">{contact.phCode}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatLog;
