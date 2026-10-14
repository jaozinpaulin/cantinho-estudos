export default function Home() {
    return (
        <main className="min-h-screen p-8 md:p-16 flex flex-col justify-between">
            <header className="flex justify-between items-center border-b border-cafe-700/50 pb-6">
                <div>
                    <h1 className="font-serif text-2xl tracking-wide text-crema-100">Cantinho</h1>
                    <p className="text-sm text-canela mt-1">Seu espaço de estudos e lapidação de idiomas</p>
                </div>
                <div className="text-xs text-canela bg-cafe-800 px-3 py-1.5 rounded-md border border-cafe-700">
                    Versão 0.1
                </div>
            </header>

            <section className="my-auto py-12">
                <div className="max-w-xl mx-auto text-center space-y-4">
                    <h2 className="font-serif text-3xl text-crema-100">Tudo pronto por aqui.</h2>
                    <p className="text-crema-200 text-sm leading-relaxed">
                        O ambiente está configurado com a paleta aconchegante de cafeteria.
                        Pronto para começarmos a estruturar as telas de captura e o laboratório de frases?
                    </p>
                </div>
            </section>

            <footer className="text-center text-xs text-canela/60 border-t border-cafe-700/30 pt-6">
                Estudos de inglês baseados em input real • Feito com calma.
            </footer>
        </main>
    );
}