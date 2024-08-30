import dotenv from "dotenv";
dotenv.config();
import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import roomRoutes from "./routes/roomRoute.js";

import connectDb from "./config/db.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.json());
app.use(cors());
app.use("/api/rooms", roomRoutes);

// Database connection
connectDb();

// WebSocket setup for signaling
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("joinRoom", ({ roomId, userId }) => {
    socket.join(roomId);
    io.in(roomId).emit("userJoined", userId);
  });

  socket.on("signal", ({ roomId, signal }) => {
    io.in(roomId).emit("signal", signal);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
