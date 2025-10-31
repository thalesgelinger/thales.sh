<script lang="ts">
  import { page } from '$app/stores';
  import TerminalContent from '$lib/components/TerminalContent.svelte';

  let appId = $derived($page.params.appId as string);
</script>

<TerminalContent currentPage={appId} isMobile={true} />