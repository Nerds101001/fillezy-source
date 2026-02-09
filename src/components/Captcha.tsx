'use client';

import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

interface CaptchaProps {
    onVerify: (isValid: boolean) => void;
}

export default function Captcha({ onVerify }: CaptchaProps) {
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [isVerified, setIsVerified] = useState(false);

    const generateCaptcha = () => {
        const n1 = Math.floor(Math.random() * 10) + 1;
        const n2 = Math.floor(Math.random() * 10) + 1;
        setNum1(n1);
        setNum2(n2);
        setUserInput('');
        setIsVerified(false);
        onVerify(false);
    };

    useEffect(() => {
        generateCaptcha();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setUserInput(val);

        if (parseInt(val) === num1 + num2) {
            setIsVerified(true);
            onVerify(true);
        } else {
            setIsVerified(false);
            onVerify(false);
        }
    };

    return (
        <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-black/30 ml-2">Human verification</label>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 px-6 py-4 rounded-xl bg-black/5 border border-black/5 font-mono text-lg font-black text-black select-none">
                    <span>{num1}</span>
                    <span className="text-primary">+</span>
                    <span>{num2}</span>
                    <span className="text-primary">=</span>
                </div>
                <input
                    type="number"
                    value={userInput}
                    onChange={handleChange}
                    placeholder="?"
                    className={`flex-1 px-6 py-4 rounded-xl border transition-all outline-none font-black text-lg ${isVerified
                        ? 'border-green-500 bg-green-500/5 text-green-600'
                        : 'border-black/5 bg-[#FAFAFA] focus:border-primary'
                        }`}
                />
                <button
                    type="button"
                    onClick={generateCaptcha}
                    className="p-4 rounded-xl bg-black text-white hover:bg-primary transition-colors h-14 w-14 flex items-center justify-center shrink-0"
                >
                    <RefreshCw size={20} />
                </button>
            </div>
        </div>
    );
}
