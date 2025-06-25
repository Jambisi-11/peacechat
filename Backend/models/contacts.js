// // models/Contact.js
// const mongoose = require("mongoose");

// const contactSchema = new mongoose.Schema(
//   {
//     name: String,
//     email: String,
//     phone: String,
//     phCode: String,
//     image: String,
//   },
//   { timestamps: true },
// );

// module.exports = mongoose.model("Contact", contactSchema);


const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  image: {
    type: String, // store file path or URL
  },
});

module.exports = mongoose.model('Contact', ContactSchema);
