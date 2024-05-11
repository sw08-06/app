<script lang="ts">
	import Heatmap from '$lib/components/Heatmap.svelte';
	import DonutChart from '$lib/components/DonutChart.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';

	let heatmapTooltipText: string = 'something';
	let donutTooltipText: string = 'something';
</script>

<title>Harmony</title>
<body class="bg-neutral-900 h-screen flex flex-col items-center">
	<header class="text-white text-2xl font-bold mt-4 mb-4 shadow-lg">Harmony</header>
	<section class="bg-neutral-800 flex flex-col items-center rounded-lg shadow-lg p-4 mb-4">
		<div class="flex justify-between w-full">
			<h2 class="text-lg text-white mb-4">Monthly Stress</h2>
			<Tooltip headerText={'Heatmap of Monthly Stress'} text={heatmapTooltipText} />
		</div>
		<Heatmap />
	</section>
	<section class="bg-neutral-800 flex flex-col items-center rounded-lg shadow-lg p-4">
		<div class="flex justify-between w-full">
			<h2 class="text-lg text-white mb-4">Daily Stress for [date]</h2>
			<Tooltip headerText={'Donut Chart of Daily Stress'} text={donutTooltipText} />
		</div>
		<DonutChart />
	</section>
</body>
