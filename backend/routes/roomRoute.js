import express from "express";
const router = express.Router();
import { createRoom, joinRoom } from "../controllers/roomController.js";

router.post("/create", createRoom);
router.post("/join", joinRoom);
export default router;
