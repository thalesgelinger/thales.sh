<script lang="ts">
    import { goto } from "$app/navigation";
    import { isMobile } from "$lib/utils";
    import { phoneStore, viewOrchestrator } from "../../routes/phone.svelte";
    import AppIcon from "./AppIcon.svelte";
    import { Github, Linkedin, Twitter } from "lucide-svelte";

    interface Props {
        isVisible: boolean;
    }

    let { isVisible }: Props = $props();

    let time = $state("");

    $effect(() => {
        const updateTime = () => {
            time = new Date().toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            });
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    });

    function handleAppClick(appId: string) {
        if (isMobile()) {
            viewOrchestrator.hideDevice = true;
            if (appId === "") {
                return;
            }
        }
        goto(`/${appId}`);
    }
</script>

<div
    class="absolute inset-0 bg-background transition-transform duration-500"
    class:translate-y-0={isVisible}
    class:translate-y-full={!isVisible}
>
    <div class="flex flex-col h-full px-6 py-12">
        <!-- Status Bar -->
        <div class="flex justify-between items-center mb-8 px-2">
            <span class="text-sm font-medium text-foreground">{time}</span>
            <div class="flex items-center gap-2">
                <div class="w-4 h-4 rounded-full bg-chart-3"></div>
                <div class="w-4 h-4 rounded-full bg-primary"></div>
                <div class="text-sm font-medium text-foreground">100%</div>
            </div>
        </div>

        <div
            class="flex-1 grid grid-cols-4 gap-4 content-start justify-items-center"
        >
            {#each phoneStore.apps as app, index}
                <div onclick={() => handleAppClick(app.slug)}>
                    <AppIcon
                        name={app.title}
                        icon={app.icon}
                        color={app.color}
                        delay={index * 50}
                    />
                </div>
            {/each}
        </div>

        <!-- Dock with social links -->
        <div
            class="flex justify-center gap-6 px-4 py-6 bg-card/50 backdrop-blur-xl rounded-3xl border border-border/50 mx-2"
        >
            <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                class="w-14 h-14 rounded-2xl bg-muted-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            >
                <Github class="w-7 h-7 text-primary-foreground" />
            </a>
            <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                class="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            >
                <Linkedin class="w-7 h-7 text-primary-foreground" />
            </a>
            <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                class="w-14 h-14 rounded-2xl bg-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            >
                <Twitter class="w-7 h-7 text-background" />
            </a>
        </div>
    </div>
</div>

