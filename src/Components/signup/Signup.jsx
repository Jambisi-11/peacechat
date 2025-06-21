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
      localStorage.setItem(
        'user',
        JSON.stringify({
          userId: res.data.userId,
          name: form.name,
          profilePic: form.profilePic,
        })
      );
      navigate('/home');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error signing up.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input name="name" placeholder="Name" onChange={handleChange} value={form.name} />
      <input name="phCode" placeholder="PH-CODE" onChange={handleChange} value={form.phCode} />
      <input name="email" placeholder="Email" onChange={handleChange} value={form.email} />
      <input
        name="password"
        placeholder="Password"
        type="password"
        onChange={handleChange}
        value={form.password}
      />
      <input
        name="profilePic"
        placeholder="Profile Picture URL"
        onChange={handleChange}
        value={form.profilePic}
      />
      <button type="submit">Sign Up</button>
      <p>{message}</p>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </form>
  );
};

export default Signup;
