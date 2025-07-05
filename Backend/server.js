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
