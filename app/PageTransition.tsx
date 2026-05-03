"use client"

import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"
import { useEffect, useRef, useState } from "react"

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [isLeaving, setIsLeaving] = useState(false)
  const fallbackTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    function clearFallbackTimeout() {
      if (fallbackTimeoutRef.current !== null) {
        window.clearTimeout(fallbackTimeoutRef.current)
        fallbackTimeoutRef.current = null
      }
    }

    function handleRouteLeaveStart() {
      clearFallbackTimeout()
      setIsLeaving(true)

      fallbackTimeoutRef.current = window.setTimeout(() => {
        setIsLeaving(false)
        fallbackTimeoutRef.current = null
      }, 1600)
    }

    function handleRouteLeaveCancel() {
      clearFallbackTimeout()
      setIsLeaving(false)
    }

    function handleRouteLeaveEnd() {
      clearFallbackTimeout()
      setIsLeaving(false)
    }

    window.addEventListener("route-leave-start", handleRouteLeaveStart)
    window.addEventListener("route-leave-cancel", handleRouteLeaveCancel)
    window.addEventListener("route-leave-end", handleRouteLeaveEnd)

    return () => {
      clearFallbackTimeout()
      window.removeEventListener("route-leave-start", handleRouteLeaveStart)
      window.removeEventListener("route-leave-cancel", handleRouteLeaveCancel)
      window.removeEventListener("route-leave-end", handleRouteLeaveEnd)
    }
  }, [])

  useEffect(() => {
    if (fallbackTimeoutRef.current !== null) {
      window.clearTimeout(fallbackTimeoutRef.current)
      fallbackTimeoutRef.current = null
    }

    setIsLeaving(false)
    window.dispatchEvent(new Event("route-leave-end"))
  }, [pathname])

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{
            opacity: 0,
            y: 18,
            scale: 0.985,
            filter: "blur(10px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            transitionEnd: {
              filter: "none",
            },
          }}
          exit={{
            opacity: 0,
            y: -18,
            scale: 0.985,
            filter: "blur(10px)",
          }}
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="min-h-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <motion.div
        className="fixed inset-0 z-[9999] bg-background"
        style={{ pointerEvents: "none" }}
        initial={false}
        animate={{
          opacity: isLeaving ? 1 : 0,
          backdropFilter: isLeaving ? "blur(14px)" : "blur(0px)",
        }}
        transition={{
          duration: isLeaving ? 0.32 : 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      <motion.div
        className="fixed inset-0 z-[10000] bg-[radial-gradient(circle_at_50%_50%,var(--brand-soft),transparent_34%),linear-gradient(135deg,var(--background),var(--brand),var(--background))]"
        style={{ pointerEvents: "none" }}
        initial={false}
        animate={{
          opacity: isLeaving ? 0.92 : 0,
          clipPath: isLeaving
            ? "circle(150% at 50% 50%)"
            : "circle(0% at 50% 50%)",
        }}
        transition={{
          duration: isLeaving ? 0.38 : 0.65,
          ease: [0.76, 0, 0.24, 1],
        }}
      />
    </>
  )
}