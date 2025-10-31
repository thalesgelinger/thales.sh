"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { LockScreen } from "@/components/lock-screen"
import { HomeScreen } from "@/components/home-screen"
import { TerminalContent } from "@/components/terminal-content"

export default function Page() {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [hasBeenDragged, setHasBeenDragged] = useState(false)
  const [currentPage, setCurrentPage] = useState("about")
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const deviceRef = useRef<HTMLDivElement>(null)
  const dragStartPos = useRef({ x: 0, y: 0, deviceX: 0, deviceY: 0 })

  const handleMouseDown = (e: React.MouseEvent) => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return // Only on desktop
    setIsDragging(true)
    dragStartPos.current = {
      x: e.clientX,
      y: e.clientY,
      deviceX: position.x,
      deviceY: position.y,
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      const deltaX = e.clientX - dragStartPos.current.x
      const deltaY = e.clientY - dragStartPos.current.y
      setPosition({
        x: dragStartPos.current.deviceX + deltaX,
        y: dragStartPos.current.deviceY + deltaY,
      })
      if ((Math.abs(deltaX) > 20 || Math.abs(deltaY) > 20) && !hasBeenDragged) {
        setHasBeenDragged(true)
        setIsUnlocked(true)
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, hasBeenDragged])

  return (
    <main className="min-h-screen flex items-center justify-center bg-background md:p-4 overflow-hidden">
      {hasBeenDragged && (
        <div className="hidden md:block fixed inset-0 z-0">
          <TerminalContent currentPage={currentPage} isMobile={false} />
        </div>
      )}

      {!hasBeenDragged && (
        <div className="hidden md:block fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-card/90 backdrop-blur-xl px-6 py-3 rounded-full border border-border shadow-lg animate-bounce">
          <p className="text-sm font-medium text-foreground">Drag the device to unlock</p>
        </div>
      )}

      <div
        ref={deviceRef}
        className="relative w-full h-screen md:h-auto md:max-w-[400px] md:aspect-[9/19.5] bg-card md:rounded-[3rem] md:shadow-2xl overflow-hidden md:border-8 md:border-secondary z-10"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          cursor: isDragging ? "grabbing" : (typeof window !== 'undefined' && window.innerWidth >= 768) ? "grab" : "default",
          transition: isDragging ? "none" : "transform 0.2s ease-out",
        }}
        onMouseDown={handleMouseDown}
      >
        {/* Notch */}
        <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-background rounded-b-3xl z-50" />

        {/* Screen Content */}
        <div className="relative w-full h-full overflow-hidden">
          <LockScreen isVisible={!isUnlocked} onUnlock={() => setIsUnlocked(true)} />
          <HomeScreen isVisible={isUnlocked} onAppClick={setCurrentPage} />
        </div>
      </div>
    </main>
  )
}
