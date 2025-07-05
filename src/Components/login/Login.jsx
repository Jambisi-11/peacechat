import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('🧪 Logging in with:', form);

    try {
      const res = await axios.post('http://localhost:5000/api/auth/signin', form);

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
      console.error('❌ Login failed:', err.response?.data || err.message);
      setMessage(err.response?.data?.message || 'Error logging in.');
    }
    console.log("🔑 Provided password:", password);
console.log("🔒 Stored hash:", user.password);
console.log("🔍 Is match:", isMatch);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-green-100">
      <form
        onSubmit={handleSubmit}
        className="max-w-sm w-full p-6 bg-green-500 rounded shadow"
      >
        <h2 className="text-xl font-bold mb-4 text-white text-center">Login</h2>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={form.password}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800"
        >
          Login
        </button>
        {message && <p className="text-red-500 mt-2 text-center">{message}</p>}
        <p className="mt-4 text-center text-white">
          Don’t have an account?{' '}
          <a href="/signup" className="text-blue-200 underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
  
};

export default Login;
