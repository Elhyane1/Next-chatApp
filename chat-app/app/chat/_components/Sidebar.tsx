import { useState, useRef, useEffect } from 'react';
import { signOut } from 'next-auth/react';

interface Contact {
    id: string;
    name: string;
    status: string;
    lastMessage: string;
    time: string;
    unread?: number;
    avatar?: string;
    email?: string;
    phone?: string;
    bio?: string;
}

interface SidebarProps {
    activeChat: string;
    onSelectChat: (id: string) => void;
}

const contacts: Contact[] = [
    {
        id: 'alex-chen',
        name: 'Alex Chen',
        status: 'online',
        lastMessage: 'want to collaborate on something similar?',
        time: '2:37 PM',
        email: 'alex.chen@design.co',
        phone: '+1 (555) 123-4567',
        bio: 'Product designer at Studio XYZ. Love brutalist design and experimental interfaces.'
    },
    {
        id: 'maria-santos',
        name: 'Maria Santos',
        status: 'away',
        lastMessage: 'sent you the files!',
        time: '1:15 PM',
        unread: 2,
        email: 'maria.s@creative.io',
        phone: '+1 (555) 234-5678',
        bio: 'Frontend developer & UI enthusiast. Always experimenting with new CSS tricks.'
    },
    {
        id: 'design-squad',
        name: 'Design Squad',
        status: 'online',
        lastMessage: 'Jamie: let\'s sync tomorrow',
        time: '12:03 PM',
        bio: 'Team chat for design projects and creative collaboration. 12 members online.'
    },
    {
        id: 'kai-nakamura',
        name: 'Kai Nakamura',
        status: 'offline',
        lastMessage: 'thanks for the feedback',
        time: 'Yesterday',
        email: 'kai.nak@studio.com',
        bio: 'Creative director focused on bold, unconventional digital experiences.'
    },
    {
        id: 'dev-team',
        name: 'Dev Team',
        status: 'online',
        lastMessage: 'merge request approved',
        time: 'Yesterday',
        unread: 5,
        bio: 'Development team workspace. 8 active members.'
    },
];

export default function Sidebar({ activeChat, onSelectChat }: SidebarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedContactInfo, setSelectedContactInfo] = useState<Contact | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);


    // Get the fiest letter of contact's name 
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const getAvatarColor = (id: string) => {
        const colors = ['#d97626', '#ff9d3d', '#ffb347', '#b8621b'];
        const index = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
        return colors[index];
    };

    return (
        <aside className="w-80 bg-sidebar border-r-4 border-border flex flex-col">
            {/* Header */}
            <div className="p-6 border-b-4 border-border">
                <h1 className="text-primary uppercase tracking-wider mb-1"
                    style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem' }}>
                    CHAT
                </h1>
                <p className="text-muted-foreground text-sm" style={{ fontFamily: 'var(--font-mono)' }}>
                    5 active conversations
                </p>
            </div>

            {/* Search */}
            <div className="p-4 border-b-4 border-border">
                <input
                    type="text"
                    placeholder="Search messages..."
                    className="w-full bg-input px-4 py-3 border-2 border-border focus:border-primary outline-none transition-colors"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}
                />
            </div>

            {/* Contacts */}
            <div className="flex-1 overflow-y-auto">
                {contacts.map((contact) => (
                    <div
                        key={contact.id}
                        className={`w-full p-4 border-b-2 border-border transition-all hover:bg-muted relative group
              ${activeChat === contact.id ? 'bg-card shadow-[8px_8px_0_0_rgba(255,157,61,0.3)]' : ''}`}
                    >
                        {/* Active indicator */}
                        {activeChat === contact.id && (
                            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary" />
                        )}

                        <div className="flex items-start gap-3">
                            {/* Avatar - Clickable */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedContactInfo(contact);
                                }}
                                className="flex-shrink-0 w-12 h-12 flex items-center justify-center border-2 border-border shadow-[4px_4px_0_0_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0_0_rgba(255,157,61,0.5)] transition-all relative"
                                style={{ backgroundColor: contact.avatar ? 'transparent' : getAvatarColor(contact.id) }}
                            >
                                {contact.avatar ? (
                                    <img src={contact.avatar} alt={contact.name} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-foreground font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                                        {getInitials(contact.name)}
                                    </span>
                                )}
                                {/* Status indicator on avatar */}
                                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-background ${contact.status === 'online' ? 'bg-primary' :
                                        contact.status === 'away' ? 'bg-secondary' :
                                            'bg-muted-foreground'
                                    }`} />
                            </button>

                            {/* Contact Info - Clickable */}
                            <button
                                onClick={() => onSelectChat(contact.id)}
                                className="flex-1 text-left min-w-0"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <span className="font-bold text-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                                        {contact.name}
                                    </span>
                                    <span className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-mono)' }}>
                                        {contact.time}
                                    </span>
                                </div>

                                <p className="text-sm text-muted-foreground truncate mb-1">
                                    {contact.lastMessage}
                                </p>

                                {contact.unread && (
                                    <div className="inline-block bg-primary text-primary-foreground px-2 py-0.5 text-xs font-bold shadow-[3px_3px_0_0_rgba(0,0,0,0.3)]"
                                        style={{ fontFamily: 'var(--font-mono)' }}>
                                        {contact.unread}
                                    </div>
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer - User Profile */}
            <div className="p-4 border-t-4 border-border bg-card relative" ref={menuRef}>
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="w-full flex items-center gap-3 hover:bg-muted p-2 -m-2 transition-colors group"
                >
                    <div className="w-12 h-12 bg-primary flex items-center justify-center shadow-[4px_4px_0_0_rgba(0,0,0,0.4)] group-hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.5)] transition-all">
                        <span className="text-primary-foreground font-bold text-xl" style={{ fontFamily: 'var(--font-display)' }}>
                            M
                        </span>
                    </div>
                    <div className="flex-1 text-left">
                        <p className="font-bold text-sm" style={{ fontFamily: 'var(--font-body)' }}>Morgan Rivera</p>
                        <p className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-mono)' }}>online</p>
                    </div>
                    <span className={`text-primary text-xl transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}>
                        ▲
                    </span>
                </button>

                {/* Dropdown Menu */}
                {isMenuOpen && (
                    <div className="absolute bottom-full left-4 right-4 mb-2 bg-card border-4 border-border shadow-[8px_8px_0_0_rgba(0,0,0,0.5)] animate-[slideUp_0.2s_ease-out]">
                        <button className="w-full px-4 py-3 text-left hover:bg-muted transition-colors border-b-2 border-border flex items-center gap-3 group">
                            <span className="text-xl">👤</span>
                            <span style={{ fontFamily: 'var(--font-body)' }} className="font-bold text-sm">Profile Settings</span>
                        </button>
                        <button className="w-full px-4 py-3 text-left hover:bg-muted transition-colors border-b-2 border-border flex items-center gap-3 group">
                            <span className="text-xl">🔄</span>
                            <span style={{ fontFamily: 'var(--font-body)' }} className="font-bold text-sm">Switch Account</span>
                        </button>
                        <button className="w-full px-4 py-3 text-left hover:bg-muted transition-colors border-b-2 border-border flex items-center gap-3 group">
                            <span className="text-xl">🌙</span>
                            <span style={{ fontFamily: 'var(--font-body)' }} className="font-bold text-sm">Preferences</span>
                        </button>
                        <button onClick={() => signOut({ callbackUrl: '/login' })} className="w-full px-4 py-3 text-left hover:bg-destructive hover:text-destructive-foreground transition-colors flex items-center gap-3 group">
                            <span className="text-xl">🚪</span>
                            <span style={{ fontFamily: 'var(--font-body)' }} className="font-bold text-sm">Sign Out</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Contact Info Modal */}
            {selectedContactInfo && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 animate-[fadeIn_0.2s_ease-out]"
                        onClick={() => setSelectedContactInfo(null)}
                    />

                    {/* Modal */}
                    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] bg-card border-4 border-border shadow-[12px_12px_0_0_rgba(0,0,0,0.6)] z-50 animate-[popIn_0.3s_ease-out]">
                        {/* Header */}
                        <div className="p-6 border-b-4 border-border flex items-center justify-between bg-muted">
                            <h3 className="text-primary uppercase" style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem' }}>
                                Contact Info
                            </h3>
                            <button
                                onClick={() => setSelectedContactInfo(null)}
                                className="w-10 h-10 bg-card border-2 border-border hover:bg-destructive hover:text-destructive-foreground transition-all shadow-[3px_3px_0_0_rgba(0,0,0,0.3)] hover:shadow-[5px_5px_0_0_rgba(0,0,0,0.4)] flex items-center justify-center font-bold text-xl"
                            >
                                ×
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6">
                            {/* Avatar and Name */}
                            <div className="flex flex-col items-center mb-6">
                                <div
                                    className="w-24 h-24 flex items-center justify-center border-4 border-border shadow-[8px_8px_0_0_rgba(0,0,0,0.5)] mb-4 relative"
                                    style={{ backgroundColor: selectedContactInfo.avatar ? 'transparent' : getAvatarColor(selectedContactInfo.id) }}
                                >
                                    {selectedContactInfo.avatar ? (
                                        <img src={selectedContactInfo.avatar} alt={selectedContactInfo.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-foreground font-bold text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
                                            {getInitials(selectedContactInfo.name)}
                                        </span>
                                    )}
                                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 border-4 border-card ${selectedContactInfo.status === 'online' ? 'bg-primary' :
                                            selectedContactInfo.status === 'away' ? 'bg-secondary' :
                                                'bg-muted-foreground'
                                        }`} />
                                </div>
                                <h4 className="font-bold text-xl mb-1" style={{ fontFamily: 'var(--font-body)' }}>
                                    {selectedContactInfo.name}
                                </h4>
                                <span className="text-sm text-muted-foreground capitalize" style={{ fontFamily: 'var(--font-mono)' }}>
                                    {selectedContactInfo.status}
                                </span>
                            </div>

                            {/* Details */}
                            <div className="space-y-4">
                                {selectedContactInfo.bio && (
                                    <div className="p-4 bg-muted border-2 border-border">
                                        <p className="text-sm text-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                                            {selectedContactInfo.bio}
                                        </p>
                                    </div>
                                )}

                                {selectedContactInfo.email && (
                                    <div>
                                        <label className="text-xs text-muted-foreground uppercase mb-1 block" style={{ fontFamily: 'var(--font-mono)' }}>
                                            Email
                                        </label>
                                        <div className="p-3 bg-input border-2 border-border">
                                            <p className="text-sm" style={{ fontFamily: 'var(--font-mono)' }}>
                                                {selectedContactInfo.email}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {selectedContactInfo.phone && (
                                    <div>
                                        <label className="text-xs text-muted-foreground uppercase mb-1 block" style={{ fontFamily: 'var(--font-mono)' }}>
                                            Phone
                                        </label>
                                        <div className="p-3 bg-input border-2 border-border">
                                            <p className="text-sm" style={{ fontFamily: 'var(--font-mono)' }}>
                                                {selectedContactInfo.phone}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="mt-6 flex gap-3">
                                <button className="flex-1 px-4 py-3 bg-primary text-primary-foreground border-2 border-border shadow-[4px_4px_0_0_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.5)] transition-all font-bold uppercase text-sm"
                                    style={{ fontFamily: 'var(--font-display)' }}>
                                    Message
                                </button>
                                <button className="flex-1 px-4 py-3 bg-card text-foreground border-2 border-border shadow-[4px_4px_0_0_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.5)] transition-all font-bold uppercase text-sm"
                                    style={{ fontFamily: 'var(--font-display)' }}>
                                    Block
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes popIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `}</style>
        </aside>
    );
}
