"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AppIcon } from "@/components/app-icon"
import {
  User,
  Briefcase,
  Code,
  Mail,
  FileText,
  Camera,
  Music,
  Settings,
  MessageSquare,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react"

interface HomeScreenProps {
  isVisible: boolean
  onAppClick: (appId: string) => void
}

const apps = [
  { id: "about", name: "About", icon: User, color: "bg-primary" },
  { id: "projects", name: "Projects", icon: Briefcase, color: "bg-accent" },
  { id: "skills", name: "Skills", icon: Code, color: "bg-chart-3" },
  { id: "contact", name: "Contact", icon: Mail, color: "bg-chart-5" },
  { id: "blog", name: "Blog", icon: FileText, color: "bg-chart-4" },
  { id: "gallery", name: "Gallery", icon: Camera, color: "bg-chart-2" },
  { id: "music", name: "Music", icon: Music, color: "bg-primary" },
  { id: "messages", name: "Messages", icon: MessageSquare, color: "bg-chart-3" },
  { id: "settings", name: "Settings", icon: Settings, color: "bg-muted-foreground" },
  { id: "photos", name: "Photos", icon: Camera, color: "bg-chart-5" },
  { id: "notes", name: "Notes", icon: FileText, color: "bg-chart-4" },
  { id: "calendar", name: "Calendar", icon: Briefcase, color: "bg-accent" },
]

export function HomeScreen({ isVisible, onAppClick }: HomeScreenProps) {
  const router = useRouter()
  const [time, setTime] = useState(
    new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }),
  )

  useState(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }))
    }, 1000)
    return () => clearInterval(interval)
  })

  const handleAppClick = (appId: string) => {
    onAppClick(appId)
    // On mobile, navigate to the app route
    if (window.innerWidth < 768) {
      router.push(`/${appId}`)
    }
  }

  return (
    <div
      className={`absolute inset-0 bg-background transition-transform duration-500 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex flex-col h-full px-6 py-12">
        {/* Status Bar */}
        <div className="flex justify-between items-center mb-8 px-2">
          <span className="text-sm font-medium text-foreground">{time}</span>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-chart-3" />
            <div className="w-4 h-4 rounded-full bg-primary" />
            <div className="text-sm font-medium text-foreground">100%</div>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-4 gap-4 content-start justify-items-center">
          {apps.map((app, index) => (
            <div key={app.id} onClick={() => handleAppClick(app.id)}>
              <AppIcon name={app.name} icon={app.icon} color={app.color} delay={index * 50} />
            </div>
          ))}
        </div>

        {/* Dock with social links */}
        <div className="flex justify-center gap-6 px-4 py-6 bg-card/50 backdrop-blur-xl rounded-3xl border border-border/50 mx-2">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-2xl bg-muted-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          >
            <Github className="w-7 h-7 text-primary-foreground" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          >
            <Linkedin className="w-7 h-7 text-primary-foreground" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-2xl bg-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          >
            <Twitter className="w-7 h-7 text-background" />
          </a>
        </div>
      </div>
    </div>
  )
}
