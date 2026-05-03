"use client"

import { Suspense, useEffect, useMemo, useState } from "react"
import { createPortal } from "react-dom"
import { motion } from "framer-motion"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
    ArrowRight,
    BookOpenText,
    Boxes,
    BriefcaseBusiness,
    CalendarCheck2,
    Check,
    ChevronDown,
    FileText,
    Flag,
    Gift,
    Layers3,
    Palette,
    PackageCheck,
    X,
} from "lucide-react"

const WHATSAPP_NUMBER = "551128588080"

function buildWhatsappUrl(message: string) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

type ProductCategoryId =
    | "empresa"
    | "treinamento"
    | "evento"
    | "papelaria"
    | "promocionais"
    | "pdv"
    | "comunicacao-visual"
    | "revistas-catalogos"
    | "kits"
    | "livros"

type ProductCategory = {
    id: ProductCategoryId
    eyebrow: string
    title: string
    description: string
    items: string[]
    Icon: React.ComponentType<{ className?: string }>
}

const productCategories: ProductCategory[] = [
    {
        id: "empresa",
        eyebrow: "Corporativo",
        title: "Impressos para sua Empresa",
        description:
            "Materiais institucionais, comerciais e operacionais para fortalecer a apresentação da sua marca.",
        Icon: BriefcaseBusiness,
        items: [
            "Folders",
            "Flyers",
            "Apresentações impressas",
            "Pastas corporativas",
            "Cartões institucionais",
            "Materiais comerciais",
        ],
    },
    {
        id: "treinamento",
        eyebrow: "Capacitação",
        title: "Impressos para o seu treinamento",
        description:
            "Materiais personalizados para cursos, workshops, integrações, eventos internos e treinamentos corporativos.",
        Icon: FileText,
        items: [
            "Apostilas",
            "Certificados",
            "Crachás",
            "Guias de turma",
            "Materiais com dados variáveis",
            "Kits para participantes",
        ],
    },
    {
        id: "evento",
        eyebrow: "Eventos",
        title: "Impressos para o seu evento",
        description:
            "Soluções impressas para recepção, identificação, sinalização e experiência dos participantes.",
        Icon: CalendarCheck2,
        items: [
            "Convites",
            "Credenciais",
            "Tags",
            "Programação do evento",
            "Banners",
            "Materiais de apoio",
        ],
    },
    {
        id: "papelaria",
        eyebrow: "Identidade",
        title: "Papelaria",
        description:
            "Materiais de papelaria para uma comunicação mais profissional e consistente.",
        Icon: FileText,
        items: [
            "Cartões de visita",
            "Envelopes",
            "Papel timbrado",
            "Pastas",
            "Blocos",
            "Receituários",
        ],
    },
    {
        id: "promocionais",
        eyebrow: "Promoção",
        title: "Promocionais",
        description:
            "Peças promocionais para campanhas, ações de marca, ativações e relacionamento com clientes.",
        Icon: Gift,
        items: [
            "Tags personalizadas",
            "Adesivos",
            "Brindes impressos",
            "Materiais para kits",
            "Peças sazonais",
            "Materiais de campanha",
        ],
    },
    {
        id: "pdv",
        eyebrow: "Ponto de venda",
        title: "PDV e sinalizações",
        description:
            "Materiais para destacar produtos, orientar clientes e melhorar a comunicação no ambiente físico.",
        Icon: Flag,
        items: [
            "Displays",
            "Placas",
            "Sinalização interna",
            "Totens",
            "Faixas",
            "Materiais de ponto de venda",
        ],
    },
    {
        id: "comunicacao-visual",
        eyebrow: "Grandes formatos",
        title: "Comunicação Visual",
        description:
            "Soluções visuais para ambientes, fachadas, eventos, vitrines e campanhas de grande impacto.",
        Icon: Palette,
        items: [
            "Banners",
            "Adesivos",
            "Lonas",
            "Painéis",
            "Roll-ups",
            "Peças de ambientação",
        ],
    },
    {
        id: "revistas-catalogos",
        eyebrow: "Editorial",
        title: "Revistas e Catálogos",
        description:
            "Materiais editoriais e comerciais com acabamento profissional para apresentar produtos, serviços e conteúdos.",
        Icon: BookOpenText,
        items: [
            "Revistas",
            "Catálogos",
            "Manuais",
            "Guias",
            "Publicações institucionais",
            "Materiais editoriais",
        ],
    },
    {
        id: "kits",
        eyebrow: "Experiência",
        title: "Kits de materiais",
        description:
            "Combinações de impressos para eventos, treinamentos, onboarding, ações promocionais e campanhas.",
        Icon: PackageCheck,
        items: [
            "Kits para eventos",
            "Kits para treinamentos",
            "Kits corporativos",
            "Kits promocionais",
            "Combos de materiais",
            "Materiais personalizados",
        ],
    },
    {
        id: "livros",
        eyebrow: "Produção especial",
        title: "Livros",
        description:
            "Produção de livros, materiais encadernados e publicações especiais com acabamento adequado ao projeto.",
        Icon: Layers3,
        items: [
            "Livros",
            "Apostilas encadernadas",
            "Materiais técnicos",
            "Publicações especiais",
            "Projetos editoriais",
            "Acabamentos personalizados",
        ],
    },
]

function isValidCategory(value: string | null): value is ProductCategoryId {
    return productCategories.some((category) => category.id === value)
}

export default function EmpresasProdutosPage() {
    return (
        <Suspense fallback={<ProdutosLoading />}>
            <EmpresasProdutosContent />
        </Suspense>
    )
}

function EmpresasProdutosContent() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const categoryParam = searchParams.get("categoria")
    const selectedCategoryId = isValidCategory(categoryParam)
        ? categoryParam
        : null

    const selectedCategory = selectedCategoryId
        ? productCategories.find((category) => category.id === selectedCategoryId)
        : null

    const filteredCategories = useMemo(() => {
        if (!selectedCategoryId) return productCategories

        return productCategories.filter(
            (category) => category.id === selectedCategoryId,
        )
    }, [selectedCategoryId])

    function setCategory(categoryId: ProductCategoryId | null) {
        const params = new URLSearchParams(searchParams.toString())

        if (categoryId) {
            params.set("categoria", categoryId)
        } else {
            params.delete("categoria")
        }

        const queryString = params.toString()
        const nextUrl = queryString ? `${pathname}?${queryString}` : pathname

        router.push(nextUrl, { scroll: false })
        setMobileFiltersOpen(false)
    }

    return (
        <main className="min-h-full bg-background text-foreground">
            <div className="relative overflow-visible">
                <BackgroundEffects />

                <section className="relative z-10 mx-auto max-w-7xl px-4 pb-24 pt-8 md:px-6 md:pb-32 md:pt-12 lg:px-8">
                    <div className="mx-auto max-w-4xl text-center">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand-soft px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-brand backdrop-blur-xl">
                            <Boxes className="h-4 w-4" />
                            Produtos
                        </div>

                        <h1 className="text-4xl font-black leading-[0.94] tracking-[-0.06em] text-foreground md:text-6xl lg:text-7xl">
                            Soluções gráficas para cada etapa da sua comunicação.
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted md:text-lg md:leading-8">
                            {selectedCategory
                                ? `Você está visualizando a categoria ${selectedCategory.title}.`
                                : "Conheça as principais categorias de materiais que a D'Print produz para empresas, treinamentos, eventos, campanhas e projetos personalizados."}
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-3">
                            <button
                                type="button"
                                onClick={() => setMobileFiltersOpen(true)}
                                className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-surface-soft px-5 py-3 text-sm font-black text-foreground shadow-sm backdrop-blur-xl transition hover:border-brand/40 hover:bg-brand-soft hover:text-brand lg:hidden"
                            >
                                Filtrar produtos
                                <ChevronDown className="h-4 w-4" />
                            </button>

                            <a
                                href="/empresas#contato"
                                className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-black text-white shadow-xl shadow-brand/25 transition hover:-translate-y-0.5 hover:bg-brand-dark"
                            >
                                Solicitar orçamento
                                <ArrowRight className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    <div className="mt-16 lg:pl-[276px]">
                        <div className="min-w-0">
                            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <p className="text-sm font-bold text-muted">
                                        {selectedCategory
                                            ? "Categoria selecionada"
                                            : "Mostrando todas as categorias"}
                                    </p>

                                    <h2 className="mt-1 text-2xl font-black tracking-[-0.045em] text-foreground md:text-3xl">
                                        {selectedCategory?.title ?? "Todos os produtos"}
                                    </h2>
                                </div>

                                {selectedCategory ? (
                                    <button
                                        type="button"
                                        onClick={() => setCategory(null)}
                                        className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-surface-soft px-4 py-2.5 text-sm font-black text-foreground shadow-sm backdrop-blur-xl transition hover:border-brand/40 hover:bg-brand-soft hover:text-brand"
                                    >
                                        Limpar filtro
                                        <X className="h-4 w-4" />
                                    </button>
                                ) : null}
                            </div>

                            <motion.div layout className="grid gap-5 md:grid-cols-2 xl:grid-cols-2">
                                {filteredCategories.map((category, index) => {
                                    const Icon = category.Icon

                                    return (
                                        <motion.article
                                            layout
                                            key={category.id}
                                            initial={{ opacity: 0, y: 24 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.45, delay: index * 0.04 }}
                                            className="group relative overflow-hidden rounded-[2rem] border border-border-soft bg-surface-soft p-6 shadow-2xl shadow-black/10 backdrop-blur-2xl transition hover:-translate-y-1 hover:border-brand/45 hover:shadow-brand/20"
                                        >
                                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,var(--brand-soft),transparent_36%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_44%)] opacity-80 transition group-hover:opacity-100" />

                                            <div className="relative">
                                                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-white shadow-xl shadow-brand/25 transition group-hover:scale-105">
                                                    <Icon className="h-7 w-7" />
                                                </div>

                                                <p className="mb-2 text-xs font-black uppercase tracking-[0.24em] text-brand">
                                                    {category.eyebrow}
                                                </p>

                                                <h3 className="text-2xl font-black leading-tight tracking-[-0.045em] text-foreground">
                                                    {category.title}
                                                </h3>

                                                <p className="mt-3 text-sm leading-7 text-muted">
                                                    {category.description}
                                                </p>

                                                <div className="mt-5 flex flex-wrap gap-2">
                                                    {category.items.map((item) => (
                                                        <span
                                                            key={item}
                                                            className="rounded-full border border-border-soft bg-background/35 px-3 py-1.5 text-xs font-bold text-soft backdrop-blur-xl"
                                                        >
                                                            {item}
                                                        </span>
                                                    ))}
                                                </div>

                                                <a
                                                    href={buildWhatsappUrl(`Olá! Gostaria de um orçamento para ${category.title}.`)}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2.5 text-sm font-black text-white shadow-xl shadow-brand/25 transition hover:-translate-y-0.5 hover:bg-brand-dark"
                                                >
                                                    Solicitar orçamento
                                                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                                                </a>
                                            </div>
                                        </motion.article>
                                    )
                                })}
                            </motion.div>
                        </div>
                    </div>
                </section>

                {mounted
                    ? createPortal(
                        <aside className="fixed left-0 top-[88px] z-[760] hidden h-[calc(100dvh-104px)] w-[258px] px-3 lg:block">
                            <ProductFilterPanel
                                selectedCategoryId={selectedCategoryId}
                                onSelectCategory={setCategory}
                                compact
                            />
                        </aside>,
                        document.body,
                    )
                    : null}

                {mobileFiltersOpen ? (
                    <MobileFilterModal
                        selectedCategoryId={selectedCategoryId}
                        onSelectCategory={setCategory}
                        onClose={() => setMobileFiltersOpen(false)}
                    />
                ) : null}
            </div>
        </main>
    )
}

function ProductFilterPanel({
    selectedCategoryId,
    onSelectCategory,
    compact = false,
}: {
    selectedCategoryId: ProductCategoryId | null
    onSelectCategory: (categoryId: ProductCategoryId | null) => void
    compact?: boolean
}) {
    return (
        <div className="h-full">
            <div
                className={`relative flex h-full flex-col overflow-hidden border border-border-soft bg-surface-soft shadow-2xl shadow-black/10 backdrop-blur-2xl ${compact
                        ? "rounded-r-[1.75rem] rounded-l-none p-3"
                        : "rounded-[2rem] p-4"
                    }`}
            >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,var(--brand-soft),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_44%)]" />

                <div className="relative flex min-h-0 flex-1 flex-col">
                    <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-brand">
                        Filtrar por
                    </p>

                    <div className="min-h-0 flex-1 overflow-y-auto pr-1 scrollbar-empresas">
                        <button
                            type="button"
                            onClick={() => onSelectCategory(null)}
                            className={`mb-2 flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left text-sm font-black transition ${selectedCategoryId === null
                                    ? "bg-brand text-white shadow-xl shadow-brand/25"
                                    : "border border-border-soft bg-background/30 text-foreground hover:border-brand/40 hover:bg-brand-soft hover:text-brand"
                                }`}
                        >
                            Produtos
                            {selectedCategoryId === null ? <Check className="h-4 w-4" /> : null}
                        </button>

                        <div className="grid gap-2">
                            {productCategories.map((category) => {
                                const active = selectedCategoryId === category.id
                                const Icon = category.Icon

                                return (
                                    <button
                                        key={category.id}
                                        type="button"
                                        onClick={() => onSelectCategory(category.id)}
                                        className={`flex w-full items-center gap-2 rounded-2xl px-3 py-3 text-left text-sm font-bold transition ${active
                                                ? "bg-brand text-white shadow-xl shadow-brand/25"
                                                : "border border-border-soft bg-background/25 text-muted hover:border-brand/40 hover:bg-brand-soft hover:text-brand"
                                            }`}
                                    >
                                        <Icon className="h-4 w-4 shrink-0" />
                                        <span className="min-w-0 flex-1 leading-tight">
                                            {category.title}
                                        </span>
                                        {active ? <Check className="h-4 w-4 shrink-0" /> : null}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function MobileFilterModal({
    selectedCategoryId,
    onSelectCategory,
    onClose,
}: {
    selectedCategoryId: ProductCategoryId | null
    onSelectCategory: (categoryId: ProductCategoryId | null) => void
    onClose: () => void
}) {
    return createPortal(
        <div className="fixed inset-0 z-[950] bg-black/45 p-4 backdrop-blur-sm lg:hidden">
            <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

            <motion.div
                initial={{ opacity: 0, x: -24, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -24, scale: 0.98 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full max-w-sm overflow-hidden rounded-[2rem] border border-border-soft bg-background/92 p-4 shadow-2xl shadow-black/35 backdrop-blur-2xl"
            >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,var(--brand-soft),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_44%)]" />

                <div className="relative flex h-full flex-col">
                    <div className="mb-4 flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-black uppercase tracking-[0.24em] text-brand">
                                Filtro
                            </p>

                            <h2 className="mt-1 text-2xl font-black tracking-[-0.045em]">
                                Produtos
                            </h2>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-soft bg-surface-soft text-foreground"
                            aria-label="Fechar filtros"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="min-h-0 flex-1 overflow-y-auto pr-1 scrollbar-empresas">
                        <ProductFilterPanel
                            selectedCategoryId={selectedCategoryId}
                            onSelectCategory={onSelectCategory}
                        />
                    </div>
                </div>
            </motion.div>
        </div>,
        document.body,
    )
}

function ProdutosLoading() {
    return (
        <main className="min-h-full bg-background text-foreground">
            <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8">
                <div className="h-8 w-40 animate-pulse rounded-full bg-surface-soft" />
                <div className="mt-6 h-16 max-w-3xl animate-pulse rounded-3xl bg-surface-soft" />
                <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-64 animate-pulse rounded-[2rem] border border-border-soft bg-surface-soft"
                        />
                    ))}
                </div>
            </div>
        </main>
    )
}

function BackgroundEffects() {
    return (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <motion.div
                className="theme-glow-primary absolute left-1/2 top-[-12rem] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full blur-[100px] md:h-[42rem] md:w-[42rem] md:blur-[140px]"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.45, 0.8, 0.45],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="theme-glow-secondary absolute right-[-10rem] top-[42rem] h-[24rem] w-[24rem] rounded-full blur-[100px] md:h-[34rem] md:w-[34rem] md:blur-[130px]"
                animate={{
                    x: [0, -28, 0],
                    y: [0, 22, 0],
                    opacity: [0.25, 0.55, 0.25],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute left-[-12rem] top-[92rem] h-[26rem] w-[26rem] rounded-full bg-brand opacity-15 blur-[110px] md:h-[38rem] md:w-[38rem] md:blur-[150px]"
                animate={{
                    x: [0, 28, 0],
                    y: [0, -18, 0],
                    scale: [1, 1.12, 1],
                    opacity: [0.1, 0.22, 0.1],
                }}
                transition={{
                    duration: 11,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,var(--brand-soft),transparent_32%),linear-gradient(to_bottom,rgba(255,255,255,0.045),transparent_28%,rgba(255,255,255,0.025)_55%,transparent_82%)]" />
        </div>
    )
}
