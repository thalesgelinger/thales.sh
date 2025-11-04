<script lang="ts">
    import { goto } from "$app/navigation";
    import type { Snippet } from "svelte";

    interface Props {
        children: Snippet;
        isMobile?: boolean;
        title: string;
    }

    let { children, title }: Props = $props();

    let isClosing = $state(false);

    let isMobile = $state(false);
    $effect(() => {
        isMobile = window.matchMedia("(max-width: 768px)").matches;
    });

    function handleClose() {
        if (isMobile) {
            isClosing = true;
            setTimeout(() => {
                goto("/");
            }, 500);
        }
    }
</script>

<div
    class={`w-full h-full flex items-center justify-center ${isMobile ? "p-0" : "p-8"} transition-transform duration-500 ${isClosing && isMobile ? "translate-y-full" : "translate-y-0"}`}
>
    <div
        class={`w-full ${isMobile ? "h-full" : "max-w-4xl h-[80vh]"} bg-tokyo-night-bg ${isMobile ? "rounded-none" : "rounded-2xl"} border ${isMobile ? "border-tokyo-night-gray3" : "border-tokyo-night-terminal-black"} shadow-[0_4px_12px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col`}
    >
        <div
            class="bg-tokyo-night-bg-dark px-6 py-4 border-b border-border flex items-center gap-3"
        >
            <div class="flex gap-2">
                {#if isMobile}
                    <button
                        onclick={handleClose}
                        class="w-5 h-5 rounded-full bg-mac-close hover:brightness-110 transition-all cursor-pointer flex items-center justify-center"
                        aria-label="Close"
                    >
                        <svg
                            class="w-3 h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
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
            <div
                class="flex-1 text-center font-mono text-sm text-tokyo-night-fg"
            >
                <span class="text-primary">➜</span>
                <span class="text-primary">{title}</span>
                <span class="animate-pulse">▊</span>
            </div>
        </div>

        <div
            class="flex-1 overflow-auto p-8 font-sans animate-in fade-in duration-500"
        >
            <div class="prose prose-invert max-w-none">
                {@render children()}
            </div>
        </div>
    </div>
</div>

