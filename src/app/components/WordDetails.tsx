'use client';

import { useState } from 'react';
import { X, Plus, Clock3 } from 'lucide-react';

type WordDetailsProps = {
    isOpen: boolean;
    onClose: () => void;
    palavra: string;
    imagem: string;
};

const frasesIniciais = [
    {
        id: '1',
        frase: "It's hard to keep up when everything changes so fast.",
        traducao: 'É difícil acompanhar o ritmo quando tudo muda tão rápido.',
        data: 'Hoje',
    },
    {
        id: '2',
        frase: 'I need to keep up with my English studies.',
        traducao: 'Preciso acompanhar meus estudos de inglês.',
        data: 'Ontem',
    },
];

const imagensRelacionadas = [
    'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=400&auto=format&fit=crop',
];

export default function WordDetails({ isOpen, onClose, palavra, imagem, }: WordDetailsProps) {
    const [frase, setFrase] = useState('');
    const [frases, setFrases] = useState(frasesIniciais);

    if (!isOpen) return null;

    function adicionarFrase(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!frase.trim()) return;

        setFrases([
            {
                id: Date.now().toString(),
                frase: frase.trim(),
                traducao: 'Tradução ainda não adicionada.',
                data: 'Agora',
            },
            ...frases,
        ]);

        setFrase('');
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-6"
            onClick={onClose}>

            <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto transition-colors duration-300 rounded-l-xl bg-cafe-900"
                onClick={(e) => e.stopPropagation()}>
                <header className="sticky top-0 z-10 flex items-center justify-between border-b border-cafe-700/60 bg-cafe-900 px-5 py-4">
                    <div>
                        <p className="text-xs text-crema-200">
                            SUA BIBLIOTECA
                        </p>
                    </div>

                    <button type="button" onClick={onClose}
                        aria-label="Fechar detalhes"
                        className="rounded-lg cursor-pointer p-2 text-crema-200 transition-colors hover:bg-cafe-800 hover:text-crema-100">
                        <X size={20} />
                    </button>
                </header>

                <div className="space-y-8 p-5 sm:p-6">
                    <div className="grid gap-5 sm:grid-cols-2">
                        <img src={imagem} alt={palavra}
                            className="h-52 w-full rounded-lg object-cover sm:h-60" />

                        <div className="flex flex-col justify-center">
                            <p className="text-sm text-canela">
                                EXPRESSÃO
                            </p>

                            <h3 className="mt-2 text-3xl font-medium">
                                {palavra}
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-crema-200">
                                Guarde frases e exemplos para construir seu
                                próprio repertório de inglês.
                            </p>

                            <p className="mt-5 text-sm text-crema-200">
                                {frases.length} frases salvas
                            </p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium">Suas frases</h3>

                        <form onSubmit={adicionarFrase}
                            className="mt-4 flex flex-col gap-3 sm:flex-row">
                            <input
                                value={frase}
                                onChange={(e) => setFrase(e.target.value)}
                                placeholder="Escreva uma frase em inglês..."
                                className="min-w-0 flex-1 rounded-lg border border-cafe-700 bg-cafe-800/50 px-3 py-3 text-sm outline-none placeholder:text-crema-200/60 focus:border-canela" />

                            <button type="submit"
                                className="flex items-center justify-center gap-2 rounded-lg bg-canela px-4 py-3 text-sm font-medium text-crema-100 transition-colors hover:bg-canela-dark">

                                <Plus size={16} />
                                Adicionar
                            </button>
                        </form>

                        <div className="mt-4 divide-y divide-cafe-700/60">
                            {frases.map((item) => (
                                <div key={item.id} className="py-4">
                                    <p className="text-sm leading-6">
                                        {item.frase}
                                    </p>

                                    <p className="mt-1 text-sm leading-5 text-crema-200">
                                        {item.traducao}
                                    </p>

                                    <p className="mt-2 flex items-center gap-2 text-xs text-crema-200/70">
                                        <Clock3 size={13} />
                                        {item.data}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium">
                            Imagens relacionadas
                        </h3>

                        <div className="mt-4 grid grid-cols-3 gap-3">
                            {imagensRelacionadas.map((url) => (
                                <img
                                    key={url}
                                    src={url}
                                    alt={`Referência para ${palavra} `}
                                    className="h-24 w-full rounded-lg object-cover sm:h-32"
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium">Histórico</h3>

                        <div className="mt-4 space-y-4">
                            <div className="flex items-start gap-3">
                                <Clock3
                                    size={16}
                                    className="mt-1 text-canela"
                                />

                                <div>
                                    <p className="text-sm">
                                        Expressão adicionada
                                    </p>
                                    <p className="mt-1 text-xs text-crema-200">
                                        Registro inicial na sua biblioteca.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Plus size={16} className="mt-1 text-canela" />
                                <div>
                                    <p className="text-sm">
                                        Frases registradas
                                    </p>
                                    <p className="mt-1 text-xs text-crema-200">
                                        {frases.length} frases no seu repertório.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}