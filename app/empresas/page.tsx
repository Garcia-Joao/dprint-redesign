"use client"

import { AnimatePresence, motion } from "framer-motion"
import type { ComponentType } from "react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import TransitionLink from "../TransitionLink"
import {
    ArrowLeft,
    ArrowRight,
    Award,
    Building2,
    CalendarCheck2,
    Clock,
    Layers3,
    MapPin,
    MousePointer2,
    Navigation,
    Palette,
    Phone,
    Printer,
    QrCode,
    Sparkles,
    Store,
    Zap,
    Mail,
    ExternalLink,
} from "lucide-react"

type SlideImageMode = "full" | "cutout" | "info" | "anniversary"

type IllustrationProps = {
    className?: string
}

type HighlightSlide = {
    id: number
    eyebrow: string
    title: string
    description: string
    detail?: string
    imageSrc?: string
    imageAlt?: string
    imageMode: SlideImageMode
    Icon: ComponentType<{ className?: string }>
}

type MaterialCard = {
    title: string
    description: string
    imageSrc: string
    imageAlt: string
    href: string
}

type Service = {
    title: string
    description: string
    Icon: ComponentType<{ className?: string }>
}

type CanvasProduct = {
    id: string
    title: string
    tag: string
    description: string
    Illustration: ComponentType<IllustrationProps>
    x: number
    y: number
    width: number
    zIndex?: number
    tooltip: "left" | "right"
}

const AUTOPLAY_DELAY = 7000
const CANVAS_PRODUCT_SCALE = 0.68

const CANVAS_WRAP_PADDING_X = 4
const CANVAS_WRAP_PADDING_Y = 10

const WHATSAPP_NUMBER = "551128588080"
const PHONE_BRAS = "1128588080"
const PHONE_BELA_VISTA = "1135423676"

function buildWhatsappUrl(message: string) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

const defaultBudgetMessage =
    "Olá! Gostaria de solicitar um orçamento para materiais gráficos corporativos."

const pageSections = [
    { id: "inicio", label: "Início" },
    { id: "solucoes", label: "Soluções" },
    { id: "servicos", label: "Serviços" },
    { id: "personalizados", label: "Personalizados" },
    { id: "estrutura", label: "Estrutura" },
    { id: "contato", label: "Contato" },
]

const slides: HighlightSlide[] = [
    {
        id: 1,
        eyebrow: "Reconhecimento nacional",
        title: "2x vencedora do prêmio Fernando Pini",
        description: "Categoria: Impressão digital em grandes formatos.",
        detail:
            "Um dos principais reconhecimentos da indústria gráfica brasileira, destacando excelência técnica, acabamento e impacto visual.",
        imageSrc: "/empresas/fernando-pini.jpg",
        imageAlt: "Destaque do prêmio Fernando Pini",
        imageMode: "full",
        Icon: Award,
    },
    {
        id: 2,
        eyebrow: "Tecnologia de impressão",
        title: "Océ Arizona 460GT",
        description: "Impressão com qualidade fotográfica.",
        detail:
            "Equipamento para produção rígida e grandes formatos, ideal para materiais com alto nível de definição, presença visual e acabamento profissional.",
        imageSrc: "/empresas/oce-arizona-460gt.png",
        imageAlt: "Impressora Océ Arizona 460GT",
        imageMode: "cutout",
        Icon: Printer,
    },
    {
        id: 3,
        eyebrow: "Tecnologia de impressão",
        title: "Konica Minolta AccurioPress C16100",
        description: "Impressão digital com várias mídias.",
        detail:
            "Alta produtividade, excelente definição e versatilidade para aplicações em diferentes tipos de materiais e demandas corporativas.",
        imageSrc: "/empresas/konica-minolta-accuriopress-c16100.png",
        imageAlt: "Konica Minolta AccurioPress C16100",
        imageMode: "cutout",
        Icon: Printer,
    },
    {
        id: 4,
        eyebrow: "Atendimento presencial",
        title: "Visite nossa loja física na Bela Vista",
        description: "Atendimento rápido, presencial e próximo de você.",
        detail:
            "Loja física para impressões rápidas, atendimento presencial e suporte ao cliente.",
        imageMode: "info",
        Icon: Building2,
    },
    {
        id: 5,
        eyebrow: "Planejamento para eventos",
        title: "Receba o nosso Checklist para planejamento de eventos",
        description:
            "Um material prático para organizar etapas, materiais e necessidades do seu evento com mais segurança.",
        detail:
            "Ideal para quem quer estruturar melhor a comunicação visual, impressos e pontos de apoio antes da produção.",
        imageSrc: "/empresas/checklist-eventos.jpg",
        imageAlt: "Checklist para planejamento de eventos",
        imageMode: "full",
        Icon: CalendarCheck2,
    },
    {
        id: 6,
        eyebrow: "Grandes formatos",
        title: "CANON OCE COLORADO 1640 UVGEL",
        description: "Formato de até 1,60m de largura.",
        detail:
            "Solução para produção em grandes formatos com qualidade, produtividade e excelente impacto visual para ambientes, campanhas e comunicação.",
        imageSrc: "/empresas/canon-oce-colorado-1640-uvgel.png",
        imageAlt: "Canon Oce Colorado 1640 UVGel",
        imageMode: "cutout",
        Icon: Printer,
    },
    {
        id: 7,
        eyebrow: "Nossa trajetória",
        title: "DPrint 10 anos",
        description: "10 anos de cores, transformações e relacionamentos.",
        detail:
            "Uma história construída com confiança, evolução constante e parceria com clientes, marcas e projetos de diferentes portes.",
        imageMode: "anniversary",
        Icon: Sparkles,
    },
]

const materialCards: MaterialCard[] = [
    {
        title: "Impressos para a sua Empresa",
        description:
            "Materiais institucionais, comerciais e promocionais para fortalecer a presença da sua marca.",
        imageSrc: "/empresas/impressos-empresa.png",
        imageAlt: "Impressos para empresas",
        href: buildWhatsappUrl("Olá! Gostaria de um orçamento para impressos para empresa."),
    },
    {
        title: "Papelaria",
        description:
            "Cartões, envelopes, pastas, timbrados e materiais essenciais para uma comunicação profissional.",
        imageSrc: "/empresas/papelaria.png",
        imageAlt: "Papelaria corporativa",
        href: buildWhatsappUrl("Olá! Gostaria de um orçamento para papelaria corporativa."),
    },
    {
        title: "PDV e Sinalizações",
        description:
            "Displays, placas, comunicação visual e materiais para destacar produtos, ambientes e campanhas.",
        imageSrc: "/empresas/pdv-sinalizacoes.png",
        imageAlt: "PDV e sinalizações",
        href: buildWhatsappUrl("Olá! Gostaria de um orçamento para PDV e sinalizações."),
    },
    {
        title: "Revistas e Catálogos",
        description:
            "Projetos editoriais, catálogos comerciais e materiais impressos com acabamento profissional.",
        imageSrc: "/empresas/revistas-catalogos.png",
        imageAlt: "Revistas e catálogos",
        href: buildWhatsappUrl("Olá! Gostaria de um orçamento para revistas e catálogos."),
    },
]

const services: Service[] = [
    {
        title: "Impressão Digital",
        description:
            "A impressão digital é um dos métodos mais utilizados para impressão de materiais gráficos. Sob demanda, produz impressos personalizados com agilidade e promove uma solução flexível para a necessidade de cada cliente.",
        Icon: Zap,
    },
    {
        title: "Impressão Offset",
        description:
            "Estamos com um novo parque gráfico com uma impressora Heidelberg 4 cores. Acabamento completo para melhor servir os nossos clientes que necessitam de tiragens maiores e com custos unitários mais competitivos.",
        Icon: Layers3,
    },
    {
        title: "Comunicação Visual",
        description:
            "A comunicação visual é essencial para qualquer empresa. Conquiste a atenção do público alvo, fortaleça a marca e reforce seus valores no mercado.",
        Icon: Palette,
    },
    {
        title: "Impressão de Dados Variáveis",
        description:
            "A impressão de dados variáveis permite que você alcance os clientes em um nível mais pessoal, melhorando a comunicação e a interação. Utilizando esta tecnologia, as informações podem ser editadas e modificadas de acordo com as necessidades específicas de cada cliente.",
        Icon: QrCode,
    },
]

const canvasProducts: CanvasProduct[] = [
    {
        id: "convite",
        title: "Convite com dados variáveis",
        tag: "Dados variáveis",
        description:
            "Convites personalizados para eventos, treinamentos e ações corporativas, com nome, turma, data e outras informações individuais.",
        Illustration: InvitationSvg,
        x: 1.8,
        y: -3.7,
        width: 235,
        tooltip: "right",
    },
    {
        id: "cracha",
        title: "Crachás com nome, fotografia e turma",
        tag: "Identificação",
        description:
            "Crachás personalizados para participantes, alunos e equipes, com nome, fotografia, turma e dados variáveis.",
        Illustration: BadgeSvg,
        x: 8.7,
        y: 25.1,
        width: 245,
        tooltip: "right",
    },
    {
        id: "tag",
        title: "Tag de mala personalizada",
        tag: "Promocional",
        description:
            "Tags para kits, viagens, eventos e ações promocionais, com personalização individual e identidade visual da marca.",
        Illustration: LuggageTagSvg,
        x: 28.5,
        y: 0.1,
        width: 175,
        zIndex: 12,
        tooltip: "left",
    },
    {
        id: "banner",
        title: "Banner roll-up de boas-vindas",
        tag: "Comunicação visual",
        description:
            "Banner vertical para recepção, eventos, treinamentos e ambientação de espaços corporativos.",
        Illustration: RollupSvg,
        x: 34.7,
        y: -1.1,
        width: 205,
        zIndex: 8,
        tooltip: "left",
    },
    {
        id: "apostila",
        title: "Apostila com nome do aluno",
        tag: "Treinamentos",
        description:
            "Apostilas personalizadas para cursos, treinamentos e capacitações, com nome do aluno e informações variáveis.",
        Illustration: NotebookSvg,
        x: 1.8,
        y: 13.7,
        width: 235,
        tooltip: "right",
    },
    {
        id: "guia",
        title: "Guia e programação personalizados",
        tag: "Eventos",
        description:
            "Guias de programação com agenda, horários, informações do evento e personalização para diferentes públicos.",
        Illustration: GuideSvg,
        x: 16.1,
        y: -0.5,
        width: 360,
        zIndex: 9,
        tooltip: "right",
    },
    {
        id: "pasta",
        title: "Pasta personalizada",
        tag: "Papelaria",
        description:
            "Pastas corporativas para propostas, reuniões, treinamentos e apresentações comerciais com acabamento profissional.",
        Illustration: FolderSvg,
        x: 8.7,
        y: -3.7,
        width: 255,
        tooltip: "right",
    },
    {
        id: "certificado",
        title: "Certificado com dados variáveis",
        tag: "Certificação",
        description:
            "Certificados personalizados com nome, curso, carga horária, turma e outros dados variáveis.",
        Illustration: CertificateSvg,
        x: 16.3,
        y: 22.1,
        width: 365,
        zIndex: 7,
        tooltip: "right",
    },
    {
        id: "garrafa",
        title: "Garrafa de água personalizada",
        tag: "Brindes",
        description:
            "Garrafa personalizada para kits, eventos, ativações de marca e experiências corporativas.",
        Illustration: BottleSvg,
        x: 29.9,
        y: 11.1,
        width: 118,
        zIndex: 14,
        tooltip: "left",
    },
]

export default function EmpresasPage() {
    const [current, setCurrent] = useState(0)
    const autoplayRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const activeSlide = useMemo(() => slides[current], [current])

    const clearAutoplay = useCallback(() => {
        if (autoplayRef.current) {
            clearTimeout(autoplayRef.current)
            autoplayRef.current = null
        }
    }, [])

    const scheduleAutoplay = useCallback(() => {
        clearAutoplay()

        autoplayRef.current = setTimeout(() => {
            setCurrent((prev) => (prev + 1) % slides.length)
        }, AUTOPLAY_DELAY)
    }, [clearAutoplay])

    const goToSlide = useCallback(
        (index: number) => {
            setCurrent(index)
            scheduleAutoplay()
        },
        [scheduleAutoplay],
    )

    const goNext = useCallback(() => {
        setCurrent((prev) => (prev + 1) % slides.length)
        scheduleAutoplay()
    }, [scheduleAutoplay])

    const goPrev = useCallback(() => {
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
        scheduleAutoplay()
    }, [scheduleAutoplay])

    useEffect(() => {
        scheduleAutoplay()

        return () => clearAutoplay()
    }, [current, scheduleAutoplay, clearAutoplay])

    return (
        <main className="min-h-dvh bg-background text-foreground">
            <div className="relative overflow-hidden">
                <BackgroundEffects />
                <SectionProgressNav />

                <section className="relative z-10 mx-auto max-w-7xl px-4 pb-24 pt-28 md:px-6 md:pb-32 md:pt-32 lg:px-8">
                    <div id="inicio" className="scroll-mt-28 mb-8 max-w-3xl md:mb-10">
                        <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-brand">
                            Produção gráfica corporativa
                        </p>

                        <h1 className="text-4xl font-black tracking-[-0.055em] md:text-6xl">
                            Estrutura, tecnologia e acabamento para grandes projetos.
                        </h1>

                        <p className="mt-4 text-base leading-7 text-muted md:text-lg md:leading-8">
                            Conheça alguns dos diferenciais, equipamentos, conquistas e
                            soluções que fazem parte da operação da D&apos;Print para empresas.
                        </p>

                        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                            <a
                                href={buildWhatsappUrl(defaultBudgetMessage)}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-black text-white shadow-xl shadow-brand/25 transition hover:-translate-y-0.5 hover:bg-brand-dark"
                            >
                                Solicitar orçamento
                                <ArrowRight className="h-4 w-4" />
                            </a>

                            <a
                                href={`tel:${PHONE_BRAS}`}
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-border-soft bg-surface-soft px-5 py-3 text-sm font-black text-foreground shadow-sm backdrop-blur-xl transition hover:border-brand/45 hover:bg-brand-soft hover:text-brand"
                            >
                                Falar com atendimento
                                <Phone className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    <div
                        className="relative"
                        onMouseEnter={clearAutoplay}
                        onMouseLeave={scheduleAutoplay}
                    >
                        <AnimatePresence mode="wait">
                            {activeSlide.imageMode === "full" ? (
                                <FullImageSlide key={activeSlide.id} slide={activeSlide} />
                            ) : activeSlide.imageMode === "cutout" ? (
                                <CutoutImageSlide key={activeSlide.id} slide={activeSlide} />
                            ) : activeSlide.imageMode === "anniversary" ? (
                                <AnniversarySlide key={activeSlide.id} slide={activeSlide} />
                            ) : (
                                <InfoSlide key={activeSlide.id} slide={activeSlide} />
                            )}
                        </AnimatePresence>

                        <div className="mt-5 flex items-center justify-between gap-4">
                            <div className="flex flex-wrap items-center gap-2">
                                {slides.map((slide, index) => (
                                    <button
                                        key={slide.id}
                                        type="button"
                                        onClick={() => goToSlide(index)}
                                        className={`h-2.5 rounded-full transition-all ${index === current
                                            ? "w-10 bg-brand"
                                            : "w-2.5 bg-foreground/20 hover:bg-brand/50"
                                            }`}
                                        aria-label={`Ir para slide ${index + 1}`}
                                    />
                                ))}
                            </div>

                            <div className="flex shrink-0 items-center gap-2">
                                <button
                                    type="button"
                                    onClick={goPrev}
                                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-soft bg-surface-soft text-foreground shadow-sm backdrop-blur-xl transition hover:border-brand/40 hover:bg-brand-soft hover:text-brand"
                                    aria-label="Slide anterior"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                </button>

                                <button
                                    type="button"
                                    onClick={goNext}
                                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-soft bg-surface-soft text-foreground shadow-sm backdrop-blur-xl transition hover:border-brand/40 hover:bg-brand-soft hover:text-brand"
                                    aria-label="Próximo slide"
                                >
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <SectionDivider />
                    <MaterialsSection />

                    <SectionDivider />
                    <ServicesSection />

                    <SectionDivider />
                    <ProductCanvasSection />

                    <SectionDivider />
                    <VideoStructureSection />

                    <SectionDivider />
                    <ContactSection />
                </section>
            </div>
        </main>
    )
}


function FullImageSlide({ slide }: { slide: HighlightSlide }) {
    const Icon = slide.Icon

    return (
        <motion.article
            initial={{ opacity: 0, y: 20, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.985 }}
            transition={{ duration: 0.42, ease: "easeOut" }}
            className="group relative min-h-[440px] overflow-hidden rounded-[2.25rem] border border-border-soft bg-surface-soft shadow-2xl shadow-black/15 backdrop-blur-2xl md:min-h-[620px]"
        >
            {slide.imageSrc ? (
                <img
                    src={slide.imageSrc}
                    alt={slide.imageAlt || slide.title}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"
                />
            ) : (
                <div className="absolute inset-0 bg-[linear-gradient(135deg,var(--brand-soft),transparent_55%)]" />
            )}

            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.50)_38%,rgba(0,0,0,0.16)_72%,rgba(0,0,0,0.36)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,var(--brand-soft),transparent_34%)]" />

            <div className="relative z-10 flex min-h-[440px] items-end p-5 md:min-h-[620px] md:p-8 lg:p-10">
                <div className="max-w-2xl">
                    <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-white shadow-2xl shadow-brand/30">
                        <Icon className="h-7 w-7" />
                    </div>

                    <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-brand">
                        {slide.eyebrow}
                    </p>

                    <h2 className="max-w-3xl text-4xl font-black leading-[0.95] tracking-[-0.06em] text-white md:text-6xl lg:text-7xl">
                        {slide.title}
                    </h2>

                    <p className="mt-5 max-w-xl text-base font-semibold leading-7 text-white/88 md:text-lg md:leading-8">
                        {slide.description}
                    </p>

                    {slide.detail ? (
                        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/66 md:text-base">
                            {slide.detail}
                        </p>
                    ) : null}
                </div>
            </div>
        </motion.article>
    )
}

function CutoutImageSlide({ slide }: { slide: HighlightSlide }) {
    const Icon = slide.Icon

    return (
        <motion.article
            initial={{ opacity: 0, y: 20, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.985 }}
            transition={{ duration: 0.42, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[2.25rem] border border-border-soft bg-surface-soft shadow-2xl shadow-black/15 backdrop-blur-2xl"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_38%,var(--glow-primary),transparent_34%),radial-gradient(circle_at_24%_72%,var(--brand-soft),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.09),transparent_42%)]" />

            <div className="relative grid min-h-[440px] items-center gap-6 p-5 md:min-h-[620px] md:p-8 lg:grid-cols-[0.85fr_1.15fr] lg:p-10">
                <div className="relative z-10 order-2 lg:order-1">
                    <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-white shadow-2xl shadow-brand/30">
                        <Icon className="h-7 w-7" />
                    </div>

                    <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-brand">
                        {slide.eyebrow}
                    </p>

                    <h2 className="max-w-2xl text-4xl font-black leading-[0.96] tracking-[-0.06em] text-foreground md:text-6xl">
                        {slide.title}
                    </h2>

                    <p className="mt-5 max-w-xl text-base font-semibold leading-7 text-foreground/85 md:text-lg md:leading-8">
                        {slide.description}
                    </p>

                    {slide.detail ? (
                        <p className="mt-4 max-w-xl text-sm leading-7 text-muted md:text-base">
                            {slide.detail}
                        </p>
                    ) : null}
                </div>

                <div className="relative order-1 flex min-h-[300px] items-center justify-center lg:order-2 lg:min-h-[520px]">
                    <motion.div
                        className="absolute h-[78%] w-[78%] rounded-full bg-brand opacity-15 blur-3xl"
                        animate={{
                            scale: [1, 1.08, 1],
                            opacity: [0.12, 0.24, 0.12],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />

                    <div className="absolute bottom-8 h-12 w-[72%] rounded-full bg-black/25 blur-2xl" />

                    {slide.imageSrc ? (
                        <motion.img
                            src={slide.imageSrc}
                            alt={slide.imageAlt || slide.title}
                            className="relative z-10 max-h-[320px] w-full object-contain drop-shadow-[0_35px_45px_rgba(0,0,0,0.35)] md:max-h-[460px] lg:max-h-[560px]"
                            animate={{
                                y: [0, -8, 0],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    ) : (
                        <div className="relative z-10 flex h-[320px] w-full max-w-[520px] items-center justify-center rounded-[2rem] border border-dashed border-border-soft bg-background/30 text-center">
                            <div>
                                <Icon className="mx-auto h-10 w-10 text-brand" />

                                <p className="mt-3 text-sm font-semibold text-muted">
                                    Adicione a imagem em:
                                </p>

                                <p className="mt-1 text-sm font-bold text-foreground">
                                    {slide.imageSrc || "public/empresas/..."}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </motion.article>
    )
}

function InfoSlide({ slide }: { slide: HighlightSlide }) {
    const Icon = slide.Icon

    return (
        <motion.article
            initial={{ opacity: 0, y: 20, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.985 }}
            transition={{ duration: 0.42, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[2.25rem] border border-brand/30 bg-surface-soft shadow-2xl shadow-brand/15 backdrop-blur-2xl"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_16%,var(--brand-soft),transparent_30%),radial-gradient(circle_at_82%_74%,var(--glow-primary),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.10),transparent_42%)]" />

            <motion.div
                className="absolute right-[-6rem] top-[-6rem] h-80 w-80 rounded-full border border-brand/20"
                animate={{
                    rotate: 360,
                    scale: [1, 1.05, 1],
                }}
                transition={{
                    rotate: {
                        duration: 28,
                        repeat: Infinity,
                        ease: "linear",
                    },
                    scale: {
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    },
                }}
            />

            <motion.div
                className="absolute bottom-[-7rem] left-[-7rem] h-96 w-96 rounded-full bg-brand opacity-10 blur-3xl"
                animate={{
                    scale: [1, 1.16, 1],
                    opacity: [0.08, 0.18, 0.08],
                }}
                transition={{
                    duration: 5.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <div className="relative grid min-h-[440px] gap-8 p-6 md:min-h-[620px] md:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div>
                    <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-[1.35rem] bg-brand text-white shadow-2xl shadow-brand/35">
                        <Icon className="h-8 w-8" />
                    </div>

                    <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-brand">
                        {slide.eyebrow}
                    </p>

                    <h2 className="max-w-3xl text-4xl font-black leading-[0.96] tracking-[-0.06em] text-foreground md:text-6xl">
                        {slide.title}
                    </h2>

                    <p className="mt-5 max-w-xl text-base font-semibold leading-7 text-foreground/85 md:text-lg md:leading-8">
                        {slide.description}
                    </p>

                    {slide.detail ? (
                        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted md:text-base">
                            {slide.detail}
                        </p>
                    ) : null}

                    <div className="mt-7 flex flex-wrap gap-3">
                        <a
                            href="https://www.google.com/maps/search/?api=1&query=Avenida%20Brigadeiro%20Lu%C3%ADs%20Ant%C3%B4nio%2C%201086%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-black text-white shadow-2xl shadow-brand/30 transition hover:-translate-y-0.5 hover:bg-brand-dark"
                        >
                            Abrir no mapa
                            <Navigation className="h-4 w-4" />
                        </a>

                        <a
                            href={`tel:${PHONE_BELA_VISTA}`}
                            className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-background/35 px-5 py-3 text-sm font-black text-foreground backdrop-blur-xl transition hover:border-brand/40 hover:bg-brand-soft hover:text-brand"
                        >
                            Ligar para loja
                            <Phone className="h-4 w-4" />
                        </a>
                    </div>
                </div>

                <div className="grid gap-4">
                    <div className="rounded-[2rem] border border-brand/25 bg-background/35 p-6 shadow-xl shadow-black/10 backdrop-blur-xl">
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand text-white shadow-lg shadow-brand/25">
                                <MapPin className="h-6 w-6" />
                            </div>

                            <div>
                                <p className="text-xs font-black uppercase tracking-[0.22em] text-brand">
                                    Endereço
                                </p>

                                <p className="mt-2 text-base font-bold leading-7 text-foreground md:text-lg">
                                    Av. Brigadeiro Luís Antônio, 1086
                                </p>

                                <p className="mt-1 text-sm leading-7 text-muted">
                                    Bela Vista, São Paulo - SP
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-[2rem] border border-border-soft bg-background/35 p-5 backdrop-blur-xl">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand text-white">
                                <Phone className="h-5 w-5" />
                            </div>

                            <p className="mt-4 text-xs font-black uppercase tracking-[0.22em] text-brand">
                                Telefone
                            </p>

                            <p className="mt-2 text-lg font-black text-foreground">
                                11 3542-3676
                            </p>
                        </div>

                        <div className="rounded-[2rem] border border-border-soft bg-background/35 p-5 backdrop-blur-xl">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand text-white">
                                <Clock className="h-5 w-5" />
                            </div>

                            <p className="mt-4 text-xs font-black uppercase tracking-[0.22em] text-brand">
                                Atendimento
                            </p>

                            <p className="mt-2 text-sm font-semibold leading-6 text-foreground/85">
                                Impressões rápidas e suporte presencial.
                            </p>
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-[2rem] border border-brand/25 bg-brand-soft p-6 backdrop-blur-xl">
                        <div className="absolute right-[-2rem] top-[-2rem] h-28 w-28 rounded-full bg-brand opacity-15 blur-2xl" />

                        <div className="relative flex items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand text-white">
                                <Store className="h-6 w-6" />
                            </div>

                            <div>
                                <p className="text-xs font-black uppercase tracking-[0.22em] text-brand">
                                    Loja física
                                </p>

                                <p className="mt-2 text-sm font-semibold leading-7 text-foreground/85 md:text-base">
                                    Ideal para demandas presenciais, documentos, cópias, materiais
                                    simples e orientação rápida sobre produção gráfica.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.article>
    )
}

function AnniversarySlide({ slide }: { slide: HighlightSlide }) {
    const Icon = slide.Icon

    return (
        <motion.article
            initial={{ opacity: 0, y: 20, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.985 }}
            transition={{ duration: 0.42, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[2.25rem] border border-brand/30 bg-surface-soft shadow-2xl shadow-brand/15 backdrop-blur-2xl"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,var(--brand-soft),transparent_30%),radial-gradient(circle_at_82%_70%,var(--glow-primary),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.12),transparent_42%)]" />

            <motion.div
                className="absolute -right-16 -top-16 h-72 w-72 rounded-full border border-brand/25"
                animate={{
                    rotate: 360,
                    scale: [1, 1.04, 1],
                }}
                transition={{
                    rotate: {
                        duration: 26,
                        repeat: Infinity,
                        ease: "linear",
                    },
                    scale: {
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    },
                }}
            />

            <motion.div
                className="absolute -bottom-20 left-[-5rem] h-80 w-80 rounded-full border border-brand/20"
                animate={{
                    rotate: -360,
                    scale: [1, 1.06, 1],
                }}
                transition={{
                    rotate: {
                        duration: 32,
                        repeat: Infinity,
                        ease: "linear",
                    },
                    scale: {
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut",
                    },
                }}
            />

            <motion.div
                className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand opacity-10 blur-3xl"
                animate={{
                    scale: [1, 1.18, 1],
                    opacity: [0.08, 0.18, 0.08],
                }}
                transition={{
                    duration: 5.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <div className="relative grid min-h-[440px] items-center gap-8 p-6 md:min-h-[620px] md:p-10 lg:grid-cols-[0.95fr_1.05fr]">
                <div>
                    <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-[1.35rem] bg-brand text-white shadow-2xl shadow-brand/35">
                        <Icon className="h-8 w-8" />
                    </div>

                    <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-brand">
                        {slide.eyebrow}
                    </p>

                    <h2 className="max-w-3xl text-4xl font-black leading-[0.96] tracking-[-0.06em] text-foreground md:text-6xl">
                        {slide.title}
                    </h2>

                    <p className="mt-5 max-w-xl text-base font-semibold leading-7 text-foreground/85 md:text-lg md:leading-8">
                        {slide.description}
                    </p>

                    {slide.detail ? (
                        <p className="mt-4 max-w-xl text-sm leading-7 text-muted md:text-base">
                            {slide.detail}
                        </p>
                    ) : null}
                </div>

                <div className="relative flex min-h-[340px] items-center justify-center">
                    <motion.div
                        className="absolute h-[22rem] w-[22rem] rounded-full bg-brand opacity-15 blur-3xl md:h-[30rem] md:w-[30rem]"
                        animate={{
                            scale: [1, 1.12, 1],
                            opacity: [0.12, 0.28, 0.12],
                        }}
                        transition={{
                            duration: 5.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />

                    <div className="relative z-10 flex aspect-square w-full max-w-[430px] flex-col items-center justify-center rounded-[3rem] border border-brand/30 bg-background/35 p-8 text-center shadow-2xl shadow-black/15 backdrop-blur-2xl">
                        <div className="absolute inset-3 rounded-[2.5rem] border border-border-soft" />

                        <motion.div
                            className="absolute inset-8 rounded-full border border-brand/25"
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 18,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        />

                        <motion.div
                            className="absolute inset-16 rounded-full border border-brand/15"
                            animate={{ rotate: -360 }}
                            transition={{
                                duration: 24,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        />

                        <motion.div
                            className="relative mb-5 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-brand text-white shadow-2xl shadow-brand/35"
                            animate={{
                                y: [0, -8, 0],
                                rotate: [0, 2, 0, -2, 0],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <Sparkles className="h-12 w-12" />
                        </motion.div>

                        <p className="relative text-sm font-black uppercase tracking-[0.28em] text-brand">
                            Desde 2014
                        </p>

                        <div className="relative mt-3 flex items-end justify-center gap-2">
                            <span className="text-[8rem] font-black leading-none tracking-[-0.12em] text-foreground md:text-[9.6rem]">
                                10
                            </span>

                            <span className="mb-5 text-3xl font-black tracking-[-0.06em] text-brand md:text-4xl">
                                anos
                            </span>
                        </div>

                        <p className="relative mt-2 max-w-xs text-sm font-semibold leading-6 text-muted">
                            Cores, transformações e relacionamentos que marcaram nossa
                            história.
                        </p>
                    </div>
                </div>
            </div>
        </motion.article>
    )
}

function MaterialsSection() {
    return (
        <section id="solucoes" className="relative scroll-mt-28">
            <div className="mx-auto max-w-4xl text-center">
                <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-brand">
                    Soluções gráficas
                </p>

                <h2 className="text-4xl font-black leading-[0.96] tracking-[-0.055em] text-foreground md:text-6xl">
                    Materializamos a sua criatividade para encantar seus clientes.
                </h2>

                <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted md:text-lg md:leading-8">
                    Da papelaria ao material promocional, desenvolvemos impressos que
                    ajudam sua empresa a comunicar melhor, vender mais e fortalecer sua
                    presença visual.
                </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {materialCards.map((card, index) => {
                    return (
                        <motion.article
                            key={card.title}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.45, delay: index * 0.08 }}
                            className="group relative overflow-hidden rounded-[2rem] border border-border-soft bg-surface-soft p-5 shadow-2xl shadow-black/10 backdrop-blur-2xl transition hover:-translate-y-1 hover:border-brand/45 hover:shadow-brand/20"
                        >
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,var(--brand-soft),transparent_40%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_44%)] opacity-75 transition group-hover:opacity-100" />

                            <div className="relative flex min-h-[440px] flex-col">
                                <div className="relative mb-5 flex h-72 items-center justify-center">
                                    <motion.div
                                        className="absolute h-44 w-44 rounded-full bg-brand opacity-15 blur-3xl"
                                        animate={{
                                            scale: [1, 1.16, 1],
                                            opacity: [0.1, 0.24, 0.1],
                                        }}
                                        transition={{
                                            duration: 5,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                    />

                                    <img
                                        src={card.imageSrc}
                                        alt={card.imageAlt}
                                        className="relative z-10 max-h-64 w-full object-contain drop-shadow-[0_34px_35px_rgba(0,0,0,0.32)] transition duration-500 group-hover:-translate-y-1 group-hover:scale-110"
                                    />
                                </div>

                                <h3 className="text-2xl font-black leading-tight tracking-[-0.045em] text-foreground">
                                    {card.title}
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-muted">
                                    {card.description}
                                </p>

                                <div className="mt-auto pt-6">
                                    <a
                                        href={card.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2.5 text-sm font-black text-white shadow-xl shadow-brand/25 transition hover:-translate-y-0.5 hover:bg-brand-dark"
                                    >
                                        Saiba mais
                                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                                    </a>
                                </div>
                            </div>
                        </motion.article>
                    )
                })}
            </div>
        </section>
    )
}

function ServicesSection() {
    return (
        <section id="servicos" className="relative scroll-mt-28">
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
                <div className="lg:sticky lg:top-10">
                    <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-brand">
                        O que fazemos
                    </p>

                    <h2 className="text-4xl font-black leading-[0.96] tracking-[-0.055em] text-foreground md:text-6xl">
                        Soluções gráficas para diferentes necessidades.
                    </h2>

                    <p className="mt-5 max-w-xl text-base leading-7 text-muted md:text-lg md:leading-8">
                        Combinamos tecnologia, acabamento e atendimento consultivo para
                        entregar materiais impressos com qualidade, agilidade e impacto
                        visual.
                    </p>
                </div>

                <div className="grid gap-5">
                    {services.map((service, index) => {
                        const Icon = service.Icon

                        return (
                            <motion.article
                                key={service.title}
                                initial={{ opacity: 0, y: 22 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.45, delay: index * 0.08 }}
                                className="group relative overflow-hidden rounded-[2rem] border border-border-soft bg-surface-soft p-6 shadow-2xl shadow-black/10 backdrop-blur-2xl transition hover:-translate-y-1 hover:border-brand/45 hover:shadow-brand/20 md:p-7"
                            >
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,var(--brand-soft),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_45%)] opacity-75 transition group-hover:opacity-100" />

                                <div className="relative flex gap-5">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand text-white shadow-xl shadow-brand/25 transition group-hover:scale-105">
                                        <Icon className="h-7 w-7" />
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-black leading-tight tracking-[-0.045em] text-foreground md:text-3xl">
                                            {service.title}
                                        </h3>

                                        <p className="mt-3 text-sm leading-7 text-muted md:text-base md:leading-8">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.article>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

function ProductCanvasSection() {
    const [activeProduct, setActiveProduct] = useState<string | null>(null)

    const canvasBounds = useMemo(() => {
        const xs = canvasProducts.map((product) => product.x)
        const ys = canvasProducts.map((product) => product.y)

        return {
            minX: Math.min(...xs) - CANVAS_WRAP_PADDING_X,
            maxX: Math.max(...xs) + CANVAS_WRAP_PADDING_X,
            minY: Math.min(...ys) - CANVAS_WRAP_PADDING_Y,
            maxY: Math.max(...ys) + CANVAS_WRAP_PADDING_Y,
        }
    }, [])

    const activeProductData = useMemo(
        () => canvasProducts.find((product) => product.id === activeProduct),
        [activeProduct],
    )

    function fitX(x: number) {
        const range = canvasBounds.maxX - canvasBounds.minX
        return ((x - canvasBounds.minX) / range) * 100
    }

    function fitY(y: number) {
        const range = canvasBounds.maxY - canvasBounds.minY
        return ((y - canvasBounds.minY) / range) * 100
    }

    function toggleProduct(productId: string) {
        setActiveProduct((current) => (current === productId ? null : productId))
    }

    return (
        <section id="personalizados" className="relative scroll-mt-28">
            <div className="grid gap-10 lg:grid-cols-[360px_minmax(0,1fr)] lg:items-center lg:gap-16">
                <div className="relative z-[200] max-w-[380px]">
                    <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-brand">
                        Vitrine para eventos
                    </p>

                    <h2 className="text-4xl font-black leading-[0.96] tracking-[-0.055em] text-foreground md:text-5xl">
                        Impressos Personalizados
                    </h2>

                    <p className="mt-5 text-base leading-7 text-muted md:text-lg md:leading-8">
                        Utilize dados variáveis para encantar o seu cliente com peças
                        personalizadas para eventos, treinamentos, kits e campanhas.
                    </p>

                    <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-border-soft bg-surface-soft px-4 py-2 text-sm font-bold text-soft backdrop-blur-xl">
                        <MousePointer2 className="h-4 w-4 text-brand" />
                        Toque ou passe o mouse nos produtos
                    </div>

                    <a
                        href={buildWhatsappUrl("Olá! Gostaria de um orçamento para impressos personalizados com dados variáveis.")}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-black text-white shadow-xl shadow-brand/25 transition hover:-translate-y-0.5 hover:bg-brand-dark"
                    >
                        Orçar personalizados
                        <ArrowRight className="h-4 w-4" />
                    </a>
                </div>

                <div className="relative z-10 overflow-visible">
                    <div
                        className="relative h-[300px] w-full overflow-visible sm:h-[330px] md:h-[360px] lg:h-[324px]"
                        onMouseLeave={() => setActiveProduct(null)}
                    >
                        <div className="absolute inset-0 overflow-hidden rounded-[2.25rem] border border-border-soft bg-surface-soft shadow-2xl shadow-black/10 backdrop-blur-2xl">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,var(--brand-soft),transparent_28%),radial-gradient(circle_at_82%_70%,var(--glow-primary),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_45%)]" />
                            <div className="absolute inset-0 bg-background/10" />
                        </div>

                        <div className="relative z-20 h-full w-full overflow-visible">
                            {canvasProducts.map((product) => {
                                const isActive = activeProduct === product.id
                                const isDimmed = activeProduct !== null && !isActive

                                const tooltipPosition =
                                    product.tooltip === "left"
                                        ? "lg:right-full lg:mr-6 lg:top-1/2 lg:-translate-y-1/2"
                                        : "lg:left-full lg:ml-6 lg:top-1/2 lg:-translate-y-1/2"

                                const dashedLinePosition =
                                    product.tooltip === "left"
                                        ? "lg:right-full lg:mr-2"
                                        : "lg:left-full lg:ml-2"

                                const Illustration = product.Illustration

                                return (
                                    <motion.button
                                        key={product.id}
                                        type="button"
                                        onClick={() => toggleProduct(product.id)}
                                        onMouseEnter={() => setActiveProduct(product.id)}
                                        initial={{ opacity: 0, scale: 0.94 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true, margin: "-80px" }}
                                        transition={{ duration: 0.45 }}
                                        className={`group/item absolute select-none transition duration-300 ${isActive ? "z-50" : "z-20"
                                            } ${isDimmed
                                                ? "scale-[0.92] opacity-25 blur-[3px]"
                                                : "opacity-100 blur-0"
                                            }`}
                                        style={{
                                            left: `calc(${fitX(product.x)}% - 9%)`,
                                            top: `calc(${fitY(product.y)}% - 14%)`,
                                            width: `${product.width * CANVAS_PRODUCT_SCALE}px`,
                                            transform: "translate(-50%, -50%)",
                                            zIndex: isActive ? 80 : product.zIndex ?? 20,
                                        }}
                                        aria-label={product.title}
                                        aria-pressed={isActive}
                                    >
                                        <div className="relative flex w-full items-center justify-center transition duration-300">
                                            <div className="absolute inset-0 scale-75 rounded-full bg-brand/0 blur-3xl transition duration-300 group-hover/item:bg-brand/25" />

                                            <Illustration className="relative h-auto w-full drop-shadow-[0_24px_35px_rgba(0,0,0,0.34)] transition duration-300 group-hover/item:-translate-y-2 group-hover/item:scale-110" />
                                        </div>

                                        <div
                                            className={`pointer-events-none absolute top-1/2 z-30 hidden h-px w-8 border-t border-dashed border-foreground/60 opacity-0 transition duration-300 group-hover/item:opacity-100 lg:block ${dashedLinePosition}`}
                                        />

                                        <div
                                            className={`pointer-events-none absolute z-[120] hidden w-[300px] rounded-3xl border border-border-soft bg-background/90 p-5 text-left opacity-0 shadow-2xl shadow-black/40 backdrop-blur-2xl transition duration-300 group-hover/item:opacity-100 lg:block ${tooltipPosition}`}
                                        >
                                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-foreground/10 via-transparent to-brand/10" />

                                            <div className="relative">
                                                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-brand">
                                                    {product.tag}
                                                </p>

                                                <h3 className="mt-2 text-lg font-black leading-tight text-foreground">
                                                    {product.title}
                                                </h3>

                                                <p className="mt-3 text-sm leading-6 text-muted">
                                                    {product.description}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.button>
                                )
                            })}
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {activeProductData ? (
                            <motion.div
                                key={activeProductData.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.25 }}
                                className="mt-4 rounded-[1.75rem] border border-border-soft bg-surface-soft p-5 shadow-xl shadow-black/10 backdrop-blur-2xl lg:hidden"
                            >
                                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-brand">
                                    {activeProductData.tag}
                                </p>

                                <h3 className="mt-2 text-xl font-black leading-tight tracking-[-0.04em] text-foreground">
                                    {activeProductData.title}
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-muted">
                                    {activeProductData.description}
                                </p>

                                <a
                                    href={buildWhatsappUrl(`Olá! Gostaria de um orçamento para ${activeProductData.title}.`)}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2.5 text-sm font-black text-white shadow-xl shadow-brand/25"
                                >
                                    Solicitar orçamento
                                    <ArrowRight className="h-4 w-4" />
                                </a>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.25 }}
                                className="mt-4 rounded-[1.75rem] border border-dashed border-border-soft bg-background/25 p-5 text-sm font-semibold leading-7 text-muted backdrop-blur-xl lg:hidden"
                            >
                                Toque em um produto da vitrine para ver os detalhes e pedir
                                orçamento pelo WhatsApp.
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}


function VideoStructureSection() {
    return (
        <section id="estrutura" className="relative scroll-mt-28">
            <div className="mx-auto max-w-4xl text-center">
                <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-brand">
                    Nossa estrutura
                </p>

                <h2 className="text-4xl font-black leading-[0.96] tracking-[-0.055em] text-foreground md:text-6xl">
                    Estrutura completa para os seus impressos
                </h2>

                <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted md:text-lg md:leading-8">
                    Conheça um pouco mais da estrutura, tecnologia e cuidado por
                    trás da produção dos seus materiais gráficos.
                </p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
                className="relative mx-auto mt-10 max-w-5xl overflow-hidden rounded-[2.5rem] border border-border-soft bg-surface-soft p-3 shadow-2xl shadow-black/10 backdrop-blur-2xl md:p-4"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,var(--brand-soft),transparent_32%),radial-gradient(circle_at_80%_80%,var(--glow-primary),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_45%)]" />

                <div className="relative overflow-hidden rounded-[2rem] bg-black shadow-2xl shadow-black/30">
                    <div className="relative aspect-video w-full">
                        <iframe
                            className="absolute inset-0 h-full w-full"
                            src="https://www.youtube-nocookie.com/embed/vWM2PNcXsKQ"
                            title="Estrutura completa para os seus impressos"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        />
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

function ContactSection() {
    const address =
        "Rua Caetano Pinto, 195, Brás, São Paulo - SP, 03041-000"

    const mapsEmbedUrl =
        "https://www.google.com/maps?q=DPrint%20Gr%C3%A1fica%20Rua%20Caetano%20Pinto%20195%20Br%C3%A1s%20S%C3%A3o%20Paulo%20SP&output=embed"

    return (
        <section id="contato" className="relative scroll-mt-28">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-border-soft bg-surface-soft p-5 shadow-2xl shadow-black/10 backdrop-blur-2xl md:p-8 lg:p-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,var(--brand-soft),transparent_30%),radial-gradient(circle_at_88%_78%,var(--glow-primary),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_45%)]" />

                <div className="relative grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
                    <div className="flex flex-col justify-between">
                        <div>
                            <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-brand">
                                Fale com a D&apos;Print
                            </p>

                            <h2 className="text-4xl font-black leading-[0.96] tracking-[-0.055em] text-foreground md:text-6xl">
                                Vamos produzir seus próximos impressos?
                            </h2>

                            <p className="mt-5 max-w-xl text-base leading-7 text-muted md:text-lg md:leading-8">
                                Entre em contato ou visite nossa unidade no Brás
                                para conversar sobre o seu projeto.
                            </p>
                        </div>

                        <div className="mt-8 grid gap-4">
                            <div className="rounded-[2rem] border border-border-soft bg-background/35 p-5 backdrop-blur-xl">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand text-white shadow-lg shadow-brand/25">
                                        <MapPin className="h-6 w-6" />
                                    </div>

                                    <div>
                                        <p className="text-xs font-black uppercase tracking-[0.22em] text-brand">
                                            Endereço
                                        </p>

                                        <p className="mt-2 text-base font-bold leading-7 text-foreground md:text-lg">
                                            Rua Caetano Pinto, 195
                                        </p>

                                        <p className="mt-1 text-sm leading-7 text-muted">
                                            03041-000 – Brás – São Paulo – SP
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <a
                                    href={`tel:${PHONE_BRAS}`}
                                    className="group rounded-[2rem] border border-border-soft bg-background/35 p-5 backdrop-blur-xl transition hover:border-brand/45 hover:bg-brand-soft"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand text-white shadow-lg shadow-brand/25">
                                        <Phone className="h-5 w-5" />
                                    </div>

                                    <p className="mt-4 text-xs font-black uppercase tracking-[0.22em] text-brand">
                                        Telefone
                                    </p>

                                    <p className="mt-2 text-lg font-black text-foreground">
                                        11 2858-8080
                                    </p>
                                </a>

                                <a
                                    href="mailto:atendimento1@dprintgrafica.com.br"
                                    className="group rounded-[2rem] border border-border-soft bg-background/35 p-5 backdrop-blur-xl transition hover:border-brand/45 hover:bg-brand-soft"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand text-white shadow-lg shadow-brand/25">
                                        <Mail className="h-5 w-5" />
                                    </div>

                                    <p className="mt-4 text-xs font-black uppercase tracking-[0.22em] text-brand">
                                        E-mail
                                    </p>

                                    <p className="mt-2 break-words text-sm font-black leading-6 text-foreground md:text-base">
                                        atendimento1@dprintgrafica.com.br
                                    </p>
                                </a>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <a
                                    href="https://share.google/v2A8nzW0X1EM7aDkP"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-black text-white shadow-xl shadow-brand/25 transition hover:-translate-y-0.5 hover:bg-brand-dark"
                                >
                                    Abrir no Google Maps
                                    <Navigation className="h-4 w-4" />
                                </a>

                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-background/35 px-5 py-3 text-sm font-black text-foreground backdrop-blur-xl transition hover:border-brand/45 hover:bg-brand-soft hover:text-brand"
                                >
                                    Ver rota
                                    <ExternalLink className="h-4 w-4" />
                                </a>
                            </div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.5 }}
                        className="relative min-h-[420px] overflow-hidden rounded-[2.25rem] border border-border-soft bg-background/35 shadow-2xl shadow-black/15 backdrop-blur-xl"
                    >
                        <iframe
                            title="Mapa da DPrint no Brás"
                            src={mapsEmbedUrl}
                            className="absolute inset-0 h-full w-full border-0"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            allowFullScreen
                        />

                        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/20 to-transparent" />

                        <div className="absolute bottom-4 left-4 right-4 rounded-[1.5rem] border border-border-soft bg-background/85 p-4 shadow-xl backdrop-blur-2xl md:left-auto md:max-w-sm">
                            <p className="text-xs font-black uppercase tracking-[0.22em] text-brand">
                                Unidade Brás
                            </p>

                            <p className="mt-2 text-sm font-bold leading-6 text-foreground">
                                Rua Caetano Pinto, 195 — Brás, São Paulo - SP
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}


function SectionProgressNav() {
    const [activeSection, setActiveSection] = useState(pageSections[0].id)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!mounted) return

        const scrollContainer = document.getElementById("site-scroll-container")

        if (!scrollContainer) {
            return
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

                const firstVisible = visibleEntries[0]

                if (firstVisible?.target?.id) {
                    setActiveSection(firstVisible.target.id)
                }
            },
            {
                root: scrollContainer,
                rootMargin: "-38% 0px -45% 0px",
                threshold: [0.1, 0.25, 0.5, 0.75],
            },
        )

        pageSections.forEach((section) => {
            const element = document.getElementById(section.id)

            if (element) {
                observer.observe(element)
            }
        })

        return () => observer.disconnect()
    }, [mounted])

    function smoothScrollToSection(sectionId: string) {
        const element = document.getElementById(sectionId)
        const scrollContainerElement = document.getElementById("site-scroll-container")

        if (!element || !scrollContainerElement) return

        const scrollContainer = scrollContainerElement

        const offset = 96

        const containerRect = scrollContainer.getBoundingClientRect()
        const elementRect = element.getBoundingClientRect()

        const startY = scrollContainer.scrollTop
        const targetY =
            elementRect.top - containerRect.top + scrollContainer.scrollTop - offset

        const distance = targetY - startY
        const duration = 520
        const startTime = performance.now()

        function easeOutCubic(value: number) {
            return 1 - Math.pow(1 - value, 3)
        }

        function animateScroll(currentTime: number) {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const easedProgress = easeOutCubic(progress)

            scrollContainer.scrollTo({
                top: startY + distance * easedProgress,
                behavior: "auto",
            })

            if (progress < 1) {
                requestAnimationFrame(animateScroll)
            }
        }

        requestAnimationFrame(animateScroll)
    }

    const activeIndex = pageSections.findIndex(
        (section) => section.id === activeSection,
    )

    const safeActiveIndex = Math.max(activeIndex, 0)

    const progress =
        pageSections.length <= 1
            ? 0
            : (safeActiveIndex / (pageSections.length - 1)) * 100

    const nav = (
        <nav
            aria-label="Navegação das seções"
            className="pointer-events-none fixed bottom-0 right-4 top-[72px] z-[300] hidden w-16 items-center justify-center xl:flex"
        >
            <div className="relative flex h-[72vh] w-full items-center justify-center">
                <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border-soft/70" />

                <motion.div
                    className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-brand shadow-[0_0_24px_var(--brand)]"
                    animate={{ height: `${progress}%` }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                />

                <div className="relative flex h-full flex-col justify-between">
                    {pageSections.map((section, index) => {
                        const isActive = activeSection === section.id
                        const isPassed = index <= safeActiveIndex

                        return (
                            <motion.button
                                key={section.id}
                                type="button"
                                onClick={() => smoothScrollToSection(section.id)}
                                whileHover="hover"
                                initial="rest"
                                animate={isActive ? "active" : "rest"}
                                className="group pointer-events-auto relative flex h-8 w-8 items-center justify-center"
                                aria-label={`Ir para ${section.label}`}
                            >
                                <div className="relative flex h-8 w-8 items-center justify-center">
                                    <motion.span
                                        variants={{
                                            rest: {
                                                opacity: 0,
                                                scale: 0.55,
                                            },
                                            hover: {
                                                opacity: 1,
                                                scale: 1.55,
                                            },
                                            active: {
                                                opacity: 1,
                                                scale: 1.75,
                                            },
                                        }}
                                        transition={{
                                            duration: 0.34,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                        className="absolute h-4 w-4 rounded-full border border-brand/45 bg-brand/10 shadow-[0_0_20px_var(--brand)]"
                                    />

                                    <motion.span
                                        variants={{
                                            rest: {
                                                scale: 1,
                                            },
                                            hover: {
                                                scale: 1.35,
                                            },
                                            active: {
                                                scale: [1, 1.18, 1],
                                            },
                                        }}
                                        transition={
                                            isActive
                                                ? {
                                                    duration: 1.4,
                                                    repeat: Infinity,
                                                    ease: "easeInOut",
                                                }
                                                : {
                                                    duration: 0.28,
                                                    ease: [0.22, 1, 0.36, 1],
                                                }
                                        }
                                        className={`relative z-10 block rounded-full border transition duration-300 ${isActive
                                                ? "h-4 w-4 border-brand bg-brand shadow-[0_0_22px_var(--brand)]"
                                                : isPassed
                                                    ? "h-3 w-3 border-brand/70 bg-brand/50"
                                                    : "h-2.5 w-2.5 border-border-soft bg-background"
                                            }`}
                                    />
                                </div>

                                <motion.span
                                    variants={{
                                        rest: {
                                            opacity: 0,
                                            x: 10,
                                            scale: 0.94,
                                            filter: "blur(4px)",
                                        },
                                        hover: {
                                            opacity: 1,
                                            x: 0,
                                            scale: 1,
                                            filter: "blur(0px)",
                                        },
                                        active: {
                                            opacity: 1,
                                            x: 0,
                                            scale: 1,
                                            filter: "blur(0px)",
                                        },
                                    }}
                                    transition={{
                                        duration: 0.34,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="pointer-events-none absolute right-9 top-1/2 min-w-max -translate-y-1/2 rounded-full border border-border-soft bg-background/85 px-3 py-1.5 text-xs font-black text-foreground shadow-xl backdrop-blur-xl"
                                >
                                    {section.label}
                                </motion.span>
                            </motion.button>
                        )
                    })}
                </div>
            </div>
        </nav>
    )

    if (!mounted) return null

    return createPortal(nav, document.body)
}
function SectionDivider() {
    return (
        <div className="relative my-20 md:my-28">
            <div className="absolute left-1/2 top-1/2 h-px w-screen -translate-x-1/2 bg-gradient-to-r from-transparent via-border-soft to-transparent" />

            <div className="relative mx-auto h-2 w-2 rounded-full bg-brand shadow-[0_0_28px_var(--brand)]" />
        </div>
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

            <motion.div
                className="theme-glow-primary absolute right-[-14rem] top-[145rem] h-[28rem] w-[28rem] rounded-full blur-[115px] md:h-[40rem] md:w-[40rem] md:blur-[155px]"
                animate={{
                    x: [0, -18, 0],
                    y: [0, 28, 0],
                    scale: [1, 1.08, 1],
                    opacity: [0.16, 0.36, 0.16],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="theme-glow-secondary absolute left-[-10rem] top-[205rem] h-[24rem] w-[24rem] rounded-full blur-[105px] md:h-[34rem] md:w-[34rem] md:blur-[140px]"
                animate={{
                    x: [0, 24, 0],
                    y: [0, 16, 0],
                    opacity: [0.14, 0.34, 0.14],
                }}
                transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute right-[-12rem] bottom-[-10rem] h-[26rem] w-[26rem] rounded-full bg-brand opacity-15 blur-[115px] md:h-[38rem] md:w-[38rem] md:blur-[150px]"
                animate={{
                    x: [0, -22, 0],
                    y: [0, 18, 0],
                    scale: [1, 1.1, 1],
                    opacity: [0.12, 0.3, 0.12],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,var(--brand-soft),transparent_32%),linear-gradient(to_bottom,rgba(255,255,255,0.045),transparent_28%,rgba(255,255,255,0.025)_55%,transparent_82%)]" />

            <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.025),transparent)]" />
        </div>
    )
}
function InvitationSvg({ className }: IllustrationProps) {
    return (
        <svg viewBox="0 0 320 190" className={className} aria-hidden="true">
            <rect x="30" y="35" width="260" height="120" rx="10" fill="#f6fbff" />
            <path d="M38 45l122 70L282 45" fill="none" stroke="#d2e1ea" strokeWidth="10" />
            <path d="M40 150l92-58M280 150l-92-58" stroke="#d2e1ea" strokeWidth="8" />
            <rect x="70" y="65" width="180" height="62" rx="6" fill="#ffffff" stroke="#d9e7ee" />
            <rect x="90" y="83" width="140" height="14" rx="7" fill="#1f2937" />
            <rect x="105" y="105" width="110" height="9" rx="4" fill="#2596be" />
            <text x="160" y="135" textAnchor="middle" fontSize="15" fontWeight="700" fill="#60717c">
                Convite personalizado
            </text>
        </svg>
    )
}

function BadgeSvg({ className }: IllustrationProps) {
    return (
        <svg viewBox="0 0 340 210" className={className} aria-hidden="true">
            <rect x="150" y="14" width="40" height="24" rx="6" fill="#0f172a" />
            <rect x="165" y="30" width="10" height="30" rx="5" fill="#334155" />
            <rect x="90" y="54" width="160" height="130" rx="14" fill="#f8fbff" />
            <rect x="90" y="54" width="160" height="38" rx="14" fill="#e5f6fb" />
            <path d="M90 84h160" stroke="#2596be" strokeWidth="6" />
            <rect x="112" y="110" width="45" height="48" rx="6" fill="#dce8ef" />
            <circle cx="134" cy="128" r="11" fill="#94a3b8" />
            <path d="M116 158c6-15 32-15 38 0" fill="#94a3b8" />
            <rect x="170" y="112" width="55" height="10" rx="5" fill="#0f172a" />
            <rect x="170" y="132" width="44" height="8" rx="4" fill="#2596be" />
            <rect x="170" y="150" width="62" height="8" rx="4" fill="#94a3b8" />
            <text x="170" y="82" textAnchor="middle" fontSize="16" fontWeight="900" fill="#0f172a">
                CRACHÁ
            </text>
        </svg>
    )
}

function RollupSvg({ className }: IllustrationProps) {
    return (
        <svg viewBox="0 0 260 520" className={className} aria-hidden="true">
            <rect x="70" y="30" width="120" height="10" rx="5" fill="#e5e7eb" />
            <rect x="80" y="40" width="100" height="405" fill="#eaf5f9" />
            <path d="M80 40h100v70H80z" fill="#ffffff" />
            <path d="M80 110h100v335H80z" fill="#dbe8ef" />
            <path d="M92 145h76" stroke="#0f172a" strokeWidth="4" />
            <path d="M95 170h70M95 195h70M95 220h48" stroke="#64748b" strokeWidth="3" />
            <rect x="92" y="62" width="76" height="34" rx="4" fill="#0f172a" />
            <rect x="132" y="62" width="36" height="34" rx="4" fill="#2596be" />
            <text x="130" y="285" textAnchor="middle" fontSize="20" fontWeight="900" fill="#0f172a">
                BEM
            </text>
            <text x="130" y="315" textAnchor="middle" fontSize="20" fontWeight="900" fill="#0f172a">
                VINDOS
            </text>
            <rect x="55" y="445" width="150" height="20" rx="5" fill="#cbd5e1" />
            <rect x="48" y="465" width="164" height="16" rx="6" fill="#64748b" />
            <rect x="76" y="480" width="18" height="22" rx="4" fill="#334155" />
            <rect x="166" y="480" width="18" height="22" rx="4" fill="#334155" />
        </svg>
    )
}

function NotebookSvg({ className }: IllustrationProps) {
    return (
        <svg viewBox="0 0 300 360" className={className} aria-hidden="true">
            <rect x="55" y="25" width="210" height="300" rx="12" fill="#eaf5f9" />
            <rect x="55" y="25" width="210" height="60" rx="12" fill="#ffffff" />
            <path d="M55 85h210" stroke="#2596be" strokeWidth="8" />
            <rect x="82" y="48" width="130" height="28" rx="5" fill="#0f172a" />
            <rect x="166" y="48" width="46" height="28" rx="5" fill="#2596be" />
            <text x="160" y="190" textAnchor="middle" fontSize="28" fontWeight="900" fill="#0f172a">
                APOSTILA
            </text>
            <text x="160" y="222" textAnchor="middle" fontSize="20" fontWeight="700" fill="#64748b">
                personalizada
            </text>
            {Array.from({ length: 12 }).map((_, index) => (
                <rect
                    key={index}
                    x="38"
                    y={55 + index * 20}
                    width="34"
                    height="7"
                    rx="3"
                    fill="#334155"
                />
            ))}
            <path d="M78 270h88M78 292h125" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
        </svg>
    )
}

function GuideSvg({ className }: IllustrationProps) {
    return (
        <svg viewBox="0 0 420 230" className={className} aria-hidden="true">
            <rect x="35" y="35" width="350" height="150" rx="12" fill="#f8fbff" />
            <rect x="35" y="35" width="350" height="42" rx="12" fill="#eaf5f9" />
            <path d="M35 77h350" stroke="#2596be" strokeWidth="7" />
            <rect x="58" y="52" width="105" height="18" rx="4" fill="#0f172a" />
            <rect x="165" y="52" width="42" height="18" rx="4" fill="#2596be" />
            <text x="210" y="125" textAnchor="middle" fontSize="26" fontWeight="900" fill="#0f172a">
                Guia e Programação
            </text>
            <path d="M75 150h270M75 168h210" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
            <circle cx="340" cy="55" r="10" fill="#2596be" />
        </svg>
    )
}

function LuggageTagSvg({ className }: IllustrationProps) {
    return (
        <svg viewBox="0 0 220 150" className={className} aria-hidden="true">
            <path d="M28 70c18-22 40-24 65-17" stroke="#b8d66d" strokeWidth="5" fill="none" />
            <rect x="80" y="35" width="105" height="78" rx="14" fill="#f8fbff" />
            <path d="M170 35h15v78h-15z" fill="#2596be" />
            <circle cx="96" cy="74" r="8" fill="#cbd5e1" />
            <path d="M42 70c13 0 26 5 38 12" stroke="#2596be" strokeWidth="4" fill="none" />
            <rect x="105" y="56" width="50" height="9" rx="4" fill="#0f172a" />
            <rect x="105" y="76" width="42" height="7" rx="3" fill="#2596be" />
            <text x="132" y="101" textAnchor="middle" fontSize="10" fontWeight="800" fill="#64748b">
                Tag personalizada
            </text>
        </svg>
    )
}

function FolderSvg({ className }: IllustrationProps) {
    return (
        <svg viewBox="0 0 340 360" className={className} aria-hidden="true">
            <path
                d="M55 55h95l22 34h113v220c0 11-9 20-20 20H75c-11 0-20-9-20-20z"
                fill="#eaf5f9"
            />
            <path d="M55 55h95l22 34h113v52H55z" fill="#ffffff" />
            <path d="M55 141h230" stroke="#2596be" strokeWidth="8" />
            <rect x="85" y="92" width="130" height="28" rx="5" fill="#0f172a" />
            <rect x="172" y="92" width="43" height="28" rx="5" fill="#2596be" />
            <text x="170" y="238" textAnchor="middle" fontSize="28" fontWeight="900" fill="#0f172a">
                PASTA
            </text>
            <text x="170" y="268" textAnchor="middle" fontSize="18" fontWeight="700" fill="#64748b">
                personalizada
            </text>
            <path d="M88 296h92" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
        </svg>
    )
}

function CertificateSvg({ className }: IllustrationProps) {
    return (
        <svg viewBox="0 0 430 240" className={className} aria-hidden="true">
            <rect x="35" y="35" width="360" height="155" rx="12" fill="#f8fbff" />
            <rect x="35" y="35" width="360" height="45" rx="12" fill="#eaf5f9" />
            <path d="M35 80h360" stroke="#2596be" strokeWidth="7" />
            <rect x="260" y="52" width="90" height="22" rx="4" fill="#0f172a" />
            <rect x="322" y="52" width="28" height="22" rx="4" fill="#2596be" />
            <text x="215" y="122" textAnchor="middle" fontSize="28" fontWeight="900" fill="#0f172a">
                Certificado
            </text>
            <path d="M92 145h246M120 162h190" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
            <path d="M105 178h82M242 178h82" stroke="#2596be" strokeWidth="5" strokeLinecap="round" />
            <circle cx="350" cy="150" r="20" fill="#f7c948" />
            <path d="M340 172l-8 25 18-10 18 10-8-25" fill="#f59e0b" />
        </svg>
    )
}

function BottleSvg({ className }: IllustrationProps) {
    return (
        <svg viewBox="0 0 150 360" className={className} aria-hidden="true">
            <rect x="55" y="12" width="40" height="42" rx="8" fill="#334155" />
            <rect x="48" y="48" width="54" height="18" rx="6" fill="#64748b" />
            <path
                d="M43 73c0-10 8-18 18-18h28c10 0 18 8 18 18 0 25 22 45 22 84v128c0 31-25 56-56 56s-56-25-56-56V157c0-39 26-59 26-84z"
                fill="#dff3fb"
            />
            <path
                d="M34 138c20 10 61 10 82 0M26 185c27 12 71 12 98 0M26 232c27 12 71 12 98 0"
                stroke="#b7dce8"
                strokeWidth="6"
                fill="none"
            />
            <rect x="32" y="214" width="86" height="76" rx="8" fill="#ffffff" />
            <path d="M32 242h86" stroke="#2596be" strokeWidth="8" />
            <rect x="47" y="226" width="56" height="12" rx="4" fill="#0f172a" />
            <text x="75" y="270" textAnchor="middle" fontSize="13" fontWeight="800" fill="#64748b">
                Garrafa
            </text>
            <text x="75" y="288" textAnchor="middle" fontSize="11" fontWeight="700" fill="#2596be">
                personalizada
            </text>
        </svg>
    )
}