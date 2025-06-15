<script lang="ts">
	import '../app.css';
	import TopBar from '$lib/components/TopBar.svelte';
</script>

<div class="min-h-screen bg-background">
	<TopBar />
	<main class="container h-[calc(100vh-100px)] mx-auto">
		<slot />
	</main>
</div>

<svelte:head>
	<title>Your Life in Weeks</title>
	<meta name="description" content="Visualize your life journey in weeks - gain perspective and make the most of your time" />
</svelte:head>
