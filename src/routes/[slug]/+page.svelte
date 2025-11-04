<script lang="ts">
    import TerminalContent from "$lib/components/TerminalContent.svelte";

    let { data } = $props();
</script>

<div class="hidden md:block fixed inset-0 z-0">
    <TerminalContent title={`/${data.slug}`}>
        {@render data.content()}
    </TerminalContent>
</div>
