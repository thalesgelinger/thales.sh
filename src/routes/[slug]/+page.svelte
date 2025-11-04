<script lang="ts">
    import TerminalContent from "$lib/components/TerminalContent.svelte";
    import { isMobile } from "$lib/utils.js";
    import { phoneStore, viewOrchestrator } from "../phone.svelte.js";

    let { data } = $props();
    $effect(() => {
        if (isMobile()) {
            phoneStore.isUnlocked = true;
            viewOrchestrator.hideDevice = true;
        }
    });
</script>

<div class="md:block fixed inset-0 z-0">
    <TerminalContent title={`/${data.slug}`}>
        {@render data.content()}
    </TerminalContent>
</div>
