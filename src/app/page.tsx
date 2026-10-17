'use client';

import { useState, useEffect } from 'react';
import { ArrowUpRight, Search, Plus, StickyNote } from 'lucide-react';
import WordDetails from './components/WordDetails';
import Notepad from './components/Notepad';


interface PalavrasType {
    id: string;
    palavra: string;
    imagem: string;
}

export default function Home() {
    const [itens, setItens] = useState<PalavrasType[]>([]);
    const [carregado, setCarregado] = useState(false);
    const [palavra, setPalavra] = useState('');
    const [busca, setBusca] = useState('');
    const [palavraSelecionada, setPalavraSelecionada] =
        useState<PalavrasType | null>(null);
    const [openNote, setOpenNote] = useState(false);

    useEffect(() => {
        const salvas = localStorage.getItem('palavras');

        if (salvas) {
            try {
                setItens(JSON.parse(salvas));
            } catch {
                localStorage.removeItem('palavras');
            }
        }

        setCarregado(true);
    }, []);

    useEffect(() => {
        if (carregado) {
            localStorage.setItem('palavras', JSON.stringify(itens));
        }
    }, [itens, carregado]);

    function adicionarPalavra(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!palavra.trim()) return;

        setItens((prev) => [
            {
                id: Date.now().toString(),
                palavra: palavra.trim(),
                imagem:
                    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
            },
            ...prev,
        ]);

        setPalavra('');
    }

    const filtrados = itens.filter((item) =>
        item.palavra.toLowerCase().includes(busca.toLowerCase()),
    );

    return (
        <main className="min-h-screen bg-matcha-950 text-crema-100">
            <div className="mx-auto min-h-screen max-w-7xl border-x border-cafe-700/40 bg-cafe-900/80 px-6 py-6 sm:px-10">
                <header className="flex items-center justify-between border-b border-cafe-700 pb-4">
                    <h1 className="text-base font-medium tracking-tight">
                        Cantinho
                    </h1>

                    <span className="text-xs text-crema-200">
                        {itens.length}{' '}
                        {itens.length === 1 ? 'registro' : 'registros'}
                    </span>
                </header>

                <div className="border-b border-cafe-700 py-7 sm:py-8">
                    <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">
                        Seu inglês, uma expressão de cada vez.
                    </h2>

                    <p className="mt-2 text-sm text-crema-200">
                        Anote palavras, explore exemplos e construa seu repertório.
                    </p>

                    <form onSubmit={adicionarPalavra} className="mt-5 flex gap-3">
                        <input
                            type="text"
                            value={palavra}
                            onChange={(e) => setPalavra(e.target.value)}
                            placeholder="Anote uma palavra ou expressão..."
                            className="h-12 min-w-0 flex-1 rounded-xl border border-cafe-700 bg-cafe-850 px-4 text-sm text-crema-100 outline-none transition-colors placeholder:text-crema-300 focus:border-canela/50"
                        />

                        <button
                            type="submit"
                            className="flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-canela px-5 text-sm font-medium text-crema-100 transition-colors hover:bg-canela-dark"
                        >
                            <Plus size={16} />
                            Anotar
                        </button>
                    </form>
                </div>

                <div className="py-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h3 className="text-base font-medium">
                                Seus registros
                            </h3>

                            <p className="mt-1 text-xs text-crema-200">
                                Tudo o que você está aprendendo.
                            </p>
                        </div>

                        <button onClick={() => setOpenNote(true)}>
                            <StickyNote size={20} />
                        </button>

                        <div className="relative sm:w-64">
                            <Search
                                size={15}
                                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-crema-300"
                            />

                            <input
                                type="text"
                                value={busca}
                                onChange={(e) => setBusca(e.target.value)}
                                placeholder="Buscar registros..."
                                className="h-9 w-full rounded-lg border border-cafe-700 bg-cafe-850 pl-9 pr-3 text-xs text-crema-100 outline-none transition-colors placeholder:text-crema-300 focus:border-canela/50"
                            />
                        </div>
                    </div>

                    <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {filtrados.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => setPalavraSelecionada(item)}
                                className="group flex flex-col overflow-hidden rounded-xl border border-cafe-700 bg-cafe-850 text-left transition-colors hover:border-canela/50"
                            >
                                <img
                                    src={item.imagem}
                                    alt={item.palavra}
                                    className="h-40 w-full border-b border-cafe-700 object-cover"
                                />

                                <div className="flex items-center justify-between gap-3 p-3.5">
                                    <h3 className="truncate text-sm font-medium text-crema-100">
                                        {item.palavra}
                                    </h3>

                                    <ArrowUpRight
                                        size={16}
                                        className="shrink-0 text-crema-300 transition-colors group-hover:text-canela"
                                    />
                                </div>
                            </button>
                        ))}
                    </div>

                    {filtrados.length === 0 && (
                        <p className="mt-5 rounded-xl border border-cafe-700 bg-cafe-850 py-10 text-center text-sm text-crema-200">
                            Nenhum registro encontrado.
                        </p>
                    )}
                </div>
            </div>

            <WordDetails
                isOpen={!!palavraSelecionada}
                onClose={() => setPalavraSelecionada(null)}
                palavra={palavraSelecionada?.palavra ?? ''}
                imagem={palavraSelecionada?.imagem ?? ''}
            />
            {openNote && <Notepad onClose={() => setOpenNote(false)} />}
        </main>
    );
}