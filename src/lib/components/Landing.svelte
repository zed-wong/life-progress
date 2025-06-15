<script lang="ts">
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';

	function handleStart() {
		goto('/setup');
	}
</script>

<div class="mx-auto flex items-center justify-center h-full p-4">
	<Card class="w-full max-w-2xl">
		<CardHeader class="text-center">
			<CardTitle class="text-4xl font-bold mb-4">Your Life in Weeks</CardTitle>
			<CardDescription class="text-lg">
				Visualize your life journey in a simple, powerful way. See your past, present, and future laid out in weeks, helping you gain perspective and make the most of your time.
			</CardDescription>
		</CardHeader>
		<CardContent class="flex justify-center pt-6">
			<Button size="lg" onclick={handleStart} class="text-lg px-8 py-6">
				Visualize Your Life
			</Button>
		</CardContent>
	</Card>
</div>

<style>
	
</style> 