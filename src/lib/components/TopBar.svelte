<!-- TopBar.svelte -->
<script lang="ts">
    import SunIcon from "@lucide/svelte/icons/sun";
    import MoonIcon from "@lucide/svelte/icons/moon";
    import { toggleMode } from "mode-watcher";
    import { Button } from "$lib/components/ui/button";
    import { onMount } from 'svelte';

    let isIOS = false;

    onMount(() => {
        // Detect iOS devices
        isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    });
</script>

<nav class="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 {isIOS ? 'mt-[env(safe-area-inset-top)]' : ''}">
    <div class="container mx-auto px-4">
        <div class="flex h-16 items-center justify-between">
            <span></span>
            <Button onclick={toggleMode} variant="outline" size="icon">
                <SunIcon
                    class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                />
                <MoonIcon
                    class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                />
                <span class="sr-only">Toggle theme</span>
            </Button>
        </div>
    </div>
</nav> 