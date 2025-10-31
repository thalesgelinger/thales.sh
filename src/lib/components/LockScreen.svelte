<script lang="ts">
  import { ChevronUp, Github, Linkedin, Twitter } from 'lucide-svelte';

  interface Props {
    isVisible: boolean;
    onUnlock: () => void;
  }

  let { isVisible, onUnlock }: Props = $props();

  let time = $state('');
  let date = $state('');
  let startY = $state(0);
  let currentY = $state(0);
  let isDragging = $state(false);

  $effect(() => {
    const updateTime = () => {
      const now = new Date();
      time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
      date = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  });

  function handleTouchStart(e: TouchEvent) {
    startY = e.touches[0].clientY;
    isDragging = true;
  }

  function handleTouchMove(e: TouchEvent) {
    if (!isDragging) return;
    const deltaY = startY - e.touches[0].clientY;
    if (deltaY > 0) {
      currentY = deltaY;
    }
  }

  function handleTouchEnd() {
    if (currentY > 100) {
      onUnlock();
    }
    currentY = 0;
    isDragging = false;
  }

  function handleMouseDown(e: MouseEvent) {
    startY = e.clientY;
    isDragging = true;
  }

  function handleMouseMove(e: MouseEvent) {
    if (!isDragging) return;
    const deltaY = startY - e.clientY;
    if (deltaY > 0) {
      currentY = deltaY;
    }
  }

  function handleMouseUp() {
    if (currentY > 100) {
      onUnlock();
    }
    currentY = 0;
    isDragging = false;
  }
</script>

<div
  class="absolute inset-0 bg-background transition-transform duration-500"
  class:translate-y-0={isVisible}
  class:-translate-y-full={!isVisible}
  style="transform: {isVisible ? `translateY(-${currentY}px)` : 'translateY(-100%)'}"
  ontouchstart={handleTouchStart}
  ontouchmove={handleTouchMove}
  ontouchend={handleTouchEnd}
  onmousedown={handleMouseDown}
  onmousemove={handleMouseMove}
  onmouseup={handleMouseUp}
  onmouseleave={handleMouseUp}
>
  <div class="flex flex-col items-center justify-between h-full px-8 py-16">
    <!-- Time Display -->
    <div class="text-center space-y-2 mt-8">
      <h1 class="text-7xl font-bold text-foreground tracking-tight">{time}</h1>
      <p class="text-lg text-muted-foreground">{date}</p>
    </div>

    <!-- Profile Section -->
    <div class="flex flex-col items-center space-y-6 -mt-12">
      <div class="w-32 h-32 border-4 border-primary shadow-lg rounded-full bg-primary text-primary-foreground flex items-center justify-center text-4xl">
        JD
      </div>

      <div class="text-center space-y-2">
        <h2 class="text-2xl font-semibold text-foreground">John Developer</h2>
        <p class="text-sm text-muted-foreground max-w-xs text-balance">
          Full-stack developer passionate about creating beautiful and functional web experiences
        </p>
      </div>

      <!-- Social Links -->
      <div class="flex gap-4">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          class="w-12 h-12 rounded-full bg-card border border-primary/30 hover:bg-primary hover:border-primary transition-all flex items-center justify-center"
        >
          <Github class="w-5 h-5" />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          class="w-12 h-12 rounded-full bg-card border border-primary/30 hover:bg-primary hover:border-primary transition-all flex items-center justify-center"
        >
          <Linkedin class="w-5 h-5" />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          class="w-12 h-12 rounded-full bg-card border border-primary/30 hover:bg-primary hover:border-primary transition-all flex items-center justify-center"
        >
          <Twitter class="w-5 h-5" />
        </a>
      </div>
    </div>

    <!-- Slide Up Indicator -->
    <div class="flex flex-col items-center gap-2 mb-8">
      <div class="animate-slide-up-bounce">
        <ChevronUp class="w-8 h-8 text-muted-foreground" />
      </div>
      <p class="text-sm text-muted-foreground">Slide up to unlock</p>
    </div>
  </div>
</div>