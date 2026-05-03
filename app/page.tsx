"use client"

import { motion } from "framer-motion"
import type { MouseEvent } from "react"
import { useEffect, useMemo, useState } from "react"

import {
  ArrowRight,
  Building2,
  MapPin,
  Moon,
  Phone,
  Printer,
  Sparkles,
  Store,
  Sun,
} from "lucide-react"
import TransitionLink from "./TransitionLink"

type Audience = "pj" | "pf"
type Mode = "dark" | "light"
type Theme = `${Audience}-${Mode}`

const contactByAudience = {
  pj: {
    phoneLabel: "11 2858-8094",
    phoneHref: "tel:1128588094",
    whatsappUrl: "https://api.whatsapp.com/send?phone=551128588094",
    whatsappLabel: "Solicitar orçamento",
    address: "R. Caetano Pinto, 195 - Brás, São Paulo - SP",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=R.%20Caetano%20Pinto%2C%20195%20-%20Br%C3%A1s%2C%20S%C3%A3o%20Paulo%20-%20SP",
  },
  pf: {
    phoneLabel: "11 3542-3676",
    phoneHref: "tel:1135423676",
    whatsappUrl: "https://api.whatsapp.com/send?phone=5511991152329",
    whatsappLabel: "Chamar no WhatsApp",
    address: "Av. Brigadeiro Luís Antônio, 1086 - Bela Vista, São Paulo - SP",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Avenida%20Brigadeiro%20Lu%C3%ADs%20Ant%C3%B4nio%2C%201086%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP",
  },
}

const options = [
  {
    audience: "pj" as const,
    title: "Impressões para empresas",
    mobileTitle: "Empresas",
    label: "B2B / Corporativo",
    badge: "Corporativo",
    description:
      "Materiais institucionais, eventos, treinamentos, comunicação visual, grandes formatos, dados variáveis e projetos personalizados.",
    mobileDescription:
      "Materiais institucionais, eventos, treinamentos, comunicação visual, grandes formatos, dados variáveis e projetos personalizados.",
    href: "/empresas",
    Icon: Building2,
  },
  {
    audience: "pf" as const,
    title: "Impressões rápidas",
    mobileTitle: "Impressões rápidas",
    label: "Presencial / Pessoa física",
    badge: "Presencial",
    description:
      "Atendimento rápido para impressões do dia a dia, documentos, cópias, materiais simples e serviços presenciais.",
    mobileDescription:
      "Atendimento rápido para documentos, cópias, materiais simples e serviços presenciais.",
    href: "/impressao-rapida",
    Icon: Store,
  },
]


export default function Home() {
  const [audience, setAudience] = useState<Audience>("pj")
  const [mode, setMode] = useState<Mode>("dark")

  const theme = `${audience}-${mode}` as Theme
  const isLight = mode === "light"
  const isPf = audience === "pf"
  const contact = contactByAudience[audience]
  const logoSrc = `/logo-dprint-${audience}-${mode}.svg`

  function previewAudience(nextAudience: Audience) {
    if (nextAudience === audience) return

    setAudience(nextAudience)
  }

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const heroCopy = useMemo(() => {
    if (audience === "pj") {
      return {
        eyebrow: "Soluções gráficas para empresas",
        title: "Impressos profissionais para marcas que precisam se destacar.",
        mobileTitle: "O que sua empresa precisa imprimir?",
        description:
          "Produção gráfica para empresas, eventos, treinamentos e comunicação visual, com acabamento profissional e atendimento consultivo.",
      }
    }

    return {
      eyebrow: "Atendimento rápido e presencial",
      title: "Impressões simples, rápidas e bem resolvidas.",
      mobileTitle: "Precisa imprimir algo rápido?",
      description:
        "Para quem precisa imprimir documentos, materiais do dia a dia ou resolver uma demanda presencial com praticidade.",
    }
  }, [audience])

  return (
    <main className="relative min-h-dvh overflow-x-hidden bg-background text-foreground transition-colors duration-700 md:h-dvh md:overflow-hidden">
      <BackgroundEffects audience={audience} mode={mode} />

      <MobileHome
        audience={audience}
        setAudience={previewAudience}
        setMode={setMode}
        isLight={isLight}
        isPf={isPf}
        contact={contact}
        heroCopy={heroCopy}
        logoSrc={logoSrc}
      />

      <DesktopHome
        audience={audience}
        setAudience={previewAudience}
        setMode={setMode}
        isLight={isLight}
        isPf={isPf}
        contact={contact}
        heroCopy={heroCopy}
        theme={theme}
        logoSrc={logoSrc}
      />
    </main>
  )
}

function getBackgroundMotionColors(audience: Audience, mode: Mode) {
  const isLight = mode === "light"

  if (audience === "pf") {
    return {
      primary: isLight ? "rgba(249, 115, 22, 0.26)" : "rgba(249, 115, 22, 0.42)",
      secondary: isLight ? "rgba(250, 204, 21, 0.22)" : "rgba(250, 204, 21, 0.34)",
      tertiary: isLight ? "rgba(251, 113, 133, 0.12)" : "rgba(251, 113, 133, 0.18)",
      wash:
        "radial-gradient(circle at 18% 0%, rgba(250, 204, 21, 0.12), transparent 34%), radial-gradient(circle at 82% 16%, rgba(249, 115, 22, 0.13), transparent 36%), radial-gradient(circle at 50% 100%, rgba(251, 113, 133, 0.08), transparent 42%)",
    }
  }

  return {
    primary: isLight ? "rgba(37, 150, 190, 0.22)" : "rgba(37, 150, 190, 0.38)",
    secondary: isLight ? "rgba(106, 215, 255, 0.18)" : "rgba(106, 215, 255, 0.30)",
    tertiary: isLight ? "rgba(15, 95, 120, 0.10)" : "rgba(15, 95, 120, 0.16)",
    wash:
      "radial-gradient(circle at 18% 0%, rgba(106, 215, 255, 0.11), transparent 34%), radial-gradient(circle at 82% 16%, rgba(37, 150, 190, 0.12), transparent 36%), radial-gradient(circle at 50% 100%, rgba(15, 95, 120, 0.08), transparent 42%)",
  }
}

function BackgroundEffects({
  audience,
  mode,
}: {
  audience: Audience
  mode: Mode
}) {
  const colors = getBackgroundMotionColors(audience, mode)
  const isPf = audience === "pf"

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute left-1/2 top-[-12rem] h-[26rem] w-[26rem] -translate-x-1/2 rounded-full blur-[95px] md:h-[38rem] md:w-[38rem] md:blur-[130px]"
        animate={{
          x: isPf ? ["-50%", "-44%", "-50%"] : ["-50%", "-56%", "-50%"],
          y: isPf ? [0, 28, 0] : [0, -18, 0],
          scale: isPf ? [1, 1.18, 1] : [1, 1.1, 1],
          opacity: isPf ? [0.48, 0.78, 0.48] : [0.44, 0.72, 0.44],
          backgroundColor: colors.primary,
        }}
        transition={{
          backgroundColor: {
            duration: 1.3,
            ease: [0.22, 1, 0.36, 1],
          },
          x: {
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          },
          y: {
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          },
          scale: {
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          },
          opacity: {
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      />

      <motion.div
        className="absolute bottom-[-10rem] right-[-10rem] h-[22rem] w-[22rem] rounded-full blur-[95px] md:h-[32rem] md:w-[32rem] md:blur-[130px]"
        animate={{
          x: isPf ? [-8, -46, -8] : [0, -22, 0],
          y: isPf ? [0, -18, 0] : [0, 18, 0],
          scale: isPf ? [1, 1.14, 1] : [1, 1.08, 1],
          opacity: isPf ? [0.38, 0.7, 0.38] : [0.32, 0.62, 0.32],
          backgroundColor: colors.secondary,
        }}
        transition={{
          backgroundColor: {
            duration: 1.3,
            ease: [0.22, 1, 0.36, 1],
          },
          x: {
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          },
          y: {
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          },
          scale: {
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          },
          opacity: {
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      />

      <motion.div
        className="absolute left-[-12rem] top-[42%] h-[18rem] w-[18rem] rounded-full blur-[90px] md:h-[28rem] md:w-[28rem] md:blur-[120px]"
        animate={{
          x: isPf ? [0, 36, 0] : [20, 0, 20],
          y: isPf ? [0, -24, 0] : [0, 28, 0],
          scale: isPf ? [1, 1.16, 1] : [1, 1.08, 1],
          opacity: isPf ? [0.18, 0.36, 0.18] : [0.14, 0.28, 0.14],
          backgroundColor: colors.tertiary,
        }}
        transition={{
          backgroundColor: {
            duration: 1.3,
            ease: [0.22, 1, 0.36, 1],
          },
          x: {
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          },
          y: {
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          },
          scale: {
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          },
          opacity: {
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      />

      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0.9, 1, 0.9],
          scale: isPf ? 1.015 : 1,
        }}
        transition={{
          opacity: {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          },
          scale: {
            duration: 1.1,
            ease: [0.22, 1, 0.36, 1],
          },
        }}
        style={{
          background: colors.wash,
        }}
      />
    </div>
  )
}

function MobileHome({
  audience,
  setAudience,
  setMode,
  isLight,
  isPf,
  contact,
  heroCopy,
  logoSrc,
}: {
  audience: Audience
  setAudience: (audience: Audience) => void
  setMode: (mode: Mode) => void
  isLight: boolean
  isPf: boolean
  contact: (typeof contactByAudience)[Audience]
  heroCopy: {
    eyebrow: string
    title: string
    mobileTitle: string
    description: string
  }
  logoSrc: string
}) {
  const selectedOption =
    options.find((option) => option.audience === audience) ?? options[0]

  const SelectedIcon = selectedOption.Icon

  return (
    <section className="relative z-10 flex min-h-dvh flex-col gap-4 px-4 pb-4 pt-3 md:hidden">
      <header className="flex shrink-0 items-center justify-between gap-3">
        <a
          href="#"
          className="block shrink-0"
          aria-label="D'Print Gráfica"
        >
          <img
            src={logoSrc}
            alt="D'Print Gráfica"
            className="h-14 w-auto object-contain transition duration-700 ease-out sm:h-16"
          />
        </a>

        <button
          type="button"
          onClick={() => setMode(isLight ? "dark" : "light")}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-soft bg-surface-soft text-foreground shadow-sm backdrop-blur-xl"
          aria-label="Alternar tema"
        >
          {isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </button>
      </header>

      <div className="shrink-0">
        <motion.div
          key={heroCopy.eyebrow}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-3 inline-flex items-center gap-2 rounded-full brand-badge px-3 py-1.5 text-[11px] font-black backdrop-blur-xl"
        >
          <Sparkles className="h-3.5 w-3.5" />
          {heroCopy.eyebrow}
        </motion.div>

        <motion.h1
          key={heroCopy.mobileTitle}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-[1.9rem] font-black leading-[0.98] tracking-[-0.055em] text-foreground"
        >
          {heroCopy.mobileTitle}
        </motion.h1>

        <motion.p
          key={heroCopy.description}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.04 }}
          className="mt-3 text-sm leading-6 text-muted"
        >
          {heroCopy.description}
        </motion.p>
      </div>

      <div className="shrink-0 rounded-[1.5rem] border border-border-soft bg-surface-soft p-1.5 shadow-xl shadow-black/10 backdrop-blur-2xl">
        <div className="grid grid-cols-2 gap-1.5">
          {options.map((option) => {
            const Icon = option.Icon
            const active = audience === option.audience

            return (
              <button
                key={option.audience}
                type="button"
                onClick={() => setAudience(option.audience)}
                className={`group/card relative min-h-[86px] overflow-hidden rounded-[1.15rem] border p-3 text-left transition active:scale-[0.98] [--card-brand:var(--brand)] [--card-brand-dark:var(--brand-dark)] [--card-brand-soft:var(--brand-soft)] [--card-fill:var(--brand-fill)] [--card-glow:var(--glow-primary)] ${active
                  ? "border-[color:var(--card-brand)] bg-surface-strong shadow-[0_14px_35px_var(--card-glow)]"
                  : "border-border-soft bg-background/25 hover:border-[color:var(--card-brand)] hover:shadow-[0_14px_35px_var(--card-glow)]"
                  }`}
                aria-pressed={active}
              >
                <div className="pointer-events-none absolute inset-0 bg-[image:var(--brand-card-wash)]" />

                <div className="relative">
                  <div
                    className={`mb-2 flex h-9 w-9 items-center justify-center rounded-2xl ${active
                      ? "bg-[image:var(--card-fill)] text-white"
                      : "bg-foreground/10 text-foreground group-hover/card:bg-[image:var(--card-fill)] group-hover/card:text-white"
                      }`}
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </div>

                  <p className="text-[8px] font-black uppercase tracking-[0.18em] brand-gradient-text">
                    {option.badge}
                  </p>

                  <h2 className="mt-1 text-sm font-black leading-tight text-foreground">
                    {option.mobileTitle}
                  </h2>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <motion.div
        key={audience}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-[1.5rem] border border-border-soft bg-surface-soft p-4 shadow-xl shadow-black/10 backdrop-blur-2xl"
      >
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl brand-fill text-white shadow-[0_16px_38px_var(--glow-primary)]">
            <SelectedIcon className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] brand-gradient-text">
              {selectedOption.label}
            </p>

            <h3 className="mt-1 text-lg font-black leading-tight text-foreground">
              {selectedOption.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-muted">
              {selectedOption.mobileDescription}
            </p>
          </div>
        </div>

        <div className="mt-4 grid gap-2 text-xs font-semibold text-soft">
          <span className="inline-flex items-center gap-2 rounded-2xl border border-border-soft bg-background/25 px-3 py-2.5">
            <Printer className="h-4 w-4 shrink-0 text-brand" />
            Impressão digital e offset
          </span>

          <span className="inline-flex items-center gap-2 rounded-2xl border border-border-soft bg-background/25 px-3 py-2.5">
            <SelectedIcon className="h-4 w-4 shrink-0 text-brand" />
            {isPf ? "Pessoa física" : "Empresas e eventos"}
          </span>
        </div>

        <TransitionLink
          href={selectedOption.href}
          className="mt-4 flex w-full items-center justify-center gap-2 brand-soft-button rounded-2xl px-4 py-3 text-sm font-black transition active:scale-[0.98]"
        >
          Ver opções
          <ArrowRight className="h-4 w-4" />
        </TransitionLink>
      </motion.div>

      <div className="grid shrink-0 gap-2 text-xs font-semibold text-soft">
        <a
          href={contact.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-start gap-2 rounded-2xl border border-border-soft bg-surface-soft px-3 py-2.5 backdrop-blur-xl"
        >
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
          <span>{contact.address}</span>
        </a>

        <a
          href={contact.phoneHref}
          className="inline-flex items-center gap-2 rounded-2xl border border-border-soft bg-surface-soft px-3 py-2.5 backdrop-blur-xl"
        >
          <Phone className="h-4 w-4 shrink-0 text-brand" />
          {contact.phoneLabel}
        </a>
      </div>

      <a
        href={contact.whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="flex shrink-0 w-full items-center justify-center gap-2 brand-fill rounded-2xl px-5 py-4 text-sm font-black text-white shadow-[0_22px_55px_var(--glow-primary)] transition active:scale-[0.98]"
      >
        {contact.whatsappLabel}
        <ArrowRight className="h-4 w-4" />
      </a>
    </section>
  )
}

function DesktopHome({
  audience,
  setAudience,
  setMode,
  isLight,
  isPf,
  contact,
  heroCopy,
  theme,
  logoSrc,
}: {
  audience: Audience
  setAudience: (audience: Audience) => void
  setMode: (mode: Mode) => void
  isLight: boolean
  isPf: boolean
  contact: (typeof contactByAudience)[Audience]
  heroCopy: {
    eyebrow: string
    title: string
    mobileTitle: string
    description: string
  }
  theme: Theme
  logoSrc: string
}) {
  return (
    <section className="relative z-10 hidden h-dvh md:block">
      <header className="absolute left-0 right-0 top-0 z-30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
          <motion.a
            href="#"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="block shrink-0"
          >
            <img
              src={logoSrc}
              alt="D'Print Gráfica"
              className="h-20 w-auto object-contain transition duration-700 ease-out lg:h-24"
            />
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="flex items-center gap-3"
          >
            <button
              type="button"
              onClick={() => setMode(isLight ? "dark" : "light")}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-soft bg-surface-soft text-foreground shadow-sm backdrop-blur-xl transition hover:border-brand/40 hover:bg-brand-soft hover:text-brand"
              aria-label="Alternar tema"
            >
              {isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>

            <a
              href={contact.phoneHref}
              className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-surface-soft px-4 py-2.5 text-sm font-bold text-foreground shadow-sm backdrop-blur-xl transition hover:border-brand/40 hover:bg-brand-soft hover:text-brand"
            >
              <Phone className="h-4 w-4" />
              {contact.phoneLabel}
            </a>

            <a
              href={contact.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="brand-fill rounded-full px-5 py-3 text-sm font-black text-white shadow-2xl transition hover:-translate-y-0.5 hover:brightness-110"
            >
              {contact.whatsappLabel}
            </a>
          </motion.div>
        </div>
      </header>

      <div className="flex h-full items-center">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-8 pt-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col justify-center">
            <motion.div
              key={heroCopy.eyebrow}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mb-6 inline-flex w-fit items-center gap-2 rounded-full brand-badge px-4 py-2 text-sm font-bold backdrop-blur-xl"
            >
              <Sparkles className="h-4 w-4" />
              {heroCopy.eyebrow}
            </motion.div>

            <motion.h1
              key={heroCopy.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl text-6xl font-black tracking-[-0.06em] text-foreground lg:text-7xl"
            >
              {heroCopy.title}
            </motion.h1>

            <motion.p
              key={heroCopy.description}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="mt-6 max-w-2xl text-lg leading-8 text-muted"
            >
              {heroCopy.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-soft"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-surface-soft px-4 py-2 backdrop-blur-xl">
                <Printer className="h-4 w-4 text-brand" />
                Impressão digital e offset
              </span>

              <a
                href={contact.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex max-w-full items-center gap-2 rounded-full border border-border-soft bg-surface-soft px-4 py-2 backdrop-blur-xl transition hover:border-brand/40 hover:bg-brand-soft hover:text-brand"
              >
                <MapPin className="h-4 w-4 shrink-0 text-brand" />
                <span>{contact.address}</span>
              </a>

              <span className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-surface-soft px-4 py-2 backdrop-blur-xl">
                {isPf ? "Pessoa física" : "Empresas e eventos"}
              </span>
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.12,
                  delayChildren: 0.25,
                },
              },
            }}
            className="grid content-center gap-5"
          >
            {options.map((option) => (
              <DesktopOptionCard
                key={option.title}
                option={option}
                active={audience === option.audience}
                setAudience={setAudience}
              />
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.75 }}
        className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 text-center text-xs font-semibold uppercase tracking-[0.25em] text-soft"
      >
        D&apos;Print Gráfica · {theme}
      </motion.div>
    </section>
  )
}

function DesktopOptionCard({
  option,
  active,
  setAudience,
}: {
  option: (typeof options)[number]
  active: boolean
  setAudience: (audience: Audience) => void
}) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })
  const Icon = option.Icon

  function handleMouseMove(event: MouseEvent<HTMLAnchorElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height

    const rotateY = (x - 0.5) * 10
    const rotateX = -(y - 0.5) * 10

    event.currentTarget.style.setProperty("--mouse-x", `${x * 100}%`)
    event.currentTarget.style.setProperty("--mouse-y", `${y * 100}%`)

    setTilt({ rotateX, rotateY })
  }

  function resetTilt() {
    setTilt({ rotateX: 0, rotateY: 0 })
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 28, scale: 0.98 },
        show: { opacity: 1, y: 0, scale: 1 },
      }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      whileTap={{ scale: 0.985 }}
      className="group/card [perspective:900px]"
    >
      <TransitionLink
        href={option.href}
        onMouseEnter={() => setAudience(option.audience)}
        onFocus={() => setAudience(option.audience)}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
        className="block"
      >
        <div
          style={{
            transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
            transformStyle: "preserve-3d",
          }}
          className={`relative overflow-hidden rounded-[2rem] border p-7 shadow-2xl backdrop-blur-2xl transition-[transform,border-color,box-shadow,background-color,color,filter] duration-700 ease-out [--card-brand:var(--brand)] [--card-brand-dark:var(--brand-dark)] [--card-brand-soft:var(--brand-soft)] [--card-fill:var(--brand-fill)] [--card-glow:var(--glow-primary)] ${active
            ? "border-[color:var(--card-brand)] bg-surface-strong shadow-[0_24px_70px_var(--card-glow)]"
            : "border-border-soft bg-surface-soft shadow-black/10 group-hover/card:border-[color:var(--card-brand)] group-hover/card:shadow-[0_24px_70px_var(--card-glow)]"
            }`}
        >
          <div className="absolute inset-0 bg-[image:var(--brand-card-wash)] opacity-80" />

          <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover/card:opacity-100 [background:radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(255,255,255,0.16),transparent_32%)]" />

          <div className="relative flex items-start gap-5 [transform:translateZ(22px)]">
            <div
              className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-white shadow-2xl transition group-hover/card:rotate-3 group-hover/card:scale-105 ${active
                ? "bg-[image:var(--card-fill)] shadow-[0_18px_45px_var(--card-glow)]"
                : "bg-foreground/10 text-foreground group-hover/card:bg-[image:var(--card-fill)] group-hover/card:text-white"
                }`}
            >
              <Icon className="h-8 w-8" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-black uppercase tracking-[0.25em] brand-gradient-text">
                {option.label}
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-tight text-foreground">
                {option.title}
              </h2>

              <p className="mt-3 max-w-xl leading-7 text-muted">
                {option.description}
              </p>
            </div>

            <div
              className={`hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border transition sm:flex ${active
                ? "border-[color:var(--card-brand)] bg-[image:var(--card-fill)] text-white"
                : "border-border-soft bg-surface-soft text-foreground group-hover/card:border-[color:var(--card-brand)] group-hover/card:bg-[image:var(--card-fill)] group-hover/card:text-white"
                }`}
            >
              <ArrowRight className="h-5 w-5 transition group-hover/card:translate-x-0.5" />
            </div>
          </div>
        </div>
      </TransitionLink>
    </motion.div>
  )
}
