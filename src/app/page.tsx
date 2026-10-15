'use client';

import { useState } from 'react';
import { ArrowUpRight, Search, Plus, BookOpen } from 'lucide-react';
import WordDetails from './components/WordDetails';

interface PalavrasType {
    id: string;
    palavra: string;
    imagem: string;
}

const frasesIniciais: PalavrasType[] = [
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
    const [palavraSelecionada, setPalavraSelecionada] =
        useState<PalavrasType | null>(null);

    function adicionarPalavra(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!palavra.trim()) return;

        setItens([
            {
                id: Date.now().toString(),
                palavra: palavra.trim(),
                imagem:
                    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop',
            },
            ...itens,
        ]);

        setPalavra('');
    }

    const filtrados = itens.filter((item) =>
        item.palavra.toLowerCase().includes(busca.toLowerCase()),
    );

    return (
        <main className="min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,#191919_0%,#141414_240px,#141414_100%)] text-neutral-200">
            <div className="mx-auto min-h-screen max-w-5xl border-x border-white/[0.05] px-5 py-7 sm:px-8">
                <header className="flex items-center justify-between border-b border-white/10 pb-5">
                    <div className="flex items-center gap-3">
                        <BookOpen size={20} className="text-neutral-300" />

                        <h1 className="text-lg font-medium tracking-tight">
                            Cantinho
                        </h1>
                    </div>

                    <span className="text-sm text-neutral-400">
                        {itens.length} {itens.length === 1 ? 'registro' : 'registros'}
                    </span>
                </header>

                <div className="border-b border-white/[0.06] py-12 sm:py-16">
                    <h2 className="max-w-xl text-3xl font-medium tracking-tight text-neutral-100 sm:text-4xl">
                        Seu inglês, uma expressão de cada vez.
                    </h2>

                    <p className="mt-3 max-w-md text-sm leading-6 text-neutral-400">
                        Anote palavras, explore exemplos e construa seu próprio repertório.
                    </p>
                </div>
                <form
                    onSubmit={adicionarPalavra}
                    className="mt-7 flex flex-col gap-3 rounded-xl border border-white/10 bg-[#1B1B1B] p-3 sm:flex-row">
                    <input
                        value={palavra}
                        onChange={(e) => setPalavra(e.target.value)}
                        placeholder="Anote uma palavra ou expressão..."
                        className="min-w-0 flex-1 rounded-lg bg-transparent px-4 py-3 text-sm text-neutral-100 outline-none placeholder:text-neutral-500"
                    />

                    <button
                        type="submit"
                        className="flex items-center cursor-pointer justify-center gap-2 rounded-lg bg-canela px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-canela-dark">
                        <Plus size={16} />
                        Anotar
                    </button>
                </form>

                <div className="mt-12 pb-10">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-lg font-medium text-neutral-100">
                                Seus registros
                            </h2>

                            <p className="mt-1 text-sm text-neutral-500">
                                Tudo o que você está aprendendo.
                            </p>
                        </div>

                        <div className="relative sm:w-64">
                            <Search
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
                            />

                            <input
                                value={busca}
                                onChange={(e) => setBusca(e.target.value)}
                                placeholder="Buscar registros..."
                                className="w-full rounded-lg border border-white/10 bg-[#1B1B1B] py-2.5 pl-9 pr-3 text-sm text-neutral-100 outline-none transition-colors placeholder:text-neutral-500 focus:border-white/25 focus:bg-[#202020]"
                            />
                        </div>
                    </div>

                    <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {filtrados.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => setPalavraSelecionada(item)}
                                className="group overflow-hidden rounded-xl border border-white/10 bg-[#1B1B1B] text-left transition-colors hover:border-white/20 hover:bg-[#202020]"
                            >
                                <img
                                    src={item.imagem}
                                    alt={item.palavra}
                                    className="h-44 w-full border-b border-white/[0.06] object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                                />

                                <div className="flex items-center justify-between p-4">
                                    <h3 className="font-medium text-neutral-200">
                                        {item.palavra}
                                    </h3>

                                    <ArrowUpRight
                                        size={18}
                                        className="text-neutral-500 transition-colors group-hover:text-neutral-200"
                                    />
                                </div>
                            </button>
                        ))}
                    </div>

                    {filtrados.length === 0 && (
                        <p className="rounded-xl border border-white/10 bg-[#1B1B1B] py-12 text-center text-sm text-neutral-500">
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
        </main>
    );
}