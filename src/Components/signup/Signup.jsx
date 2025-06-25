// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Signup = () => {
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     password: '',
//     phCode: '',
//     profilePic: '',
//   });
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/auth/signup', form);
//       localStorage.setItem(
//         'user',
//         JSON.stringify({
//           userId: res.data.userId,
//           name: form.name,
//           profilePic: form.profilePic,
//         })
//       );
//       navigate('/home');
//     } catch (err) {
//       setMessage(err.response?.data?.message || 'Error signing up.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Sign Up</h2>
//       <input name="name" placeholder="Name" onChange={handleChange} value={form.name} />
//       <input name="phCode" placeholder="PH-CODE" onChange={handleChange} value={form.phCode} />
//       <input name="email" placeholder="Email" onChange={handleChange} value={form.email} />
//       <input
//         name="password"
//         placeholder="Password"
//         type="password"
//         onChange={handleChange}
//         value={form.password}
//       />
//       <input
//         name="profilePic"
//         placeholder="Profile Picture URL"
//         onChange={handleChange}
//         value={form.profilePic}
//       />
//       <button type="submit">Sign Up</button>
//       <p>{message}</p>
//       <p>
//         Already have an account? <a href="/login">Login</a>
//       </p>
//     </form>
//   );
// };

// export default Signup;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phCode: '',
    profilePic: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', form);

      // ✅ Store user using `_id` key for consistency
      localStorage.setItem(
        'user',
        JSON.stringify({
          _id: res.data.userId,
          name: res.data.name,
          profilePic: res.data.profilePic,
        })
      );

      navigate('/home');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error signing up.');
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-green-500">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 bg- rounded shadow flex flex-col"
      >
        <h2 className="text-xl font-bold mb-4 text-center text-green-700">Sign Up</h2>
        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          value={form.name}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          name="phCode"
          placeholder="Phone Code"
          onChange={handleChange}
          value={form.phCode}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={form.password}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          name="profilePic"
          placeholder="Profile Picture URL"
          onChange={handleChange}
          value={form.profilePic}
          className="w-full p-2 mb-3 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Sign Up
        </button>
        <p className="text-red-500 mt-2 text-center">{message}</p>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
