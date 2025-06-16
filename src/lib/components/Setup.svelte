<script lang="ts">
	import { cn } from '$lib/utils';
	import { goto } from '$app/navigation';
	import { userDataStore } from '$lib/stores';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Calendar } from '$lib/components/ui/calendar';
	import * as Popover from '$lib/components/ui/popover';
	import CalendarIcon from '@lucide/svelte/icons/calendar';
	import { buttonVariants } from '$lib/components/ui/button';
	import { DateFormatter, type DateValue, getLocalTimeZone, CalendarDate, today } from '@internationalized/date';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';

	const userLocale = typeof navigator !== 'undefined' ? navigator.language || 'en-US' : 'en-US';
	const df = new DateFormatter(userLocale, {
		dateStyle: 'long'
	});

	const now = today(getLocalTimeZone());
	let birthday: DateValue = new CalendarDate(now.year - 30, now.month, now.day);
	let lifeExpectancy = 100;
	let contentRef: HTMLElement | null = null;
	let popoverOpen = false;

	function handleSubmit() {
		if (!birthday) return;
		
		const userData = {
			birthday: birthday.toDate(getLocalTimeZone()).toString(),
			lifeExpectancy,
			locale: userLocale,
		};

		userDataStore.set(userData);
		goto('/stats');
	}

	function handleDateSelect(date: DateValue) {
		birthday = date;
		popoverOpen = false;
	}
</script>

<div class="min-h-screen bg-gradient-to-b from-background to-background/95 py-12">
	<div class="container mx-auto px-4 max-w-md">
		<Card class="backdrop-blur-sm bg-background/80 border-muted/20 shadow-xl">
			<CardHeader class="space-y-4 pb-8">
				<CardTitle class="text-3xl font-bold text-center bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
					Your Life Journey
				</CardTitle>
				<CardDescription class="text-center text-base">
					Visualize your life in weeks and gain a new perspective on time
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form on:submit|preventDefault={handleSubmit} class="space-y-8">
					<div class="space-y-4">
						<Label for="birthday" class="text-base">Your Birthday</Label>
						<Popover.Root bind:open={popoverOpen}>
							<Popover.Trigger
								id="birthday"
								class={cn(
									buttonVariants({
										variant: 'outline',
										class: 'w-full h-12 justify-start text-left font-normal text-base hover:bg-muted/50 transition-colors'
									}),
									!birthday && 'text-muted-foreground'
								)}
							>
								<CalendarIcon class="mr-3 h-5 w-5" />
								{birthday ? df.format(birthday.toDate(getLocalTimeZone())) : 'Pick your birth date'}
							</Popover.Trigger>
							<Popover.Content bind:ref={contentRef} class="w-auto p-0" align="center">
								<Calendar 
									captionLayout="dropdown" 
									type="single" 
									bind:value={birthday}
									ref={contentRef}
									locale={userLocale}
									class="rounded-lg border shadow-lg"
								/>
							</Popover.Content>
						</Popover.Root>
					</div>

					<div class="space-y-4">
						<Label for="lifeExpectancy" class="text-base">Life Expectancy (years)</Label>
						<Input
							type="number"
							id="lifeExpectancy"
							bind:value={lifeExpectancy}
							min="1"
							max="120"
							required
							class="h-12 text-base"
							placeholder="Enter your expected lifespan"
						/>
						<p class="text-sm text-muted-foreground">
							The average life expectancy is around 80 years, but you can adjust this based on your health and lifestyle.
						</p>
					</div>

					<Button 
						type="submit" 
						class="w-full h-12 text-base font-medium bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300" 
						size="lg" 
						disabled={!birthday}
					>
						Start My Journey
					</Button>
				</form>
			</CardContent>
		</Card>
	</div>
</div>