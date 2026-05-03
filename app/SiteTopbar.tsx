"use client"

import { usePathname } from "next/navigation"
import {
  ArrowLeft,
  BookOpenText,
  BriefcaseBusiness,
  MessageCircle,
  PackageSearch,
} from "lucide-react"

import TransitionLink from "./TransitionLink"

type TopbarContent = {
  backHref: string
  whatsappText: string
  budgetHref: string
  productsHref: string
  blogHref: string
  whatWeDoHref: string
}

function getTopbarContent(pathname: string): TopbarContent {
  if (pathname.startsWith("/empresas/produtos")) {
    return {
      backHref: "/empresas",
      whatsappText:
        "Olá! Gostaria de solicitar um orçamento para materiais gráficos empresariais.",
      budgetHref: "/empresas#contato",
      productsHref: "/empresas/produtos",
      blogHref: "/blog",
      whatWeDoHref: "/empresas#servicos",
    }
  }

  if (pathname.startsWith("/empresas")) {
    return {
      backHref: "/",
      whatsappText:
        "Olá! Gostaria de solicitar um orçamento para materiais gráficos empresariais.",
      budgetHref: "/empresas#contato",
      productsHref: "/empresas/produtos",
      blogHref: "/blog",
      whatWeDoHref: "/empresas#servicos",
    }
  }

  if (pathname.startsWith("/impressao-rapida/produtos")) {
    return {
      backHref: "/impressao-rapida",
      whatsappText: "Olá! Gostaria de falar sobre impressão rápida.",
      budgetHref: "/impressao-rapida#contato",
      productsHref: "/impressao-rapida/produtos",
      blogHref: "/blog",
      whatWeDoHref: "/impressao-rapida#servicos",
    }
  }

  if (pathname.startsWith("/impressao-rapida")) {
    return {
      backHref: "/",
      whatsappText: "Olá! Gostaria de falar sobre impressão rápida.",
      budgetHref: "/impressao-rapida#contato",
      productsHref: "/impressao-rapida/produtos",
      blogHref: "/blog",
      whatWeDoHref: "/impressao-rapida#servicos",
    }
  }

  return {
    backHref: "/",
    whatsappText: "Olá! Gostaria de falar com a D'Print.",
    budgetHref: "#contato",
    productsHref: "/empresas/produtos",
    blogHref: "/blog",
    whatWeDoHref: "#servicos",
  }
}

export default function SiteTopbar() {
  const pathname = usePathname()
  const content = getTopbarContent(pathname)

  const whatsappHref = `https://wa.me/551128588080?text=${encodeURIComponent(
    content.whatsappText,
  )}`

  return (
    <header className="fixed left-0 right-0 top-0 z-[900] h-[72px] border-b border-border-soft bg-background/78 shadow-xl shadow-black/10 backdrop-blur-2xl">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-3 px-3 md:px-5 lg:px-6">
        <div className="flex shrink-0 items-center">
          <TransitionLink
            href={content.backHref}
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-border-soft bg-surface-soft px-3 text-sm font-black text-foreground shadow-sm transition hover:border-brand/40 hover:bg-brand-soft hover:text-brand md:px-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Voltar</span>
          </TransitionLink>
        </div>

        <nav
          aria-label="Navegação principal"
          className="hidden min-w-0 flex-1 items-center justify-center gap-2 lg:flex"
        >
          <TransitionLink
            href={content.productsHref}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-border-soft bg-surface-soft px-4 text-sm font-black text-foreground shadow-sm backdrop-blur-xl transition hover:border-brand/40 hover:bg-brand-soft hover:text-brand"
          >
            <PackageSearch className="h-4 w-4 text-brand" />
            Produtos
          </TransitionLink>

          <TransitionLink
            href={content.blogHref}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-border-soft bg-surface-soft px-4 text-sm font-black text-foreground shadow-sm backdrop-blur-xl transition hover:border-brand/40 hover:bg-brand-soft hover:text-brand"
          >
            <BookOpenText className="h-4 w-4 text-brand" />
            Blog
          </TransitionLink>

          <TransitionLink
            href={content.whatWeDoHref}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-border-soft bg-surface-soft px-4 text-sm font-black text-foreground shadow-sm backdrop-blur-xl transition hover:border-brand/40 hover:bg-brand-soft hover:text-brand"
          >
            <BriefcaseBusiness className="h-4 w-4 text-brand" />
            O que fazemos
          </TransitionLink>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <TransitionLink
            href={content.budgetHref}
            className="inline-flex h-10 items-center justify-center rounded-full bg-brand px-4 text-xs font-black text-white shadow-xl shadow-brand/25 transition hover:-translate-y-0.5 hover:bg-brand-dark sm:text-sm md:px-5"
          >
            <span className="sm:hidden">Orçamento</span>
            <span className="hidden sm:inline">Solicitar orçamento</span>
          </TransitionLink>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-border-soft bg-surface-soft px-3 text-xs font-black text-foreground shadow-sm transition hover:border-brand/40 hover:bg-brand-soft hover:text-brand sm:text-sm md:px-4"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  )
}