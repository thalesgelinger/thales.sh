"use client"

import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface AppIconProps {
  name: string
  icon: LucideIcon
  color: string
  delay?: number
}

export function AppIcon({ name, icon: Icon, color, delay = 0 }: AppIconProps) {
  return (
    <button className="flex flex-col items-center gap-2 group" style={{ animationDelay: `${delay}ms` }}>
      <div
        className={cn(
          "w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 group-active:scale-95",
          color,
        )}
      >
        <Icon className="w-8 h-8 text-primary-foreground" />
      </div>
      <span className="text-xs text-foreground font-medium text-center leading-tight">{name}</span>
    </button>
  )
}
