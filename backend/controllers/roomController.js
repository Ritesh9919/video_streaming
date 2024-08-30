import { Room } from "../models/Room.js";

export const createRoom = async (req, res) => {
  const { name } = req.body;
  const room = new Room({ name });
  await room.save();
  res.status(201).json(room);
};

export const joinRoom = async (req, res) => {
  const { roomId } = req.body;
  const room = await Room.findById(roomId);
  if (room) {
    res.status(200).json(room);
  } else {
    res.status(404).json({ message: "Room not found" });
  }
};
