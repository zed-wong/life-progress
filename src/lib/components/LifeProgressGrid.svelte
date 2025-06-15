<!-- LifeProgressGrid.svelte -->
<script lang="ts">
    import { Card, CardHeader, CardTitle, CardContent } from "$lib/components/ui/card/index";
    import { Progress } from "$lib/components/ui/progress/index";
    import { userDataStore } from "$lib/stores";
    import { cn } from "$lib/utils";
    
    // Access store value using $derived in Svelte 5
    const userData = $derived($userDataStore);
    
    // Provide default values if userData is null
    const birthday = $derived(userData?.birthday || '1990-01-01');
    const lifeExpectancy = $derived(userData?.lifeExpectancy || 100);

    // Calculate weeks lived using $derived
    const weeksLived = $derived(Math.floor((Date.now() - new Date(birthday).getTime()) / (7 * 24 * 60 * 60 * 1000)));
    const weeksLeft = $derived((lifeExpectancy * 52) - weeksLived);
    const totalWeeks = $derived(lifeExpectancy * 52);
    const lifeProgress = $derived((weeksLived / totalWeeks) * 100);

    // Color scheme for different life periods (using Tailwind colors)
    const colorPeriods = [
        { start: 0, end: 9, color: 'bg-blue-500', pastColor: 'bg-blue-500', futureColor: 'bg-blue-100' },
        { start: 10, end: 19, color: 'bg-emerald-500', pastColor: 'bg-emerald-500', futureColor: 'bg-emerald-100' },
        { start: 20, end: 29, color: 'bg-amber-500', pastColor: 'bg-amber-500', futureColor: 'bg-amber-100' },
        { start: 30, end: 39, color: 'bg-orange-500', pastColor: 'bg-orange-500', futureColor: 'bg-orange-100' },
        { start: 40, end: 49, color: 'bg-rose-500', pastColor: 'bg-rose-500', futureColor: 'bg-rose-100' },
        { start: 50, end: 59, color: 'bg-purple-500', pastColor: 'bg-purple-500', futureColor: 'bg-purple-100' },
        { start: 60, end: 69, color: 'bg-cyan-500', pastColor: 'bg-cyan-500', futureColor: 'bg-cyan-100' },
        { start: 70, end: 79, color: 'bg-pink-500', pastColor: 'bg-pink-500', futureColor: 'bg-pink-100' },
        { start: 80, end: 89, color: 'bg-teal-500', pastColor: 'bg-teal-500', futureColor: 'bg-teal-100' },
        { start: 90, end: 99, color: 'bg-violet-500', pastColor: 'bg-violet-500', futureColor: 'bg-violet-100' },
    ];

    // Function to get color classes for a specific week
    function getWeekClasses(weekIndex: number): string {
        const year = Math.floor(weekIndex / 52);
        const period = colorPeriods.find(p => year >= p.start && year <= p.end);
        
        if (!period) return 'bg-gray-100'; // Default light gray for future weeks
        
        const isPast = weekIndex < weeksLived;
        return isPast ? period.pastColor : period.futureColor;
    }

    // Generate array of weeks for the grid
    const weeks = $derived(Array.from({ length: totalWeeks }, (_, i) => ({
        index: i,
        classes: getWeekClasses(i)
    })));
</script>

<div class="container mx-auto px-4 py-8 max-w-7xl">
    <Card>
        <CardHeader>
            <div class="flex flex-col items-center gap-4">
                <CardTitle class="text-center text-lg flex flex-col items-center gap-2">
                    <span> Life progress: {lifeProgress.toFixed(2)}%</span>
                    <span> {weeksLived.toLocaleString()} weeks spent • {weeksLeft.toLocaleString()} weeks left. </span>
                </CardTitle>
            </div>
        </CardHeader>
        <CardContent>
            <div class="overflow-x-auto">
                <div class="max-h-[calc(100vh-300px)] overflow-y-auto overflow-x-auto">
                    <div class="flex justify-center">
                        <!-- Year labels -->
                        <div class="flex flex-col justify-around p-2 text-xs text-muted-foreground">
                            {#each Array.from({ length: Math.ceil(totalWeeks / 52) }, (_, i) => i) as year}
                                <div class="h-3 flex items-center">
                                    {#if year % 5 === 0}
                                        {year}
                                    {/if}
                                </div>
                            {/each}
                        </div>
                        <!-- Grid -->
                        <div class="grid grid-cols-52 gap-[1px] w-fit bg-muted/20 p-2 rounded-lg">
                            {#each weeks as week}
                                <div 
                                    class={cn(
                                        "w-3 h-3 rounded-sm transition-transform duration-200 hover:scale-125 hover:z-10",
                                        week.classes
                                    )}
                                    title="Week {week.index + 1} (Year {Math.floor(week.index / 52)})"
                                > </div>
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
</div>

<style>
    /* Custom grid columns for 52 weeks */
    :global(.grid-cols-52) {
        grid-template-columns: repeat(52, minmax(0, 1fr));
    }

    @media (max-width: 640px) {
        :global(.grid-cols-52) {
            gap: 0.5px;
        }
    }
</style>