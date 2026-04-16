'use client'
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import ChatBox from "@/components/Chatbox";
import Input from "@/components/Input";

export default function ChatPage() {

 const [activeChat, setActiveChat] = useState('alex-chen');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'alex-chen', text: "yo! did you see that new design?", time: "2:34 PM", isMine: false },
    { id: 2, sender: 'me', text: "yeah it's wild! love the brutalist vibes", time: "2:35 PM", isMine: true },
    { id: 3, sender: 'alex-chen', text: "right?? those chunky shadows are 🔥", time: "2:35 PM", isMine: false },
    { id: 4, sender: 'me', text: "totally different from the usual clean minimal stuff. refreshing", time: "2:36 PM", isMine: true },
    { id: 5, sender: 'alex-chen', text: "want to collaborate on something similar?", time: "2:37 PM", isMine: false },
  ]);

  const handleSendMessage = (text: string) => {
    const newMessage = {
      id: messages.length + 1,
      sender: 'me',
      text,
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      isMine: true,
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="size-full flex relative overflow-hidden">
      {/* Grain texture overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
           }}
      />

      <Sidebar activeChat={activeChat} onSelectChat={setActiveChat} />

      <main className="flex-1 flex flex-col relative">
        <ChatBox messages={messages} />
        <Input onSend={handleSendMessage} />
      </main>
    </div>
  );
}