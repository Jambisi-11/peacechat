// import React, { useState } from 'react';
// import {
//   PencilSquareIcon,
//   MagnifyingGlassIcon,
//   UserIcon,
//   PlusIcon,
// } from '@heroicons/react/24/solid';

// const Contact = () => {
//   const [contacts, setContacts] = useState([]);
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [email, setEmail] = useState('');
//   const [phCode, setPhCode] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);


//   const handleAddContact = (e) => {
//     e.preventDefault();
//     if (!name || !phone || !email || !phCode) {
//       alert('Please fill in all fields');
//       return;
//     }

//     const newContact = {
//       name,
//       phone: `${phCode} ${phone}`,
//       email,
//     };

//     setContacts([...contacts, newContact]);
//     setName('');
//     setPhone('');
//     setEmail('');
//     setPhCode('');
//   };

//   return (
//     <div className="min-h-screen flex gap-18 m-0 w-[18em] bg-white text-black dark:bg-gray-900 dark:text-white flex justify-center p-6">
//       <div className="w-full max-w-md">
//         <div className='flex gap-26'>
//           <h2 className="text-2xl font-bold mb-6 text-green-600">Contacts</h2>
        
//         <div>
//             {/* Add Contact Icon */}
//           <div onClick={() => setIsModalOpen(true)} className="flex items-center mb-4">
            
//             <div className="relative">
//               <UserIcon className="h-6 w-6 text-green-500  hover:text-green-800 cursor-pointer" />
//               <PlusIcon className="h-3 w-3 text-green-600 absolute -top-1 -right-1 rounded-full shadow-sm" />
//             </div>
//           </div>
//         </div>
//         </div>
//         {/* Search Bar */}
//         <div className="relative mb-6">
//           <input
//             type="text"
//             placeholder="Search..."
//             className="w-full pl-10 pr-4 py-2 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//           />
//           <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
//         </div>

      
          
//         {/* Contact Form */}
//         {isModalOpen && (

//         <form onSubmit={handleAddContact} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Full Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <input
//             type="text"
//             placeholder="PH-Code (e.g., +63)"
//             value={phCode}
//             onChange={(e) => setPhCode(e.target.value)}
//             className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <input
//             type="tel"
//             placeholder="Phone Number"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <input
//             type="email"
//             placeholder="Email Address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition"
//           >
//             Add Contact
//           </button>
//         </form>

//         {/* Saved Contacts */}
//         <h3 className="text-xl font-semibold mt-8 mb-3">Saved Contacts</h3>
//         <ul className="space-y-3">
//           {contacts.map((contact, index) => (
//             <li
//               key={index}
//               className="border border-gray-200 p-4 rounded shadow-sm dark:border-gray-700"
//             >
//               <p>
//                 <span className="font-semibold">Name:</span> {contact.name}
//               </p>
//               <p>
//                 <span className="font-semibold">Phone:</span> {contact.phone}
//               </p>
//               <p>
//                 <span className="font-semibold">Email:</span> {contact.email}
//               </p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Contact;


import React, { useState } from 'react';
import {
  PencilSquareIcon,
  MagnifyingGlassIcon,
  UserIcon,
  PlusIcon,
} from '@heroicons/react/24/solid';

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [phCode, setPhCode] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddContact = (e) => {
    e.preventDefault();
    if (!name || !phone || !email || !phCode) {
      alert('Please fill in all fields');
      return;
    }

    const newContact = {
      phCode,
      name,
      phone,
      email,
    };

    setContacts([...contacts, newContact]);
    setName('');
    setPhone('');
    setEmail('');
    setPhCode('');
    setIsModalOpen(false); // close modal
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white flex justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-green-600">Contacts</h2>
          <div onClick={() => setIsModalOpen(true)} className="cursor-pointer relative">
            <UserIcon className="h-6 w-6 text-green-500 hover:text-green-700" />
            <PlusIcon className="h-3 w-3 text-green-600 absolute -top-1 -right-1 bg-white rounded-full shadow-sm" />
          </div>
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
        <h3 className="text-xl font-semibold mt-4 mb-3">Saved Contacts</h3>
        <ul className="space-y-3">
          {contacts.map((contact, index) => (
            <li
              key={index}
              className="border border-gray-200 p-4 rounded shadow-sm dark:border-gray-700"
            >
              {/* <p><span className="font-semibold">Name:</span> {contact.phCode}</p> */}
              <p><span className="font-semibold"></span> {contact.name}</p>
              {/* <p><span className="font-semibold">Phone:</span> {contact.phone}</p>
              <p><span className="font-semibold">Email:</span> {contact.email}</p> */}
            </li>
          ))}
        </ul>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed w- inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white  dark:bg-gray-900 rounded-lg shadow-lg   p-6 w-90 max-w-md">
            <h2 className="text-xl font-semibold text-green-500 mb-4">Add Contact</h2>
            <form onSubmit={handleAddContact} className="space-y-4 flex flex-col items-center justify-center">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-65 border  border-green-300 rounded  px-4 py-2"
              />
              <input
                type="text"
                placeholder="PH-Code (e.g., +63)"
                value={phCode}
                onChange={(e) => setPhCode(e.target.value)}
                className="w-65 border border-green-300 rounded px-4 py-2"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-65 border border-green-300 rounded px-4 py-2"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-65 border border-green-300 rounded px-4 py-2"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded border text-green-500 border-green-300 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px- py-2 bg-blue-500 text-green-500 rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
