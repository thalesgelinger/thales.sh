<script lang="ts">
    import { cn } from "$lib/utils";
    import { FileText, Home, User } from "lucide-svelte";
    import { onMount } from "svelte";

    interface Props {
        name: string;
        icon: "file-text";
        color: string;
        delay?: number;
    }

    let { name, icon, color, delay = 0 }: Props = $props();

    let showBanner = $state(false);
    let touchTimer: ReturnType<typeof setTimeout> | undefined;

    function handleTouchStart() {
        touchTimer = setTimeout(() => {
            showBanner = true;
        }, 500);
    }

    function handleTouchEnd() {
        if (touchTimer) {
            clearTimeout(touchTimer);
            touchTimer = undefined;
        }
        showBanner = false;
    }

    onMount(() => {
        return () => {
            if (touchTimer) clearTimeout(touchTimer);
        };
    });
</script>

<button
    class="flex flex-col items-center gap-2 group"
    style="animation-delay: {delay}ms"
    title="{name}"
    ontouchstart={handleTouchStart}
    ontouchend={handleTouchEnd}
>
    <div
        class={cn(
            "w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 group-active:scale-95",
            color,
        )}
    >
        {#if icon === "file-text"}
            <FileText class="w-8 h-8 text-primary-foreground" />
        {:else if icon === "user"}
            <User class="w-8 h-8 text-primary-foreground" />
        {:else if icon === "home"}
            <Home class="w-8 h-8 text-primary-foreground" />
        {/if}
    </div>
    <span
        class="text-xs text-foreground font-medium text-center leading-tight truncate max-w-15"
        >{name}</span
    >
</button>

{#if showBanner}
    <div class="fixed top-0 left-0 right-0 bg-background text-foreground p-2 text-center border-b transition-transform duration-300 {showBanner ? 'translate-y-0' : '-translate-y-full'} z-50">
        {name}
    </div>
{/if}
