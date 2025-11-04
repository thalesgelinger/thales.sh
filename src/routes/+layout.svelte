<script lang="ts">
    import "../app.css";
    import favicon from "$lib/assets/favicon.svg";
    import LockScreen from "$lib/components/LockScreen.svelte";
    import HomeScreen from "$lib/components/HomeScreen.svelte";
    import { phoneStore, viewOrchestrator } from "./phone.svelte";
    import { onMount } from "svelte";

    let { children, data } = $props();
    let isDragging = $state(false);
    let position = $state({ x: 0, y: 0 });
    let deviceRef: HTMLDivElement;

    let dragStartPos = $state({ x: 0, y: 0, deviceX: 0, deviceY: 0 });

    function handleMouseDown(e: MouseEvent) {
        if (typeof window !== "undefined" && window.innerWidth < 768) return; // Only on desktop
        isDragging = true;
        dragStartPos = {
            x: e.clientX,
            y: e.clientY,
            deviceX: position.x,
            deviceY: position.y,
        };
    }

    onMount(() => {
        data.posts.forEach((post) => {
            phoneStore.apps.push(post);
        });
    });

    $effect(() => {
        if (!isDragging) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;
            const deltaX = e.clientX - dragStartPos.x;
            const deltaY = e.clientY - dragStartPos.y;
            position = {
                x: dragStartPos.deviceX + deltaX,
                y: dragStartPos.deviceY + deltaY,
            };
            if (
                (Math.abs(deltaX) > 20 || Math.abs(deltaY) > 20) &&
                !phoneStore.hasBeenDragged
            ) {
                phoneStore.hasBeenDragged = true;
                phoneStore.isUnlocked = true;
            }
        };

        const handleMouseUp = () => {
            isDragging = false;
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    });
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<main
    class="min-h-screen flex items-center justify-center bg-background md:p-4 overflow-hidden"
>
    {@render children()}
    {#if !phoneStore.hasBeenDragged}
        <div
            class="hidden md:block fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-card/90 backdrop-blur-xl px-6 py-3 rounded-full border border-border shadow-lg animate-bounce"
        >
            <p class="text-sm font-medium text-foreground">
                Drag the device to unlock
            </p>
        </div>
    {/if}
    {#if !viewOrchestrator.hideDevice}
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div
            bind:this={deviceRef}
            class="relative w-full h-screen md:h-auto md:max-w-[400px] md:aspect-[9/19.5] bg-card md:rounded-[3rem] md:shadow-2xl overflow-hidden md:border-8 md:border-tokyo-night-gray3 z-10"
            style="transform: translate({position.x}px, {position.y}px); cursor: {isDragging
                ? 'grabbing'
                : typeof window !== 'undefined' && window.innerWidth >= 768
                  ? 'grab'
                  : 'default'}; transition: {isDragging
                ? 'none'
                : 'transform 0.2s ease-out'};"
            onmousedown={handleMouseDown}
        >
            <!-- Notch -->
            <div
                class="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-background rounded-b-3xl z-50"
            ></div>

            <!-- Screen Content -->
            <div class="relative w-full h-full overflow-hidden">
                <LockScreen
                    isVisible={!phoneStore.isUnlocked}
                    onUnlock={() => (phoneStore.isUnlocked = true)}
                />
                <HomeScreen isVisible={phoneStore.isUnlocked} />
            </div>
        </div>
    {/if}
</main>
