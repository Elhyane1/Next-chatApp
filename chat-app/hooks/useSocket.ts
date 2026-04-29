import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useSession } from "next-auth/react";

export const useSocket = () => {
    const socketRef = useRef<Socket | null>(null);
    const { data: session } = useSession();

    useEffect(() => {
        if (!session?.user?.id) return;

        // const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000");
        const socket = io();
        socketRef.current = socket;

        socket.on("connect", () => {
            socket.emit("join", session.user.id);
        });

        return () => {
            socket.disconnect();
        };
    }, [session?.user?.id]);

    return socketRef;
};