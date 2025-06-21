
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
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signin', form);
      localStorage.setItem(
        'user',
        JSON.stringify({
          userId: res.data.userId,
          name: res.data.name,
          profilePic: res.data.profilePic // Save profile picture URL
        })
      );
      navigate('/home');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error logging in.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>
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
      <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
        Login
      </button>
      <p className="text-red-500 mt-2">{message}</p>
      <p className="mt-4">
        Don’t have an account? <a href="/signup" className="text-blue-600">Sign up</a>
      </p>
    </form>
  );
};

export default Login;

