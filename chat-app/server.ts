import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { Server } from "socket.io";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();


// Track online users: userId -> socketId
const onlineUsers = new Map<string, string>();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(server, {
    cors: {
      origin: process.env.NEXT_PUBLIC_APP_URL || `http://localhost:3000`,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    // ============================================
    // JOIN / AUTHENTICATE
    // ============================================
    socket.on("join", (userId: string) => {
      onlineUsers.set(userId, socket.id);
      socket.data.userId = userId;
      console.log(`User ${userId} is online`);
    });

    // ============================================
    // SEND MESSAGE
    // ============================================
    socket.on("send_message", async (data: {
      roomId: string;
      content: string;
      receiverId: string;
    }) => {
      const senderId = socket.data.userId;
      if (!senderId) {
        return
      };

      // Save to database
      const message = await prisma.message.create({
        data: {
          content: data.content,
          senderId,
          roomId: data.roomId,
        },
        include: {
          sender: {
            select: { id: true, name: true},
          },
        },
      });

      // Update room's updatedAt
      await prisma.room.update({
        where: { id: data.roomId },
        data: { updatedAt: new Date() },
      });

      // Emit to sender (confirmation)
      socket.emit("message_sent", message);

      // Emit to receiver if online
      const receiverSocketId = onlineUsers.get(data.receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receive_message", message);
      }
    });

    // ============================================
    // TYPING INDICATOR
    // ============================================
    socket.on("typing", (data: { roomId: string; receiverId: string }) => {
      const receiverSocketId = onlineUsers.get(data.receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("user_typing", {
          roomId: data.roomId,
          userId: socket.data.userId,
        });
      }
    });

    socket.on("stop_typing", (data: { roomId: string; receiverId: string }) => {
      const receiverSocketId = onlineUsers.get(data.receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("user_stopped_typing", {
          roomId: data.roomId,
          userId: socket.data.userId,
        });
      }
    });

    // ============================================
    // DISCONNECT
    // ============================================
    socket.on("disconnect", () => {
      const userId = socket.data.userId;
      if (userId) {
        onlineUsers.delete(userId);
        console.log(`User ${userId} disconnected`);
      }
    });
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});