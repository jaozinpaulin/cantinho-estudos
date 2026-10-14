'use client';

import { useState } from 'react';
import { ArrowUpRight, Search } from 'lucide-react';
import WordDetails from './components/WordDetails';

interface palavrasType {
    id: string;
    palavra: string;
    imagem: string;
}

const frasesIniciais = [
    {
        id: '1',
        palavra: 'Keep up',
        imagem: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
    },
];

export default function Home() {
    const [itens, setItens] = useState(frasesIniciais);
    const [palavra, setPalavra] = useState('');
    const [busca, setBusca] = useState('');
    const [palavraSelecionada, setPalavraSelecionada] = useState<palavrasType | null>(null);

    console.log(palavraSelecionada)

    function adicionarPalavra(e: React.FormEvent) {
        e.preventDefault();

        if (!palavra.trim()) return;

        setItens([
            {
                id: Date.now().toString(),
                palavra: palavra.trim(),
                imagem: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop',
            },
            ...itens,
        ]);

        setPalavra('');
    }

    const filtrados = itens.filter((item) =>
        item.palavra.toLowerCase().includes(busca.toLowerCase()),
    );

    return (
        <main className="min-h-screen bg-[#111210] text-[#EAEAE5]">
            <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
                <header className="flex items-center justify-between border-b border-white/10 pb-5">
                    <div>
                        <h1 className="text-xl font-semibold">Cantinho</h1>
                        <p className="mt-1 text-sm text-[#85877F]">
                            Seu caderno de inglês
                        </p>
                    </div>

                    <span className="text-sm text-[#85877F]">
                        {itens.length} expressões
                    </span>
                </header>

                <div className="py-10">
                    <h2 className="text-3xl font-medium sm:text-4xl">
                        Aprenda pelo contexto.
                    </h2>

                    <p className="mt-3 max-w-lg text-sm leading-6 text-[#85877F]">
                        Guarde palavras e expressões para aprender inglês no seu ritmo.
                    </p>
                </div>

                <form
                    onSubmit={adicionarPalavra}
                    className="flex flex-col gap-3 rounded-xl border border-white/10 bg-[#181916] p-5 sm:flex-row"
                >
                    <input
                        value={palavra}
                        onChange={(e) => setPalavra(e.target.value)}
                        placeholder="Digite uma palavra ou expressão..."
                        className="min-w-0 flex-1 rounded-lg border border-white/10 bg-[#111210] px-3 py-3 text-sm outline-none placeholder:text-[#666860] focus:border-[#91A68A]"
                    />

                    <button
                        type="submit"
                        className="rounded-lg bg-[#91A68A] px-5 py-3 text-sm font-medium text-[#111210] hover:bg-[#A6B99F]"
                    >
                        Adicionar
                    </button>
                </form>

                <div className="mt-12">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <h2 className="text-xl font-medium">
                            Suas expressões
                        </h2>

                        <div className="relative sm:w-64">
                            <Search
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#85877F]"
                            />

                            <input
                                value={busca}
                                onChange={(e) => setBusca(e.target.value)}
                                placeholder="Buscar expressões..."
                                className="w-full rounded-lg border border-white/10 bg-[#181916] py-2.5 pl-9 pr-3 text-sm outline-none placeholder:text-[#666860] focus:border-[#91A68A]"
                            />
                        </div>
                    </div>

                    <WordDetails
                        isOpen={!!palavraSelecionada}
                        onClose={() => setPalavraSelecionada(null)}
                        palavra={palavraSelecionada?.palavra ?? ''}
                        imagem={palavraSelecionada?.imagem ?? ''}
                    />
                    <div
                        className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {filtrados.map((item) => (
                            <div
                                onClick={() => setPalavraSelecionada(item)}
                                key={item.id}
                                className="overflow-hidden rounded-xl border border-white/10 bg-[#181916]"
                            >
                                <img
                                    src={item.imagem}
                                    alt={item.palavra}
                                    className="h-40 w-full object-cover"
                                />

                                <div className="flex items-center justify-between p-4">
                                    <h3 className="text-lg font-medium">
                                        {item.palavra}
                                    </h3>

                                    <button
                                        type="button"
                                        aria-label={`Explorar ${item.palavra}`}
                                        className="text-[#A5A69F] hover:text-[#91A68A]"
                                    >
                                        <ArrowUpRight size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filtrados.length === 0 && (
                        <p className="py-12 text-center text-sm text-[#85877F]">
                            Nenhuma expressão encontrada.
                        </p>
                    )}
                </div>

                <footer className="mt-16 flex justify-between border-t border-white/10 py-5 text-xs text-[#666860]">
                    <span>Cantinho</span>
                    <span>Pequenos passos. Grandes avanços.</span>
                </footer>
            </div>
        </main>
    );
}
