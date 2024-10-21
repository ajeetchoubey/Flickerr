import { Server } from "socket.io";

let io;

const connectedUsers = new Map();

export const initializeSocket = (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: "*",
            credentials: true
        }
    });

    io.use((socket, next) => {
        const userId = socket.handshake.auth.userId;

        if (!userId) {
            return next(new Error("Invalid user ID"));
        }

        socket.userId = userId;
        next();
    })

    io.on("connection", (socket) => {
        console.log(`Socket connected: ${socket.id}`);
        connectedUsers.set(socket.userId, socket.id)

        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
            connectedUsers.delete(socket.userId)
        })
    })
}

export const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized");
    }

    return io;
}

export const getConnectedUsers = () => {
    return connectedUsers;
}