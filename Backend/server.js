

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();
// const http = require("http");
// const { Server } = require("socket.io");

// const app = express();
// const port = process.env.PORT || 5000;

// // HTTP server for socket.io
// const server = http.createServer(app);

// // Setup socket.io
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173", // your frontend URL
//     methods: ["GET", "POST"],
//   },
// });

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // Routes
// const contactRoutes = require("./routes/contactRoutes");
// app.use("/api/contacts", contactRoutes);

// const messageRoutes = require("./routes/messageRoutes");
// app.use("/api/messages", messageRoutes);

// const authRoutes = require("./routes/auth");
// app.use("/api/auth", authRoutes);

// const uploadRoutes = require("./routes/upload");
// app.use("/api/upload", uploadRoutes);

// // Serve uploaded profile pictures
// app.use("/uploads", express.static("uploads"));

// // 🔌 Socket.io connection
// io.on("connection", (socket) => {
//   console.log("🟢 A user connected:", socket.id);

//   // Listen for messages
//   socket.on("send_message", (data) => {
//     console.log("📨 Message received:", data);

//     // Broadcast to all clients
//     io.emit("receive_message", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("🔴 A user disconnected:", socket.id);
//   });
// });

// // Start the server using `server.listen` instead of `app.listen`
// server.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const port = process.env.PORT || 5000;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

// ✅ MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ ROUTES
const contactRoutes = require("./routes/contacts"); // ✅ Un-commented
const messageRoutes = require("./routes/messageRoutes");
const authRoutes = require("./routes/auth");
const uploadRoutes = require("./routes/upload");

app.use("/api/contacts", contactRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/uploads", express.static("uploads")); // static image access

// ✅ Socket.IO logic
io.on("connection", (socket) => {
  console.log("🟢 A user connected:", socket.id);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`🔗 Socket ${socket.id} joined room: ${roomId}`);
  });

  socket.on("leaveRoom", (roomId) => {
    socket.leave(roomId);
    console.log(`❌ Socket ${socket.id} left room: ${roomId}`);
  });

  socket.on("sendMessage", async ({ room, message }) => {
    console.log("📨 Message received:", message);

    try {
      const Message = require("./models/Message");
      const newMessage = new Message(message);
      await newMessage.save();
    } catch (err) {
      console.error("❌ Error saving message to DB:", err);
    }

    io.to(room).emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("🔴 A user disconnected:", socket.id);
  });
});

server.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
