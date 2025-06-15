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
	let birthday: DateValue = new CalendarDate(now.year - 30, 1, 1);
	let lifeExpectancy = 100;
	let contentRef: HTMLElement | null = null;

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
</script>

<div class="mx-auto flex items-center justify-center h-full p-4">
	<Card class="w-full max-w-md">
		<CardHeader>
			<CardTitle class="text-2xl font-bold text-center">Let's Get Started</CardTitle>
			<CardDescription class="text-center">
				Enter your details to begin visualizing your life journey
			</CardDescription>
		</CardHeader>
		<CardContent>
			<form on:submit|preventDefault={handleSubmit} class="space-y-6">
				<div class="space-y-2">
					<Label for="birthday">Your Birthday</Label>
					<Popover.Root>
						<Popover.Trigger
							id="birthday"
							class={cn(
								buttonVariants({
									variant: 'outline',
									class: 'w-full justify-start text-left font-normal'
								}),
								!birthday && 'text-muted-foreground'
							)}
						>
							<CalendarIcon class="mr-2 h-4 w-4" />
							{birthday ? df.format(birthday.toDate(getLocalTimeZone())) : 'Pick a date'}
						</Popover.Trigger>
						<Popover.Content bind:ref={contentRef} class="w-auto p-0">
							<Calendar captionLayout="dropdown" type="single" bind:value={birthday} />
						</Popover.Content>
					</Popover.Root>
				</div>

				<div class="space-y-2">
					<Label for="lifeExpectancy">Life Expectancy (years)</Label>
					<Input
						type="number"
						id="lifeExpectancy"
						bind:value={lifeExpectancy}
						min="1"
						max="120"
						required
						class="w-full"
					/>
				</div>

				<Button type="submit" class="w-full" size="lg" disabled={!birthday}>
					Start My Journey
				</Button>
			</form>
		</CardContent>
	</Card>
</div>