<script lang="ts">
    import { ChevronUp, Github, Linkedin, Twitter, Mail } from "lucide-svelte";

    interface Props {
        isVisible: boolean;
        onUnlock: () => void;
    }

    let { isVisible, onUnlock }: Props = $props();

    let time = $state("");
    let date = $state("");
    let startY = $state(0);
    let currentY = $state(0);
    let isDragging = $state(false);

    $effect(() => {
        const updateTime = () => {
            const now = new Date();
            time = now.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            });
            date = now.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
            });
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

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
    class="absolute inset-0 bg-background transition-transform duration-500"
    class:translate-y-0={isVisible}
    class:-translate-y-full={!isVisible}
    style="transform: {isVisible
        ? `translateY(-${currentY}px)`
        : 'translateY(-100%)'}"
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
            <h1 class="text-7xl font-bold text-foreground tracking-tight">
                {time}
            </h1>
            <p class="text-lg text-muted-foreground">{date}</p>
        </div>

        <!-- Profile Section -->
        <div class="flex flex-col items-center space-y-4 -mt-12">
            <img
                src="/me.jpeg"
                alt="Thales Gelinger"
                class="w-24 h-24 rounded-full border-4 border-primary shadow-lg"
            />

            <div class="text-center space-y-2">
                <p class="text-sm text-muted-foreground max-w-xs text-balance">
                    Lead Software Engineer crafting scalable digital products with React, React Native, Node.js, TypeScript & Elixir. Passionate about development, UX, DX, and performance.
                </p>
            </div>

            <!-- Social Media Links -->
            <div class="flex gap-4 mt-4">
                <a
                    href="https://github.com/thalesgelinger"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center justify-center w-12 h-12 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                    <Github class="w-6 h-6 text-foreground" />
                </a>
                <a
                    href="https://linkedin.com/in/thalesgelinger"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center justify-center w-12 h-12 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                    <Linkedin class="w-6 h-6 text-foreground" />
                </a>
                <a
                    href="https://x.com/thalesgelinger_"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center justify-center w-12 h-12 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                    <Twitter class="w-6 h-6 text-foreground" />
                </a>
                <a
                    href="mailto:thalesgelinger@gmail.com"
                    class="flex items-center justify-center w-12 h-12 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                    <Mail class="w-6 h-6 text-foreground" />
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

