<script lang="ts">
	import LifeProgressGrid from '$lib/components/LifeProgressGrid.svelte';
	const userData = JSON.parse(localStorage.getItem('user-data') || '{}');
</script>

<LifeProgressGrid birthday={userData.birthday} lifeExpectancy={userData.lifeExpectancy} />