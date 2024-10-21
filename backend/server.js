import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"

import authRoutes from "./routes/authRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import matchRoutes from "./routes/matchRoutes.js"
import { connectDB } from "./config/db.js"
import { createServer } from "http"
import { initializeSocket } from "./socket/socket.server.js"
import path from "path"

dotenv.config();

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

initializeSocket(httpServer)

app.use(cookieParser())
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

httpServer.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
    connectDB();
})