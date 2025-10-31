<script lang="ts">
  import { goto } from '$app/navigation';

  interface Props {
    currentPage: string;
    isMobile?: boolean;
  }

  let { currentPage, isMobile = false }: Props = $props();

  let displayText = $state('');
  let isClosing = $state(false);

  const pageContent: Record<string, { path: string; content: string }> = {
    about: {
      path: '~/portfolio/about',
      content: `
        <h1 class="text-4xl font-bold mb-6 text-tokyo-night-cyan">About Me</h1>
        <p class="text-lg leading-relaxed mb-4 text-tokyo-night-fg">
          Welcome to my digital space. I'm a passionate developer who loves creating beautiful and functional web
          experiences.
        </p>
        <blockquote class="border-l-4 border-tokyo-night-cyan pl-4 italic text-tokyo-night-cyan my-6">
          "Code is like humor. When you have to explain it, it's bad." - Cory House
        </blockquote>
        <p class="text-lg leading-relaxed text-tokyo-night-fg">
          With years of experience in modern web technologies, I specialize in building responsive, accessible, and
          performant applications.
        </p>
      `,
    },
    projects: {
      path: '~/portfolio/projects',
      content: `
        <h1 class="text-4xl font-bold mb-6 text-tokyo-night-orange">Projects</h1>
        <div class="space-y-6">
          <div class="border border-tokyo-night-terminal-black rounded-lg p-6 bg-tokyo-night-cyan/20">
            <h2 class="text-2xl font-semibold mb-2 text-tokyo-night-cyan">Project Alpha</h2>
            <p class="text-tokyo-night-fg-dark mb-3">A revolutionary web application built with Next.js and React</p>
            <div class="flex gap-2">
              <span class="px-3 py-1 bg-tokyo-night-cyan/20 text-tokyo-night-cyan rounded-full text-sm">Next.js</span>
              <span class="px-3 py-1 bg-tokyo-night-purple/20 text-tokyo-night-purple rounded-full text-sm">TypeScript</span>
            </div>
          </div>
          <div class="border border-tokyo-night-terminal-black rounded-lg p-6 bg-tokyo-night-cyan/20">
            <h2 class="text-2xl font-semibold mb-2 text-tokyo-night-orange">Project Beta</h2>
            <p class="text-tokyo-night-fg-dark mb-3">An innovative mobile-first design system</p>
            <div class="flex gap-2">
              <span class="px-3 py-1 bg-tokyo-night-green/20 text-tokyo-night-green rounded-full text-sm">React</span>
              <span class="px-3 py-1 bg-tokyo-night-blue/20 text-tokyo-night-blue rounded-full text-sm">Tailwind</span>
            </div>
          </div>
        </div>
      `,
    },
    skills: {
      path: '~/portfolio/skills',
      content: `
        <h1 class="text-4xl font-bold mb-6 text-tokyo-night-purple">Technical Skills</h1>
        <div class="grid grid-cols-2 gap-4">
          <div class="border border-tokyo-night-terminal-black rounded-lg p-4 bg-tokyo-night-cyan/20">
            <h3 class="text-xl font-semibold mb-3 text-tokyo-night-cyan">Frontend</h3>
            <ul class="space-y-2 text-tokyo-night-fg-dark">
              <li>• React & Next.js</li>
              <li>• TypeScript</li>
              <li>• Tailwind CSS</li>
            </ul>
          </div>
          <div class="border border-tokyo-night-terminal-black rounded-lg p-4 bg-tokyo-night-cyan/20">
            <h3 class="text-xl font-semibold mb-3 text-tokyo-night-orange">Backend</h3>
            <ul class="space-y-2 text-tokyo-night-fg-dark">
              <li>• Node.js</li>
              <li>• PostgreSQL</li>
              <li>• REST APIs</li>
            </ul>
          </div>
        </div>
      `,
    },
    contact: {
      path: '~/portfolio/contact',
      content: `
        <h1 class="text-4xl font-bold mb-6 text-tokyo-night-magenta">Get In Touch</h1>
        <p class="text-lg leading-relaxed mb-6 text-tokyo-night-fg">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
        </p>
        <div class="space-y-4">
          <div class="border border-tokyo-night-terminal-black rounded-lg p-4 bg-tokyo-night-cyan/20">
            <h3 class="text-lg font-semibold text-tokyo-night-cyan mb-2">Email</h3>
            <p class="text-tokyo-night-fg-dark">hello@example.com</p>
          </div>
          <div class="border border-tokyo-night-terminal-black rounded-lg p-4 bg-tokyo-night-cyan/20">
            <h3 class="text-lg font-semibold text-tokyo-night-orange mb-2">Location</h3>
            <p class="text-tokyo-night-fg-dark">San Francisco, CA</p>
          </div>
        </div>
      `,
    },
    blog: {
      path: '~/portfolio/blog',
      content: `
        <h1 class="text-4xl font-bold mb-6 text-tokyo-night-blue">Latest Posts</h1>
        <article class="mb-8">
          <h2 class="text-2xl font-semibold mb-2 text-tokyo-night-cyan">Building Modern Web Apps</h2>
          <p class="text-sm text-tokyo-night-fg-dark mb-3">Posted on March 15, 2024</p>
          <p class="leading-relaxed text-tokyo-night-fg">
            Exploring the latest trends in web development and how to leverage modern frameworks for better user
            experiences...
          </p>
        </article>
        <article>
          <h2 class="text-2xl font-semibold mb-2 text-tokyo-night-orange">The Art of Clean Code</h2>
          <p class="text-sm text-tokyo-night-fg-dark mb-3">Posted on March 10, 2024</p>
          <p class="leading-relaxed text-tokyo-night-fg">
            Writing maintainable code is an art form. Here are some principles I follow to keep my codebase clean and
            scalable...
          </p>
        </article>
      `,
    },
  };

  const content = $derived(() => pageContent[currentPage] || pageContent.about);

  $effect(() => {
    displayText = '';
    let index = 0;
    const text = content().path;
    const interval = setInterval(() => {
      if (index < text.length) {
        displayText = text.slice(0, index + 1);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  });

  function handleClose() {
    if (isMobile) {
      isClosing = true;
      setTimeout(() => {
        goto('/');
      }, 500);
    }
  }
</script>

<div
  class={`w-full h-full flex items-center justify-center ${isMobile ? 'p-0' : 'p-8'} transition-transform duration-500 ${isClosing && isMobile ? 'translate-y-full' : 'translate-y-0'}`}
>
  <div
    class={`w-full ${isMobile ? 'h-full' : 'max-w-4xl h-[80vh]'} bg-tokyo-night-bg ${isMobile ? 'rounded-none' : 'rounded-2xl'} border ${isMobile ? 'border-tokyo-night-gray3' : 'border-tokyo-night-terminal-black'} shadow-[0_4px_12px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col`}
  >
    <div class="bg-tokyo-night-bg-dark px-6 py-4 border-b border-border flex items-center gap-3">
      <div class="flex gap-2">
        {#if isMobile}
          <button
            onclick={handleClose}
            class="w-5 h-5 rounded-full bg-mac-close hover:brightness-110 transition-all cursor-pointer flex items-center justify-center"
            aria-label="Close"
          >
            <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        {:else}
          <button
            onclick={handleClose}
            class="w-3 h-3 rounded-full bg-mac-close hover:brightness-110 transition-all"
            aria-label="Close"
          ></button>
          <div class="w-3 h-3 rounded-full bg-mac-minimize"></div>
          <div class="w-3 h-3 rounded-full bg-mac-maximize"></div>
        {/if}
      </div>
      <div class="flex-1 text-center font-mono text-sm text-tokyo-night-fg">
        <span class="text-primary">➜</span> <span class="text-primary">{displayText}</span>
        <span class="animate-pulse">▊</span>
      </div>
    </div>

    <div class="flex-1 overflow-auto p-8 font-sans animate-in fade-in duration-500">
      <div class="prose prose-invert max-w-none">
        {@html content().content}
      </div>
    </div>
  </div>
</div>