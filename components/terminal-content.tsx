"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface TerminalContentProps {
  currentPage: string
  isMobile?: boolean
}

const pageContent: Record<string, { path: string; content: React.ReactNode }> = {
  about: {
    path: "~/portfolio/about",
    content: (
      <>
        <h1 className="text-4xl font-bold mb-6 text-primary">About Me</h1>
        <p className="text-lg leading-relaxed mb-4">
          Welcome to my digital space. I'm a passionate developer who loves creating beautiful and functional web
          experiences.
        </p>
        <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-6">
          "Code is like humor. When you have to explain it, it's bad." - Cory House
        </blockquote>
        <p className="text-lg leading-relaxed">
          With years of experience in modern web technologies, I specialize in building responsive, accessible, and
          performant applications.
        </p>
      </>
    ),
  },
  projects: {
    path: "~/portfolio/projects",
    content: (
      <>
        <h1 className="text-4xl font-bold mb-6 text-accent">Projects</h1>
        <div className="space-y-6">
          <div className="border border-border rounded-lg p-6 bg-card/50">
            <h2 className="text-2xl font-semibold mb-2 text-primary">Project Alpha</h2>
            <p className="text-muted-foreground mb-3">A revolutionary web application built with Next.js and React</p>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">Next.js</span>
              <span className="px-3 py-1 bg-chart-3/20 text-chart-3 rounded-full text-sm">TypeScript</span>
            </div>
          </div>
          <div className="border border-border rounded-lg p-6 bg-card/50">
            <h2 className="text-2xl font-semibold mb-2 text-accent">Project Beta</h2>
            <p className="text-muted-foreground mb-3">An innovative mobile-first design system</p>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">React</span>
              <span className="px-3 py-1 bg-chart-4/20 text-chart-4 rounded-full text-sm">Tailwind</span>
            </div>
          </div>
        </div>
      </>
    ),
  },
  skills: {
    path: "~/portfolio/skills",
    content: (
      <>
        <h1 className="text-4xl font-bold mb-6 text-chart-3">Technical Skills</h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-border rounded-lg p-4 bg-card/50">
            <h3 className="text-xl font-semibold mb-3 text-primary">Frontend</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• React & Next.js</li>
              <li>• TypeScript</li>
              <li>• Tailwind CSS</li>
            </ul>
          </div>
          <div className="border border-border rounded-lg p-4 bg-card/50">
            <h3 className="text-xl font-semibold mb-3 text-accent">Backend</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Node.js</li>
              <li>• PostgreSQL</li>
              <li>• REST APIs</li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  contact: {
    path: "~/portfolio/contact",
    content: (
      <>
        <h1 className="text-4xl font-bold mb-6 text-chart-5">Get In Touch</h1>
        <p className="text-lg leading-relaxed mb-6">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
        </p>
        <div className="space-y-4">
          <div className="border border-border rounded-lg p-4 bg-card/50">
            <h3 className="text-lg font-semibold text-primary mb-2">Email</h3>
            <p className="text-muted-foreground">hello@example.com</p>
          </div>
          <div className="border border-border rounded-lg p-4 bg-card/50">
            <h3 className="text-lg font-semibold text-accent mb-2">Location</h3>
            <p className="text-muted-foreground">San Francisco, CA</p>
          </div>
        </div>
      </>
    ),
  },
  blog: {
    path: "~/portfolio/blog",
    content: (
      <>
        <h1 className="text-4xl font-bold mb-6 text-chart-4">Latest Posts</h1>
        <article className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-primary">Building Modern Web Apps</h2>
          <p className="text-sm text-muted-foreground mb-3">Posted on March 15, 2024</p>
          <p className="leading-relaxed">
            Exploring the latest trends in web development and how to leverage modern frameworks for better user
            experiences...
          </p>
        </article>
        <article>
          <h2 className="text-2xl font-semibold mb-2 text-accent">The Art of Clean Code</h2>
          <p className="text-sm text-muted-foreground mb-3">Posted on March 10, 2024</p>
          <p className="leading-relaxed">
            Writing maintainable code is an art form. Here are some principles I follow to keep my codebase clean and
            scalable...
          </p>
        </article>
      </>
    ),
  },
}

export function TerminalContent({ currentPage, isMobile = false }: TerminalContentProps) {
  const router = useRouter()
  const [displayText, setDisplayText] = useState("")
  const [isClosing, setIsClosing] = useState(false)
  const content = pageContent[currentPage] || pageContent.about

  useEffect(() => {
    setDisplayText("")
    let index = 0
    const text = content.path
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
      }
    }, 50)
    return () => clearInterval(interval)
  }, [content.path])

  const handleClose = () => {
    if (isMobile) {
      setIsClosing(true)
      setTimeout(() => {
        router.push("/")
      }, 500)
    }
  }

  return (
    <div
      className={`w-full h-full flex items-center justify-center ${isMobile ? "p-0" : "p-8"} transition-transform duration-500 ${isClosing && isMobile ? "translate-y-full" : "translate-y-0"}`}
    >
      <div
        className={`w-full ${isMobile ? "h-full" : "max-w-4xl h-[80vh]"} bg-card/80 backdrop-blur-xl ${isMobile ? "rounded-none" : "rounded-2xl"} border border-border shadow-2xl overflow-hidden flex flex-col`}
      >
        <div className="bg-secondary/50 px-6 py-4 border-b border-border flex items-center gap-3">
          <div className="flex gap-2">
            <button
              onClick={handleClose}
              className={`${isMobile ? "w-5 h-5" : "w-3 h-3"} rounded-full bg-chart-5 hover:brightness-110 transition-all ${isMobile ? "cursor-pointer" : ""}`}
              aria-label="Close"
            />
            <div className={`${isMobile ? "w-5 h-5" : "w-3 h-3"} rounded-full bg-accent`} />
            <div className={`${isMobile ? "w-5 h-5" : "w-3 h-3"} rounded-full bg-primary`} />
          </div>
          <div className="flex-1 text-center font-mono text-sm text-muted-foreground">
            <span className="text-primary">➜</span> <span className="text-primary">{displayText}</span>
            <span className="animate-pulse">▊</span>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-8 font-sans animate-in fade-in duration-500">
          <div className="prose prose-invert max-w-none">{content.content}</div>
        </div>
      </div>
    </div>
  )
}
