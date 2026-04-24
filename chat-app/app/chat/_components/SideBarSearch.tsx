'use client'


export default function SideBarSearch(){

    return (
            <div className="p-4 border-b-4 border-border">
                <input
                    type="text"
                    placeholder="Search messages..."
                    className="w-full bg-input px-4 py-3 border-2 border-border focus:border-primary outline-none transition-colors"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}
                />
            </div>)
}