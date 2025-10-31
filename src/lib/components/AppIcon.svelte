<script lang="ts">
  import type { ComponentType } from 'svelte';
  import { cn } from '$lib/utils';

  interface Props {
    name: string;
    icon: ComponentType;
    color: string;
    delay?: number;
  }

  let { name, icon: Icon, color, delay = 0 }: Props = $props();
</script>

<button class="flex flex-col items-center gap-2 group" style="animation-delay: {delay}ms">
  <div
    class={cn(
      'w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 group-active:scale-95',
      color,
    )}
  >
    <Icon class="w-8 h-8 text-primary-foreground" />
  </div>
  <span class="text-xs text-foreground font-medium text-center leading-tight">{name}</span>
</button>