<script>
	import TabDay from './TabDay.svelte';
	import TabWeek from './TabWeek.svelte';
	import TabMonth from './TabMonth.svelte';
	import Tabs from './Tabs.svelte';

	// List of tab items with labels, values and assigned components
	let items = [
		{ label: 'Day', value: 1, component: TabDay },
		{ label: 'Week', value: 2, component: TabWeek },
		{ label: 'Month', value: 3, component: TabMonth }
	];
</script>

<h1>The Stress App</h1>
<Tabs {items} />
