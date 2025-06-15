<!-- LifeProgressGrid.svelte -->
<script lang="ts">
    import { Card, CardHeader, CardTitle, CardContent } from "$lib/components/ui/card/index";
    import { cn } from "$lib/utils";
    
    export let birthday: string;
    export let lifeExpectancy: number;

    // Calculate weeks lived
    $: weeksLived = Math.floor((Date.now() - new Date(birthday).getTime()) / (7 * 24 * 60 * 60 * 1000));
    $: weeksLeft = (lifeExpectancy * 52) - weeksLived;
    $: totalWeeks = lifeExpectancy * 52;

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
    $: weeks = Array.from({ length: totalWeeks }, (_, i) => ({
        index: i,
        classes: getWeekClasses(i)
    }));
</script>

<div class="container mx-auto px-4 py-8 max-w-7xl">
    <Card>
        <CardHeader>
            <CardTitle class="text-center text-lg">
                You have lived for {weeksLived.toLocaleString()} weeks and have {weeksLeft.toLocaleString()} weeks left until you are {lifeExpectancy}.
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div class="overflow-x-auto">
                <div class="grid grid-cols-52 gap-0.5 w-fit mx-auto bg-muted/20 p-4 rounded-lg">
                    {#each weeks as week}
                        <div 
                            class={cn(
                                "w-3 h-3 rounded-sm transition-transform duration-200 hover:scale-125 hover:z-10",
                                week.classes
                            )}
                            title="Week {week.index + 1}"
                        > </div>
                    {/each}
                </div>
            </div>

            <div class="flex flex-wrap justify-center gap-4 mt-8 p-4 bg-muted/20 rounded-lg">
                {#each colorPeriods as period}
                    <div class="flex items-center gap-2 text-sm">
                        <div class={cn("w-4 h-4 rounded-sm", period.color)} > </div>
                        <span>Years {period.start}-{period.end}</span>
                    </div>
                {/each}
            </div>
        </CardContent>
    </Card>
</div>

<style>
    /* Custom grid columns for 52 weeks */
    :global(.grid-cols-52) {
        grid-template-columns: repeat(52, minmax(0, 1fr));
    }

    @media (max-width: 768px) {
        :global(.grid-cols-52) {
            gap: 0.25px;
        }
        
        :global(.grid-cols-52 > *) {
            width: 0.5rem;
            height: 0.5rem;
        }
    }
</style>