import mongoose from "mongoose";
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Room = mongoose.model("Room", RoomSchema);
