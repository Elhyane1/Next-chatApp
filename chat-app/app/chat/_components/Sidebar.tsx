'use client'
import { useState, useRef, useEffect } from 'react';
import SideBarSearch from './SideBarSearch';
import SideBarFooter from './SideBarFooter';

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

export default function Sidebar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedContactInfo, setSelectedContactInfo] = useState<Contact | null>(null);
    const [activeChat, setActiveChat] = useState('alex-chen');
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
            <SideBarSearch></SideBarSearch>

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
                                onClick={() => setActiveChat(contact.id)}
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
            <SideBarFooter initials={getInitials} avatarColor={getAvatarColor} contacts={contacts} selectedContactInfo={selectedContactInfo} setSelectedContactInfo={setSelectedContactInfo}></SideBarFooter>

            
        </aside>
    );
}
