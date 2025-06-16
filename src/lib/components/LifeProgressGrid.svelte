<!-- LifeProgressGrid.svelte -->
<script lang="ts">
    import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "$lib/components/ui/card/index";
    import { userDataStore } from "$lib/stores";
    import { cn } from "$lib/utils";
    import { Button } from "$lib/components/ui/button";
    import { goto } from '$app/navigation';
    import {
        AlertDialog,
        AlertDialogAction,
        AlertDialogCancel,
        AlertDialogContent,
        AlertDialogDescription,
        AlertDialogFooter,
        AlertDialogHeader,
        AlertDialogTitle,
        AlertDialogTrigger
    } from "$lib/components/ui/alert-dialog";
    import { onMount } from 'svelte';

    // Access store value using $derived in Svelte 5
    const userData = $derived($userDataStore);
    
    // Provide default values if userData is null
    const birthday = $derived(userData?.birthday || '1990-01-01');
    const lifeExpectancy = $derived(userData?.lifeExpectancy || 100);

    let showResetDialog = $state(false);

    function handleReset() {
        userDataStore.set(null);
        goto('/setup');
    }

    function handleShowReset() {
        showResetDialog = true;
    }

    function handleHideReset() {
        showResetDialog = false;
    }

    // Calculate weeks lived using $derived
    const weeksLived = $derived(Math.floor((Date.now() - new Date(birthday).getTime()) / (7 * 24 * 60 * 60 * 1000)));
    const weeksLeft = $derived((lifeExpectancy * 52) - weeksLived);
    const totalWeeks = $derived(lifeExpectancy * 52);
    const lifeProgress = $derived((weeksLived / totalWeeks) * 100);

    // Color scheme for different life periods (using Tailwind colors with gradients)
    const colorPeriods = [
        { start: 0, end: 9, color: 'bg-gradient-to-br from-blue-400 to-blue-600', pastColor: 'bg-gradient-to-br from-blue-400 to-blue-600', futureColor: 'bg-blue-50 dark:bg-blue-950/30' },
        { start: 10, end: 19, color: 'bg-gradient-to-br from-emerald-400 to-emerald-600', pastColor: 'bg-gradient-to-br from-emerald-400 to-emerald-600', futureColor: 'bg-emerald-50 dark:bg-emerald-950/30' },
        { start: 20, end: 29, color: 'bg-gradient-to-br from-amber-400 to-amber-600', pastColor: 'bg-gradient-to-br from-amber-400 to-amber-600', futureColor: 'bg-amber-50 dark:bg-amber-950/30' },
        { start: 30, end: 39, color: 'bg-gradient-to-br from-orange-400 to-orange-600', pastColor: 'bg-gradient-to-br from-orange-400 to-orange-600', futureColor: 'bg-orange-50 dark:bg-orange-950/30' },
        { start: 40, end: 49, color: 'bg-gradient-to-br from-rose-400 to-rose-600', pastColor: 'bg-gradient-to-br from-rose-400 to-rose-600', futureColor: 'bg-rose-50 dark:bg-rose-950/30' },
        { start: 50, end: 59, color: 'bg-gradient-to-br from-purple-400 to-purple-600', pastColor: 'bg-gradient-to-br from-purple-400 to-purple-600', futureColor: 'bg-purple-50 dark:bg-purple-950/30' },
        { start: 60, end: 69, color: 'bg-gradient-to-br from-cyan-400 to-cyan-600', pastColor: 'bg-gradient-to-br from-cyan-400 to-cyan-600', futureColor: 'bg-cyan-50 dark:bg-cyan-950/30' },
        { start: 70, end: 79, color: 'bg-gradient-to-br from-pink-400 to-pink-600', pastColor: 'bg-gradient-to-br from-pink-400 to-pink-600', futureColor: 'bg-pink-50 dark:bg-pink-950/30' },
        { start: 80, end: 89, color: 'bg-gradient-to-br from-teal-400 to-teal-600', pastColor: 'bg-gradient-to-br from-teal-400 to-teal-600', futureColor: 'bg-teal-50 dark:bg-teal-950/30' },
        { start: 90, end: 99, color: 'bg-gradient-to-br from-violet-400 to-violet-600', pastColor: 'bg-gradient-to-br from-violet-400 to-violet-600', futureColor: 'bg-violet-50 dark:bg-violet-950/30' },
    ];

    // Function to get color classes for a specific week
    function getWeekClasses(weekIndex: number): string {
        const year = Math.floor(weekIndex / 52);
        const period = colorPeriods.find(p => year >= p.start && year <= p.end);
        
        if (!period) return 'bg-gray-50 dark:bg-gray-900/30'; // Default light gray for future weeks
        
        const isPast = weekIndex < weeksLived;
        return isPast ? period.pastColor : period.futureColor;
    }

    // Generate array of weeks for the grid
    const weeks = $derived(Array.from({ length: totalWeeks }, (_, i) => ({
        index: i,
        classes: getWeekClasses(i)
    })));

    onMount(() => {
        // Ensure viewport meta tag exists with proper settings
        let viewportMeta = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
        if (!viewportMeta) {
            viewportMeta = document.createElement('meta') as HTMLMetaElement;
            viewportMeta.name = 'viewport';
            document.head.appendChild(viewportMeta);
        }
        viewportMeta.content = 'width=device-width, initial-scale=1, viewport-fit=cover';
    });
</script>

<div class="min-h-screen bg-gradient-to-b from-background to-background/95 py-4 sm:py-12 pt-[env(safe-area-inset-top)] px-[env(safe-area-inset-left)] pb-[env(safe-area-inset-bottom)]">
    <div class="container mx-auto px-2 sm:px-4">
        <Card class="backdrop-blur-sm bg-background/80 border-muted/20 shadow-xl">
            <CardHeader class="space-y-4 pb-4 sm:pb-8 pt-2 sm:pt-4">
                <div class="flex flex-col items-center gap-4 sm:gap-6">
                    <CardTitle class="text-center text-xl sm:text-2xl font-bold flex flex-col items-center gap-2 sm:gap-3">
                        <span class="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                            {lifeProgress.toFixed(1)}%
                        </span>
                        <div class="flex flex-col items-center gap-1 text-muted-foreground">
                            <span class="text-base sm:text-lg">{weeksLived.toLocaleString()} weeks lived</span>
                            <span class="text-xs sm:text-sm">{weeksLeft.toLocaleString()} weeks remaining</span>
                        </div>
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent class="p-2 sm:p-6">
                <div class="flex flex-col gap-4">
                    <div class="flex flex-col gap-2">
                        <div class="flex items-center justify-between">
                            <h3 class="text-sm sm:text-base font-medium">Your Life in Weeks</h3>
                            <div class="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                                <div class="flex items-center gap-1">
                                    <div class="w-2 h-2 rounded-sm bg-primary"></div>
                                    <span>Lived</span>
                                </div>
                                <div class="flex items-center gap-1">
                                    <div class="w-2 h-2 rounded-sm bg-muted"></div>
                                    <span>Remaining</span>
                                </div>
                            </div>
                        </div>
                        <div class="relative overflow-x-auto -mx-2 sm:mx-0">
                            <div class="flex gap-2 min-w-max px-2 sm:px-0">
                                <!-- Year labels -->
                                <div class="flex flex-col justify-around pr-2 sm:pr-4 text-[10px] sm:text-xs text-muted-foreground font-medium">
                                    {#each Array.from({ length: Math.ceil(totalWeeks / 52) }, (_, i) => i) as year}
                                        <div class="h-2 sm:h-3 flex items-center">
                                            {#if year % 5 === 0}
                                                <span class="bg-background/80 px-1 sm:px-2 py-0.5 rounded-full">{year}</span>
                                            {/if}
                                        </div>
                                    {/each}
                                </div>
                                <!-- Grid -->
                                <div class="grid grid-cols-52 gap-[1px] sm:gap-[2px] w-fit bg-muted/10 p-2 sm:p-4 rounded-xl shadow-inner">
                                    {#each weeks as week}
                                        <div 
                                            class={cn(
                                                "w-2 h-2 sm:w-3 sm:h-3 rounded-sm sm:rounded-md transition-all duration-300 hover:scale-150 hover:shadow-lg hover:z-10",
                                                week.classes
                                            )}
                                            title="Week {week.index + 1} (Year {Math.floor(week.index / 52)})"
                                        > </div>
                                    {/each}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter class="flex justify-end border-t pt-4 sm:pt-6 px-4 sm:px-6">
                <AlertDialog>
                    <AlertDialogTrigger>
                        <Button 
                            variant="outline" 
                            class="text-muted-foreground hover:text-destructive text-sm sm:text-base"
                        >
                            Reset Data
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent class="w-[95vw] max-w-md mx-2 sm:mx-auto">
                        <AlertDialogHeader>
                            <AlertDialogTitle class="text-lg sm:text-xl">Reset Your Data?</AlertDialogTitle>
                            <AlertDialogDescription class="text-sm sm:text-base">
                                This will clear your current life journey data and take you back to the setup page. This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter class="gap-2 sm:gap-3">
                            <AlertDialogCancel class="text-sm sm:text-base">Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                                class="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-sm sm:text-base"
                                onclick={handleReset}
                            >
                                Reset
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardFooter>
        </Card>
    </div>
</div>

<style>
    /* Custom grid columns for 52 weeks */
    :global(.grid-cols-52) {
        grid-template-columns: repeat(52, minmax(0, 1fr));
    }

    /* Improve touch targets on mobile */
    @media (max-width: 640px) {
        :global(.grid-cols-52 > div) {
            min-width: 8px;
            min-height: 8px;
        }
    }

    /* Ensure proper viewport height on mobile */
    :global(html) {
        height: -webkit-fill-available;
    }

    :global(body) {
        min-height: -webkit-fill-available;
    }
</style>