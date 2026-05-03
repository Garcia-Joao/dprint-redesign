"use client"

import { usePathname } from "next/navigation"
import PageTransition from "./PageTransition"
import SiteTopbar from "./SiteTopbar"

const TOPBAR_HEIGHT = 72

function getPageVariant(pathname: string) {
  if (pathname === "/") {
    return {
      showTopbar: false,
      scrollbarClass: "scrollbar-default",
      usePageTransition: true,
    }
  }

  if (pathname.startsWith("/empresas")) {
    return {
      showTopbar: true,
      scrollbarClass: "scrollbar-empresas",
      usePageTransition: true,
    }
  }

  if (pathname.startsWith("/impressao-rapida")) {
    return {
      showTopbar: true,
      scrollbarClass: "scrollbar-impressao-rapida",
      usePageTransition: true,
    }
  }

  return {
    showTopbar: true,
    scrollbarClass: "scrollbar-default",
    usePageTransition: true,
  }
}

export default function SiteShell({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const pageVariant = getPageVariant(pathname)

  const content = pageVariant.usePageTransition ? (
    <PageTransition>{children}</PageTransition>
  ) : (
    children
  )

  return (
    <div className="h-dvh overflow-hidden bg-background text-foreground">
      {pageVariant.showTopbar ? <SiteTopbar /> : null}

      <div
        className="h-full overflow-hidden"
        style={{
          paddingTop: pageVariant.showTopbar ? TOPBAR_HEIGHT : 0,
        }}
      >
        <div
          id="site-scroll-container"
          className={`h-full overflow-y-auto overflow-x-hidden ${pageVariant.scrollbarClass}`}
        >
          {content}
        </div>
      </div>
    </div>
  )
}