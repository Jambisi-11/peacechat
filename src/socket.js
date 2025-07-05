// src/socket.js
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // ✅ make sure this matches your backend
export default socket;
