import express from "express"
import { protectRoute } from "../middleware/auth.js";
import { getConversation, sendMessage } from "../controllers/messageController.js";

const router = express.Router()

router.post("/send",protectRoute, sendMessage);
router.get("/conversation/:userId", protectRoute, getConversation);

export default router