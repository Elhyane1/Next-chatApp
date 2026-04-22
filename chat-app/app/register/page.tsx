'use client'
import { useState } from 'react';
// import { Link, useNavigate } from 'react-router';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// import Email from 'next-auth/providers/email';

export default function Register() {
    const route = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        // Mock registration - in real app, create account
        if (formData.password === formData.confirmPassword) {
            const email = formData.email
            const password = formData.password
            const name = formData.name
            await fetch("/api/register", {
    method: "POST",
    body: JSON.stringify({ email, password, name })
  });

            route.replace('/login');
        }
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative">
            {/* Grain texture overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            <div className="w-full max-w-md relative">
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <h1 className="text-primary uppercase tracking-wider mb-2"
                        style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', lineHeight: '1' }}>
                        CHAT
                    </h1>
                    <p className="text-muted-foreground" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
                        Neo-Brutalist Messaging
                    </p>
                </div>

                {/* Register Card */}
                <div className="bg-card border-4 border-border shadow-[12px_12px_0_0_rgba(0,0,0,0.6)]">
                    {/* Header */}
                    <div className="p-6 border-b-4 border-border bg-muted">
                        <h2 className="text-primary uppercase"
                            style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem' }}>
                            Create Account
                        </h2>
                        <p className="text-muted-foreground text-sm mt-1" style={{ fontFamily: 'var(--font-mono)' }}>
                            Join the brutalist messaging revolution
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-5">
                        {/* Name Field */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-foreground uppercase text-xs mb-2"
                                style={{ fontFamily: 'var(--font-mono)' }}
                            >
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                required
                                className="w-full bg-input-background px-4 py-3 border-2 border-border focus:border-primary outline-none transition-all shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] focus:shadow-[6px_6px_0_0_rgba(255,157,61,0.4)]"
                                style={{ fontFamily: 'var(--font-body)' }}
                                placeholder="Morgan Rivera"
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-foreground uppercase text-xs mb-2"
                                style={{ fontFamily: 'var(--font-mono)' }}
                            >
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                required
                                className="w-full bg-input-background px-4 py-3 border-2 border-border focus:border-primary outline-none transition-all shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] focus:shadow-[6px_6px_0_0_rgba(255,157,61,0.4)]"
                                style={{ fontFamily: 'var(--font-body)' }}
                                placeholder="your.email@example.com"
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-foreground uppercase text-xs mb-2"
                                style={{ fontFamily: 'var(--font-mono)' }}
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={formData.password}
                                onChange={(e) => handleChange('password', e.target.value)}
                                required
                                className="w-full bg-input-background px-4 py-3 border-2 border-border focus:border-primary outline-none transition-all shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] focus:shadow-[6px_6px_0_0_rgba(255,157,61,0.4)]"
                                style={{ fontFamily: 'var(--font-body)' }}
                                placeholder="••••••••"
                            />
                            <p className="text-xs text-muted-foreground mt-2" style={{ fontFamily: 'var(--font-mono)' }}>
                                At least 8 characters
                            </p>
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-foreground uppercase text-xs mb-2"
                                style={{ fontFamily: 'var(--font-mono)' }}
                            >
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                                required
                                className="w-full bg-input-background px-4 py-3 border-2 border-border focus:border-primary outline-none transition-all shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] focus:shadow-[6px_6px_0_0_rgba(255,157,61,0.4)]"
                                style={{ fontFamily: 'var(--font-body)' }}
                                placeholder="••••••••"
                            />
                            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                                <p className="text-xs text-destructive mt-2" style={{ fontFamily: 'var(--font-mono)' }}>
                                    Passwords do not match
                                </p>
                            )}
                        </div>

                        {/* Terms & Conditions */}
                        <label className="flex items-start gap-3 cursor-pointer group">
                            <div className="w-5 h-5 mt-0.5 flex-shrink-0 border-2 border-border bg-input flex items-center justify-center shadow-[2px_2px_0_0_rgba(0,0,0,0.3)] group-hover:shadow-[3px_3px_0_0_rgba(0,0,0,0.4)] transition-all">
                                <input type="checkbox" required className="sr-only peer" />
                                <div className="hidden peer-checked:block w-3 h-3 bg-primary" />
                            </div>
                            <span className="text-sm text-foreground" style={{ fontFamily: 'var(--font-mono)' }}>
                                I agree to the{' '}
                                <button type="button" className="text-primary hover:text-secondary transition-colors">
                                    Terms & Conditions
                                </button>
                                {' '}and{' '}
                                <button type="button" className="text-primary hover:text-secondary transition-colors">
                                    Privacy Policy
                                </button>
                            </span>
                        </label>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-primary text-primary-foreground py-4 border-2 border-border shadow-[6px_6px_0_0_rgba(0,0,0,0.5)] hover:shadow-[8px_8px_0_0_rgba(0,0,0,0.6)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all uppercase tracking-wider"
                            style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem' }}
                        >
                            Create Account
                        </button>

                        {/* Divider */}
                        {/* <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t-2 border-border" />
                            </div>
                            <div className="relative flex justify-center">
                                <span className="bg-card px-4 text-muted-foreground text-sm" style={{ fontFamily: 'var(--font-mono)' }}>
                                    OR
                                </span>
                            </div>
                        </div> */}

                        {/* Social Registration Buttons */}
                        {/* <div className="space-y-3">
                            <button
                                type="button"
                                className="w-full bg-card text-foreground py-3 border-2 border-border shadow-[4px_4px_0_0_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.5)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center justify-center gap-3"
                                style={{ fontFamily: 'var(--font-body)' }}
                            >
                                <span className="text-xl">🔷</span>
                                Sign up with Google
                            </button>
                            <button
                                type="button"
                                className="w-full bg-card text-foreground py-3 border-2 border-border shadow-[4px_4px_0_0_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.5)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center justify-center gap-3"
                                style={{ fontFamily: 'var(--font-body)' }}
                            >
                                <span className="text-xl">⚫</span>
                                Sign up with GitHub
                            </button>
                        </div> */}
                    </form>

                    {/* Footer */}
                    <div className="p-6 border-t-4 border-border bg-muted text-center">
                        <p className="text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-mono)' }}>
                            Already have an account?{' '}
                            <Link
                                href="/login"
                                className="text-primary hover:text-secondary transition-colors font-bold"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Footer Text */}
                <p className="text-center text-muted-foreground text-xs mt-6" style={{ fontFamily: 'var(--font-mono)' }}>
                    © 2026 Chat App • Neo-Brutalist Design
                </p>
            </div>
        </div>
    );
}
