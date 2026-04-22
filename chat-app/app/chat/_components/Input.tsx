"use client"
import { useState, KeyboardEvent } from 'react';

interface InputProps {
    onSend: (message: string) => void;
}

export default function Input({ onSend }: InputProps) {
    
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message.trim()) {
            onSend(message);
            setMessage('');
        }
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="border-t-4 border-border bg-card p-6">
            <div className="flex gap-3">
                {/* Attachment buttons */}
                <button className="w-14 h-14 bg-muted border-2 border-border hover:bg-input hover:shadow-[5px_5px_0_0_rgba(255,157,61,0.5)] transition-all shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] flex items-center justify-center">
                    <span className="text-2xl">📎</span>
                </button>
                <button className="w-14 h-14 bg-muted border-2 border-border hover:bg-input hover:shadow-[5px_5px_0_0_rgba(255,157,61,0.5)] transition-all shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] flex items-center justify-center">
                    <span className="text-2xl">😊</span>
                </button>

                {/* Input field */}
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="flex-1 bg-input px-5 py-4 border-2 border-border focus:border-primary outline-none transition-all focus:shadow-[0_0_0_3px_rgba(255,157,61,0.2)] text-base"
                    style={{ fontFamily: 'var(--font-body)' }}
                />

                {/* Send button */}
                <button
                    onClick={handleSend}
                    disabled={!message.trim()}
                    className="px-8 bg-primary text-primary-foreground border-2 border-border hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.5)] transition-all shadow-[4px_4px_0_0_rgba(0,0,0,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.4)] uppercase font-bold tracking-wide"
                    style={{ fontFamily: 'var(--font-display)' }}
                >
                    Send
                </button>
            </div>

            {/* Quick actions */}
            <div className="flex gap-2 mt-4">
                <button className="px-3 py-1.5 bg-muted text-muted-foreground text-xs border border-border hover:bg-input hover:text-foreground transition-all shadow-[2px_2px_0_0_rgba(0,0,0,0.2)] hover:shadow-[3px_3px_0_0_rgba(255,157,61,0.3)]"
                    style={{ fontFamily: 'var(--font-mono)' }}>
                    /gif
                </button>
                <button className="px-3 py-1.5 bg-muted text-muted-foreground text-xs border border-border hover:bg-input hover:text-foreground transition-all shadow-[2px_2px_0_0_rgba(0,0,0,0.2)] hover:shadow-[3px_3px_0_0_rgba(255,157,61,0.3)]"
                    style={{ fontFamily: 'var(--font-mono)' }}>
                    /code
                </button>
                <button className="px-3 py-1.5 bg-muted text-muted-foreground text-xs border border-border hover:bg-input hover:text-foreground transition-all shadow-[2px_2px_0_0_rgba(255,157,61,0.3)] hover:shadow-[3px_3px_0_0_rgba(255,157,61,0.3)]"
                    style={{ fontFamily: 'var(--font-mono)' }}>
                    /poll
                </button>
            </div>
        </div>
    );
}
