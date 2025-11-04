<script lang="ts">
    import type { ComponentType } from "svelte";
    import { cn } from "$lib/utils";
    import { FileText, User } from "lucide-svelte";

    interface Props {
        name: string;
        icon: "file-text";
        color: string;
        delay?: number;
    }

    let { name, icon, color, delay = 0 }: Props = $props();
</script>

<button
    class="flex flex-col items-center gap-2 group"
    style="animation-delay: {delay}ms"
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
        {/if}
    </div>
    <span class="text-xs text-foreground font-medium text-center leading-tight"
        >{name}</span
    >
</button>

