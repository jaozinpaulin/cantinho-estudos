'use client';

import { X } from 'lucide-react';

type WordDetailsProps = {
    isOpen: boolean;
    onClose: () => void;
    palavra: string;
    imagem: string;
};

export default function WordDetails({ isOpen, onClose, palavra, imagem, }: WordDetailsProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-5"
            onClick={onClose}>
            <div
                className="w-full max-w-lg overflow-hidden rounded-xl border border-cafe-700 bg-cafe-900"
                onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4">
                    <h2 className="text-lg font-medium">{palavra}</h2>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Fechar detalhes"
                        className="text-crema-200 transition-colors hover:text-crema-100">
                        <X size={20} />
                    </button>
                </div>

                <img src={imagem} alt={palavra}
                    className="h-56 w-full object-cover"
                />

                {/* <div className="p-5">
                    <p className="text-sm text-crema-200">
                        Detalhes da expressão
                    </p>
                </div> */}
            </div>
        </div>
    );
}
