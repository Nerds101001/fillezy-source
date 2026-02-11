'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Send, FileText, CheckCircle2, AlertCircle, Loader2, Link2, ChevronDown } from 'lucide-react';
import Captcha from './Captcha';

interface CareerModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialRole?: string;
}

export default function CareerModal({ isOpen, onClose, initialRole }: CareerModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        role: initialRole || '',
        skills: '',
        cv: null as File | null
    });
    const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [isMobile, setIsMobile] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (initialRole) {
            setFormData(prev => ({ ...prev, role: initialRole }));
        }
    }, [initialRole]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ ...prev, cv: e.target.files![0] }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isCaptchaVerified) return;

        setStatus('loading');

        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('email', formData.email);
            data.append('phone', formData.phone);
            data.append('role', formData.role);
            data.append('skills', formData.skills);
            data.append('target', 'ai@rustx.com');
            data.append('type', 'CAREER_APPLICATION');
            if (formData.cv) {
                data.append('cv', formData.cv);
            }

            const response = await fetch('/api/contact', {
                method: 'POST',
                body: data, // Sending FormData for multipart/form-data
            });

            if (!response.ok) throw new Error('Submission failed. Please try again.');

            setStatus('success');
            setTimeout(() => {
                onClose();
                setStatus('idle');
                setFormData({ name: '', email: '', phone: '', role: '', skills: '', cv: null });
            }, 3000);
        } catch (err: any) {
            setStatus('error');
            setErrorMessage(err.message || 'Something went wrong.');
        }
    };

    const modalVariants = isMobile ? {
        initial: { y: "100%" },
        animate: {
            y: "0%",
            transition: {
                type: "spring" as const,
                damping: 30,
                stiffness: 300,
                mass: 0.8
            }
        },
        exit: {
            y: "100%",
            transition: {
                type: "spring" as const,
                damping: 30,
                stiffness: 300
            }
        }
    } : {
        initial: { opacity: 0, scale: 0.95, y: 20 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.95, y: 20 }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 overflow-y-auto custom-scrollbar">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm"
                />

                <motion.div
                    variants={modalVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    drag={isMobile ? "y" : false}
                    dragConstraints={{ top: 0, bottom: 0 }}
                    dragElastic={{ top: 0, bottom: 0.2 }}
                    onDragEnd={(e, { offset, velocity }) => {
                        if (isMobile && (offset.y > 100 || velocity.y > 500)) {
                            onClose();
                        }
                    }}
                    className="relative w-full max-w-4xl overflow-hidden rounded-t-[2.5rem] md:rounded-[2.5rem] bg-white shadow-2xl max-h-[90vh] md:max-h-none h-auto md:h-auto overflow-y-auto flex flex-col"
                >
                    {/* Mobile Drag Handle */}
                    <div className="md:hidden absolute top-0 left-0 right-0 pt-3 pb-2 flex flex-col items-center justify-center z-50 pointer-events-none">
                        <div className="w-12 h-1 bg-white/20 rounded-full mb-1" />
                    </div>

                    {/* Header */}
                    <div className="bg-black p-6 pt-10 md:pt-6 relative overflow-hidden flex items-center justify-between shrink-0">
                        <div className="absolute inset-0 technical-grid opacity-20" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="h-px w-8 bg-primary" />
                                <span className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-primary">INTAKE_PROTOCOL</span>
                            </div>
                            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Career Application</h2>
                        </div>

                        {/* Close Button - Desktop: Top Right, Mobile: Hidden (Swipe to close) or Keep? User asked for down arrow. */}
                        {isMobile ? (
                            <button onClick={onClose} className="bg-white/10 hover:bg-white/20 p-2 rounded-full text-white transition-colors z-20">
                                <ChevronDown size={20} />
                            </button>
                        ) : (
                            <button onClick={onClose} className="bg-white/10 hover:bg-white/20 p-2 rounded-full text-white transition-colors z-20">
                                <X size={20} />
                            </button>
                        )}
                    </div>

                    <div className="p-6 overflow-y-auto custom-scrollbar">
                        {status === 'success' ? (
                            <div className="text-center py-12">
                                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
                                    <CheckCircle2 size={40} className="text-green-500" />
                                </div>
                                <h3 className="text-2xl font-black text-black mb-2 uppercase tracking-tight">Application Received</h3>
                                <p className="text-black/40">Your profile has been added to our global recruitment matrix.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-black/30 ml-2">FULL_NAME</label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full px-5 py-3 rounded-xl border border-black/5 bg-[#FAFAFA] focus:border-primary outline-none transition-all font-medium text-sm"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-black/30 ml-2">EMAIL_ADDRESS</label>
                                        <input
                                            required
                                            type="email"
                                            className="w-full px-5 py-3 rounded-xl border border-black/5 bg-[#FAFAFA] focus:border-primary outline-none transition-all font-medium text-sm"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-black/30 ml-2">MOBILE_NUMBER</label>
                                        <input
                                            required
                                            type="tel"
                                            className="w-full px-5 py-3 rounded-xl border border-black/5 bg-[#FAFAFA] focus:border-primary outline-none transition-all font-medium text-sm"
                                            placeholder="+91 00000 00000"
                                            value={formData.phone}
                                            onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-black/30 ml-2">SELECT_ROLE</label>
                                        <select
                                            required
                                            className="w-full px-5 py-3 rounded-xl border border-black/5 bg-[#FAFAFA] focus:border-primary outline-none transition-all font-medium appearance-none text-sm"
                                            value={formData.role}
                                            onChange={e => setFormData(prev => ({ ...prev, role: e.target.value }))}
                                        >
                                            <option value="">Choose a position...</option>
                                            <option value="Vice President">Vice President</option>
                                            <option value="Regional Sales Manager">Regional Sales Manager</option>
                                            <option value="Sales Executive / Manager">Sales Executive / Manager</option>
                                            <option value="Internship Program">Internship Program</option>
                                            <option value="General Interest">General Interest / Future Openings</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-black/30 ml-2">SKILLS_&_EXPERIENCE</label>
                                    <textarea
                                        required
                                        rows={2}
                                        className="w-full px-5 py-3 rounded-xl border border-black/5 bg-[#FAFAFA] focus:border-primary outline-none transition-all font-medium resize-none text-sm"
                                        placeholder="Briefly describe your industrial expertise..."
                                        value={formData.skills}
                                        onChange={e => setFormData(prev => ({ ...prev, skills: e.target.value }))}
                                    />
                                </div>

                                {/* File Upload */}
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-black/30 ml-2">UPLOAD_CV_//_PDF_ONLY</label>
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className={`w-full p-4 rounded-xl border-2 border-dashed transition-all cursor-pointer flex items-center justify-center gap-4 ${formData.cv ? 'border-primary bg-primary/5' : 'border-black/5 bg-[#FAFAFA] hover:border-primary/50'
                                            }`}
                                    >
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            className="hidden"
                                            accept=".pdf,.doc,.docx"
                                            required
                                        />
                                        {formData.cv ? (
                                            <div className="flex items-center gap-3">
                                                <FileText size={20} className="text-primary" />
                                                <span className="text-xs font-bold text-black">{formData.cv.name}</span>
                                                <span className="text-[10px] text-black/40 uppercase tracking-widest">Click to change</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-3">
                                                <Upload size={20} className="text-black/20" />
                                                <span className="text-xs font-bold text-black/40">Drop PDF here or click to browse</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="py-1">
                                    <Captcha onVerify={setIsCaptchaVerified} />
                                </div>

                                {status === 'error' && (
                                    <div className="flex items-center gap-2 text-red-500 text-xs bg-red-500/5 p-3 rounded-xl border border-red-500/10 font-bold">
                                        <AlertCircle size={14} /> {errorMessage}
                                    </div>
                                )}

                                <button
                                    disabled={status === 'loading' || !isCaptchaVerified}
                                    type="submit"
                                    className="w-full py-4 bg-black text-white rounded-xl font-black text-[10px] uppercase tracking-[0.4em] hover:bg-primary transition-all disabled:opacity-30 flex items-center justify-center gap-3"
                                >
                                    {status === 'loading' ? <Loader2 className="animate-spin" /> : <><Send size={14} /> SUBMIT_CREDENTIALS</>}
                                </button>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
