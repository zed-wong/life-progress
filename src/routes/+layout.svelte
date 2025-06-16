<script lang="ts">
	import '../app.css';
	import TopBar from '$lib/components/TopBar.svelte';
	import { onMount } from 'svelte';
	import { userDataStore } from '$lib/stores';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { ModeWatcher } from "mode-watcher";

	onMount(() => {
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register('/service-worker.js')
				.then(registration => {
					console.log('ServiceWorker registration successful');
				})
				.catch(err => {
					console.error('ServiceWorker registration failed:', err);
				});
		}

		// Check if running as PWA
		const isPWA = window.matchMedia('(display-mode: standalone)').matches || 
			(window.navigator as any).standalone || 
			document.referrer.includes('android-app://');

		// If in PWA mode and we have user data, redirect to stats
		if (isPWA && $userDataStore && $page.url.pathname === '/') {
			goto('/stats');
		}
	});
</script>

<ModeWatcher />
<div class="min-h-screen bg-background">
	<TopBar />
	<main class="container h-[calc(100vh-100px)] mx-auto">
		<slot />
	</main>
</div>

<svelte:head>
	<title>Your Life in Weeks</title>
	<meta name="description" content="Visualize your life journey in weeks - gain perspective and make the most of your time" />
	
	<!-- Viewport settings to prevent zoom -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
	
	<!-- PWA Meta Tags -->
	<link rel="manifest" href="/manifest.json" />
	<meta name="theme-color" content="#ffffff" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
	<meta name="apple-mobile-web-app-title" content="Life Progress" />
	<link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
	
	<!-- Prevent iOS from adding phone number styling -->
	<meta name="format-detection" content="telephone=no" />
</svelte:head>
