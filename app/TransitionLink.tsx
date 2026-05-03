"use client"

import type { AnchorHTMLAttributes, ReactNode } from "react"
import { useRouter } from "next/navigation"

type TransitionLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  children: ReactNode
  duration?: number
}

export default function TransitionLink({
  href,
  children,
  duration = 420,
  onClick,
  ...props
}: TransitionLinkProps) {
  const router = useRouter()

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    onClick?.(event)

    if (
      event.defaultPrevented ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0 ||
      props.target === "_blank"
    ) {
      return
    }

    const targetUrl = new URL(href, window.location.href)
    const currentUrl = new URL(window.location.href)

    const samePathAndSearch =
      targetUrl.pathname === currentUrl.pathname &&
      targetUrl.search === currentUrl.search

    const sameFullUrl =
      samePathAndSearch && targetUrl.hash === currentUrl.hash

    if (sameFullUrl) {
      event.preventDefault()
      window.dispatchEvent(new Event("route-leave-cancel"))
      return
    }

    if (samePathAndSearch && targetUrl.hash) {
      event.preventDefault()
      window.dispatchEvent(new Event("route-leave-cancel"))

      const targetId = targetUrl.hash.replace("#", "")
      const targetElement = document.getElementById(targetId)
      const scrollContainer = document.getElementById("site-scroll-container")

      if (targetElement && scrollContainer) {
        const containerRect = scrollContainer.getBoundingClientRect()
        const elementRect = targetElement.getBoundingClientRect()

        scrollContainer.scrollTo({
          top:
            elementRect.top -
            containerRect.top +
            scrollContainer.scrollTop -
            96,
          behavior: "smooth",
        })
      } else {
        window.location.hash = targetUrl.hash
      }

      return
    }

    event.preventDefault()

    window.dispatchEvent(new Event("route-leave-start"))

    window.setTimeout(() => {
      router.push(targetUrl.pathname + targetUrl.search + targetUrl.hash)
    }, duration)
  }

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}