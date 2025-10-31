"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronUp, Github, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LockScreenProps {
  isVisible: boolean
  onUnlock: () => void
}

export function LockScreen({ isVisible, onUnlock }: LockScreenProps) {
  const [time, setTime] = useState("")
  const [date, setDate] = useState("")
  const [startY, setStartY] = useState(0)
  const [currentY, setCurrentY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }))
      setDate(now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY)
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const deltaY = startY - e.touches[0].clientY
    if (deltaY > 0) {
      setCurrentY(deltaY)
    }
  }

  const handleTouchEnd = () => {
    if (currentY > 100) {
      onUnlock()
    }
    setCurrentY(0)
    setIsDragging(false)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setStartY(e.clientY)
    setIsDragging(true)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const deltaY = startY - e.clientY
    if (deltaY > 0) {
      setCurrentY(deltaY)
    }
  }

  const handleMouseUp = () => {
    if (currentY > 100) {
      onUnlock()
    }
    setCurrentY(0)
    setIsDragging(false)
  }

  return (
    <div
      className={`absolute inset-0 bg-background transition-transform duration-500 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{ transform: isVisible ? `translateY(-${currentY}px)` : "translateY(-100%)" }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="flex flex-col items-center justify-between h-full px-8 py-16">
        {/* Time Display */}
        <div className="text-center space-y-2 mt-8">
          <h1 className="text-7xl font-bold text-foreground tracking-tight">{time}</h1>
          <p className="text-lg text-muted-foreground">{date}</p>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center space-y-6 -mt-12">
          <Avatar className="w-32 h-32 border-4 border-primary shadow-lg">
            <AvatarImage src="/professional-developer-avatar.png" alt="Profile" />
            <AvatarFallback className="text-4xl bg-primary text-primary-foreground">JD</AvatarFallback>
          </Avatar>

          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">John Developer</h2>
            <p className="text-sm text-muted-foreground max-w-xs text-balance">
              Full-stack developer passionate about creating beautiful and functional web experiences
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <Button
              size="icon"
              variant="outline"
              className="w-12 h-12 rounded-full bg-card border-primary/30 hover:bg-primary hover:border-primary transition-all"
              asChild
            >
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5" />
              </a>
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="w-12 h-12 rounded-full bg-card border-primary/30 hover:bg-primary hover:border-primary transition-all"
              asChild
            >
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-5 h-5" />
              </a>
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="w-12 h-12 rounded-full bg-card border-primary/30 hover:bg-primary hover:border-primary transition-all"
              asChild
            >
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>

        {/* Slide Up Indicator */}
        <div className="flex flex-col items-center gap-2 mb-8">
          <div className="animate-slide-up-bounce">
            <ChevronUp className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">Slide up to unlock</p>
        </div>
      </div>
    </div>
  )
}
