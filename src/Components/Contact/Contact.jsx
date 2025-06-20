import React, { useState, useEffect } from 'react';
import {
  PencilSquareIcon,
  MagnifyingGlassIcon,
  UserIcon,
  PlusIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/solid';
import ChatBody from '../chatBody/Chatbody';
import axios from 'axios';

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [phCode, setPhCode] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result); // base64 string
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleAddContact = async (e) => {
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
      image,
    };

    try {
      const res = await axios.post('http://localhost:5000/api/contacts', newContact);
      setContacts([...contacts, res.data]); // Add saved contact to state
      setName('');
      setPhone('');
      setEmail('');
      setPhCode('');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save contact:', error);
      alert('Failed to save contact.');
    }
  };

  const handleEditContact = (e) => {
    e.preventDefault();

    const updatedContacts = [...contacts];
    updatedContacts[editIndex] = { name, phone, email, phCode, image };
    setContacts(updatedContacts);

    setIsEditModalOpen(false);
    setName('');
    setPhone('');
    setEmail('');
    setPhCode('');
    setEditIndex(null);
  };

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/contacts');
        setContacts(res.data);
      } catch (err) {
        console.error('Failed to fetch contacts', err);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white flex justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font- text-green-600">Contacts</h2>
          <div onClick={() => setIsModalOpen(true)} className="cursor-pointer relative">
            <UserIcon className="h-6 w-6 text-green-500 hover:text-green-700" />
            <PlusIcon className="h-3 w-3 text-green-600 absolute -top-1 -right-1  rounded-full shadow-sm" />
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
        <h3 className="text-xl font- mt-4 mb-3">Saved Contacts</h3>
        <ul className="space-y-3">
          {contacts.map((contact, index) => (
            <li
              key={index}
              className="border border-gray-200 p-4 rounded shadow-sm dark:border-gray-700"
            >
              <div className="flex justify-between">
                <div onClick={() => setSelectedContact(contact)} className="cursor-pointer">
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

                  {/* <p><span className="font-semibold">Name:</span> {contact.phCode}</p> */}
                  {/* <p><span className="font-semibold"></span>{contact.image} {contact.name}</p> */}
                  {/* <p><span className="font-semibold">Phone:</span> {contact.phone}</p>
              <p><span className="font-semibold">Email:</span> {contact.email}</p> */}
                </div>

                <div>
                  <EllipsisVerticalIcon
                    className="h-5 w-5 text-green-500 hover:text-gray-500 cursor-pointer"
                    onClick={() => {
                      const contact = contacts[index];
                      setName(contact.name);
                      setPhone(contact.phone);
                      setEmail(contact.email);
                      setPhCode(contact.phCode);
                      setEditIndex(index);
                      setIsEditModalOpen(true);
                    }}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed w- inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white  dark:bg-gray-900 rounded-lg shadow-lg   p-6 w-90 max-w-md">
            <h2 className="text-xl font-semibold text-green-500 mb-4">Add Contact</h2>
            <form
              onSubmit={handleAddContact}
              className="space-y-4 flex flex-col items-center justify-center"
            >
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
              {/* <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
                className="w-65 border border-green-300 rounded px-4 py-2"
              /> */}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
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
      {isEditModalOpen && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-90 max-w-md">
            <h2 className="text-xl font-semibold text-green-500 mb-4">Edit Contact</h2>
            <form
              onSubmit={handleEditContact}
              className="space-y-4 flex flex-col items-center justify-center"
            >
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-65 border border-green-300 rounded px-4 py-2"
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

              {/* <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
                className="w-65 border border-green-300 rounded px-4 py-2"
              /> */}

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-65 border border-green-300 rounded px-4 py-2"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded border text-green-500 border-green-300 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white text-green-500 rounded hover:bg-blue-600"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {selectedContact && (
        <div className="ml-18">
          <div className="">
            <ChatBody contact={selectedContact} onClose={() => setSelectedContact(null)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
