'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

type NotepadProps = {
    onClose: () => void;
};

export default function Notepad({ onClose }: NotepadProps) {
    const [note, setNote] = useState('');

    useEffect(() => {
        setNote(localStorage.getItem('notepad') || '');
    }, []);

    function handleChange(value: string) {
        setNote(value);
        localStorage.setItem('notepad', value);
    }

    return (
        <div onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div
                onClick={(e) => e.stopPropagation()}
                className="flex h-full w-full max-w-7xl flex-col rounded border border-white/10 bg-[#211B18] p-4">
                <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm text-white/70">Notepad</span>

                    <button onClick={onClose} className="text-white/50 hover:text-white">
                        <X size={18} />
                    </button>
                </div>

                <textarea
                    value={note}
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder="Write your notes..."
                    className="flex-1 resize-none bg-transparent text-white/80 outline-none placeholder:text-white/30"
                />
            </div>
        </div>
    );
}
