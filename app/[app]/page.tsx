"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { TerminalContent } from "@/components/terminal-content"

export default function AppPage() {
  const params = useParams()
  const [isVisible, setIsVisible] = useState(false)
  const appId = params.app as string

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 50)
  }, [])

  return (
    <div className="fixed inset-0 bg-background">
      <div
        className={`absolute inset-0 transition-transform duration-500 ease-out ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <TerminalContent currentPage={appId} isMobile={true} />
      </div>
    </div>
  )
}
