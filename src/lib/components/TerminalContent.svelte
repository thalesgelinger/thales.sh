<script lang="ts">
  import { goto } from '$app/navigation';

  interface Props {
    currentPage: string;
    isMobile?: boolean;
  }

  let { currentPage, isMobile = false }: Props = $props();

  let displayText = $state('');
  let isClosing = $state(false);

  const postModules = import.meta.glob('$lib/posts/*.md', { eager: true });

  const components = {
    about: (postModules['/src/lib/posts/about.md'] as any).default,
    projects: (postModules['/src/lib/posts/projects.md'] as any).default,
    skills: (postModules['/src/lib/posts/skills.md'] as any).default,
    contact: (postModules['/src/lib/posts/contact.md'] as any).default,
    blog: (postModules['/src/lib/posts/blog.md'] as any).default,
  };

  const pageContent: Record<string, { path: string; component: any }> = {
    about: {
      path: '~/portfolio/about',
      component: components.about,
    },
    projects: {
      path: '~/portfolio/projects',
      component: components.projects,
    },
    skills: {
      path: '~/portfolio/skills',
      component: components.skills,
    },
    contact: {
      path: '~/portfolio/contact',
      component: components.contact,
    },
    blog: {
      path: '~/portfolio/blog',
      component: components.blog,
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
         {#if currentPage === 'about'}
           {@const Component = components.about}
           <Component />
         {:else if currentPage === 'projects'}
           {@const Component = components.projects}
           <Component />
         {:else if currentPage === 'skills'}
           {@const Component = components.skills}
           <Component />
         {:else if currentPage === 'contact'}
           {@const Component = components.contact}
           <Component />
         {:else if currentPage === 'blog'}
           {@const Component = components.blog}
           <Component />
         {:else}
           {@const Component = components.about}
           <Component />
         {/if}
       </div>
     </div>
  </div>
</div>