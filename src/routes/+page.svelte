<script lang="ts">
    import TerminalContent from "$lib/components/TerminalContent.svelte";
    import { isMobile } from "$lib/utils";
    import { phoneStore } from "./phone.svelte";

    $effect(() => {
        if (isMobile()) {
            phoneStore.hasBeenDragged = true;
        }
    });
</script>

{#if phoneStore.hasBeenDragged}
    <div class="md:block fixed inset-0 z-0">
        <TerminalContent title="/">
            <div class="flex gap-9">
                <img
                    src="/me.jpeg"
                    alt="Thales Gelinger"
                    class="h-20 rounded-full"
                />
                <h2>Hey, i’m Thales Gelinger</h2>
            </div>
            <p>
                I build cool stuff, write about it, and repeat, take a look in
                my posts, you may find something interesting, i also do some
                youtube videos sometimes
            </p>
            <iframe
                height="405"
                class="w-full"
                src="https://www.youtube.com/embed/sHI-_jbSuZY"
                title="I'm tired of JS so i started a new mobile framework using lua and rust"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
            ></iframe>

            <div class="flex w-full justify-end">
                <img src="/tails-running.gif" alt="Tails" class="h-20" />
            </div>
        </TerminalContent>
    </div>
{/if}
