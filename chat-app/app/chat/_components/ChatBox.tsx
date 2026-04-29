'use client'
import Input from './Input';
import { useEffect, useRef, useState } from 'react';
import { Room, Message } from '@/types';
import { getMessages } from '@/lib/api';
import { useSession } from 'next-auth/react';
import { useSocket } from '@/hooks/useSocket';

// interface Message {
//     id: number;
//     sender: string;
//     text: string;
//     time: string;
//     isMine: boolean;
// }

interface ChatBoxProps {
    room: Room | null;
}

export default function ChatBox({ room }: ChatBoxProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const socketRef = useSocket();
    const { data: session } = useSession();
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!room) {
            setMessages([]);
            return;
        }

        setLoading(true);
        getMessages(room.id)
            .then(setMessages)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [room, room?.id]);

    // const otherUser = room
    //     ? room.userA.id === session?.user?.id
    //         ? room.userB
    //         : room.userA
    //     : null;

    const handleSendMessage = (text: string) => {
        const socket = socketRef.current;
        if (!(text.trim()) || !socket || !room || !session?.user?.id) {
            console.log("something is messing!")
            return
        };

        const otherUser =
            room.userA.id === session.user.id ? room.userB : room.userA;

        socket.emit("send_message", {
            roomId: room.id,
            content: text.trim(),
            receiverId: otherUser.id,
        },
        setLoading(true),
        getMessages(room.id)
            .then(setMessages)
            .catch(console.error)
            .finally(() => setLoading(false))
    );}


        

        //     const [messages, setMessages] = useState([
        //     { id: 1, sender: 'alex-chen', text: "yo! did you see that new design?", time: "2:34 PM", isMine: false },
        //     { id: 2, sender: 'me', text: "yeah it's wild! love the brutalist vibes", time: "2:35 PM", isMine: true },
        //     { id: 3, sender: 'alex-chen', text: "right?? those chunky shadows are 🔥", time: "2:35 PM", isMine: false },
        //     { id: 4, sender: 'me', text: "totally different from the usual clean minimal stuff. refreshing", time: "2:36 PM", isMine: true },
        //     { id: 5, sender: 'alex-chen', text: "want to collaborate on something similar?", time: "2:37 PM", isMine: false },
        //   ]);

        //       const handleSendMessage = (text: string) => {
        //     const newMessage = {
        //       id: messages.length + 1,
        //       sender: 'me',
        //       text,
        //       time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        //       isMine: true,
        //     };
        //     setMessages([...messages, newMessage]);
        //   };

        const scrollToBottom = () => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        };

        useEffect(() => {
            scrollToBottom();
        }, [messages]);

        if (!room) return null

        return (
            <main className="flex-1 flex flex-col relative">

                <div className="flex-1 px-8 py-6">
                    {/* Chat header */}
                    <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b-4 border-border pb-4 mb-6 -mx-8 px-8 z-10">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-primary uppercase mb-1"
                                    style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem' }}>
                                    Alex Chen
                                </h2>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                    <span className="text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-mono)' }}>
                                        online • last seen just now
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="w-12 h-12 bg-card border-2 border-border hover:bg-muted hover:shadow-[6px_6px_0_0_rgba(255,157,61,0.5)] transition-all shadow-[4px_4px_0_0_rgba(0,0,0,0.3)]">
                                    <span className="text-xl">📞</span>
                                </button>
                                <button className="w-12 h-12 bg-card border-2 border-border hover:bg-muted hover:shadow-[6px_6px_0_0_rgba(255,157,61,0.5)] transition-all shadow-[4px_4px_0_0_rgba(0,0,0,0.3)]">
                                    <span className="text-xl">🎥</span>
                                </button>
                                <button className="w-12 h-12 bg-card border-2 border-border hover:bg-muted hover:shadow-[6px_6px_0_0_rgba(255,157,61,0.5)] transition-all shadow-[4px_4px_0_0_rgba(0,0,0,0.3)]">
                                    <span className="text-xl">⋮</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="space-y-6">
                        {loading ? (
                            <div className="text-center text-gray-500">Loading messages...</div>
                        ) : messages.length === 0 ? (
                            <div className="text-center text-gray-400">No messages yet</div>
                        ) : (messages.map((message, index) => (
                            <div
                                key={message.id}
                                className={`flex gap-3 ${(message.senderId === session?.user.id) ? 'flex-row-reverse' : 'flex-row'} animate-[slideIn_0.3s_ease-out]`}
                                style={{
                                    animationDelay: `${index * 0.05}s`,
                                    animationFillMode: 'backwards',
                                }}
                            >
                                {/* Avatar */}
                                {!(message.sender == session?.user) && (
                                    <div className="w-12 h-12 bg-secondary flex items-center justify-center shadow-[5px_5px_0_0_rgba(0,0,0,0.4)] shrink-0">
                                        <span className="text-foreground font-bold text-lg" style={{ fontFamily: 'var(--font-display)' }}>
                                            A
                                        </span>
                                    </div>
                                )}

                                {/* Message bubble */}
                                <div className={`flex flex-col max-w-lg ${(message.senderId === session?.user.id) ? 'items-end' : 'items-start'}`}>
                                    <div
                                        className={`px-5 py-3 border-3 border-border shadow-[6px_6px_0_0_rgba(0,0,0,0.4)]
                  ${(message.senderId === session?.user.id)
                                                ? 'bg-primary text-primary-foreground'
                                                : 'bg-card text-foreground'
                                            }
                  hover:shadow-[8px_8px_0_0_rgba(0,0,0,0.4)] transition-all`}
                                    >
                                        <p className="text-base leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                                            {message.content}
                                        </p>
                                    </div>
                                    <span className="text-xs text-muted-foreground mt-1.5 px-1" style={{ fontFamily: 'var(--font-mono)' }}>
                                        {message.createdAt}
                                    </span>
                                </div>

                                {/* My avatar */}
                                {/* {(message.senderId === session?.user.id) && (
                                    <div className="w-12 h-12 bg-primary flex items-center justify-center shadow-[5px_5px_0_0_rgba(0,0,0,0.4)] shrink-0">
                                        <span className="text-primary-foreground font-bold text-lg" style={{ fontFamily: 'var(--font-display)' }}>
                                            M
                                        </span>
                                    </div>
                                )} */}
                            </div>
                        )))}
                        <div ref={messagesEndRef} />
                    </div>

                    <style>{`
                        @keyframes slideIn {
                        from {
                            opacity: 0;
                            transform: translateY(10px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                        }
                        `}
                    </style>
                </div>
                <Input onSend={handleSendMessage}></Input>
            </main>
        );
    }

