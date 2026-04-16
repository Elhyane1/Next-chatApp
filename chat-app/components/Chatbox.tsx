// import Message from "./Message";

// export default function ChatBox() {
//     return (
//         <div className="flex-1 p-4 overflow-y-auto bg-gray-100 space-y-2">
//             <Message content="Hello!" />
//             <Message content="Hi, how are you?" isOwn />
//             <Message content="I'm good, thanks!" />
//         </div>
//     );
// }

import { useEffect, useRef } from 'react';

interface Message {
    id: number;
    sender: string;
    text: string;
    time: string;
    isMine: boolean;
}

interface ChatBoxProps {
    messages: Message[];
}

export default function ChatBox({ messages }: ChatBoxProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="flex-1 overflow-y-auto px-8 py-6">
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
                {messages.map((message, index) => (
                    <div
                        key={message.id}
                        className={`flex gap-3 ${message.isMine ? 'flex-row-reverse' : 'flex-row'} animate-[slideIn_0.3s_ease-out]`}
                        style={{
                            animationDelay: `${index * 0.05}s`,
                            animationFillMode: 'backwards',
                        }}
                    >
                        {/* Avatar */}
                        {!message.isMine && (
                            <div className="w-12 h-12 bg-secondary flex items-center justify-center shadow-[5px_5px_0_0_rgba(0,0,0,0.4)] flex-shrink-0">
                                <span className="text-foreground font-bold text-lg" style={{ fontFamily: 'var(--font-display)' }}>
                                    A
                                </span>
                            </div>
                        )}

                        {/* Message bubble */}
                        <div className={`flex flex-col max-w-lg ${message.isMine ? 'items-end' : 'items-start'}`}>
                            <div
                                className={`px-5 py-3 border-3 border-border shadow-[6px_6px_0_0_rgba(0,0,0,0.4)]
                  ${message.isMine
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-card text-foreground'
                                    }
                  hover:shadow-[8px_8px_0_0_rgba(0,0,0,0.4)] transition-all`}
                            >
                                <p className="text-base leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                                    {message.text}
                                </p>
                            </div>
                            <span className="text-xs text-muted-foreground mt-1.5 px-1" style={{ fontFamily: 'var(--font-mono)' }}>
                                {message.time}
                            </span>
                        </div>

                        {/* My avatar */}
                        {message.isMine && (
                            <div className="w-12 h-12 bg-primary flex items-center justify-center shadow-[5px_5px_0_0_rgba(0,0,0,0.4)] flex-shrink-0">
                                <span className="text-primary-foreground font-bold text-lg" style={{ fontFamily: 'var(--font-display)' }}>
                                    M
                                </span>
                            </div>
                        )}
                    </div>
                ))}
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
      `}</style>
        </div>
    );
}
