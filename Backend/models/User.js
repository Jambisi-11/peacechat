
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phCode: { type: String }, 
  profilePic: { type: String }, // URL or base64 string
});



// No pre-save hook for password hashing

module.exports = mongoose.model('User', UserSchema);
