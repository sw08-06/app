<script lang="ts">
	import { onMount } from 'svelte';
	import Heatmap from '$lib/components/Heatmap.svelte';
	import DonutChart from '$lib/components/DonutChart.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import { donutChartDateStore } from '$lib/stores';

	let data: any[];

	onMount(async () => {
		try {
			const response = await fetch(`${import.meta.env.VITE_API_URL}/api/predictions`, {
				method: 'GET'
			});
			if (response.ok) {
				data = await response.json();
			} else {
				console.error(await response.text());
			}
		} catch (error) {
			console.error('Error:', error);
		}
	});

	let heatmapTooltipText: string = `The heatmap diagram displays your stress levels over the past four weeks. 
									  Each cell represents a day, with color intensity indicating the level of stress experienced. 
									  Darker shades signify higher stress levels, while lighter shades represent lower stress. 
									  Use this visualization to identify patterns and trends in your stress levels over time, 
									  helping you understand your stressors and manage them effectively.`;

	let donutTooltipText: string = `The donut chart displays stress data for a single day, 
									segmented into eight groups representing three-hour intervals. 
									Each segment represents a specific time period within the day, 
									ranging from 0-3 hours to 21-24 hours. 
									The size of each segment corresponds to the level of stress experienced during that time interval. 
									Use this visualization to gain insight into how your stress fluctuates throughout the day, 
									helping you identify peak stress periods and potential triggers.`;

	let stressLevelText: string = `Harmony provides insights into stress levels, measured by the frequency of stress detections from smartwatch data. 
								   Through visualizations like heatmaps and donut charts, users gain a deeper understanding of their stress patterns, 
								   facilitating informed decisions for a balanced lifestyle.`;
</script>

<title>Harmony</title>
<body class="bg-neutral-900 h-screen flex flex-col items-center">
	<div class="flex justify-between items-center w-full">
		<div class="w-10"></div>
		<header class="text-neutral-300 text-2xl font-bold mt-3 mb-3 shadow-lg">Harmony</header>
		<div class="w-10 flex justify-end">
			<Tooltip headerText={'Harmony'} text={stressLevelText} />
		</div>
	</div>
	<section
		class="bg-neutral-800 flex flex-col items-center rounded-lg shadow-lg p-4 mb-2 border border-slate-900"
	>
		<div class="flex justify-between w-full">
			<h2 class="text-lg text-neutral-300 mb-4">Four-Week Stress Heatmap</h2>
			<Tooltip headerText={'Heatmap of Monthly Stress'} text={heatmapTooltipText} />
		</div>
		{#if data}
			<Heatmap {data} />
		{/if}
	</section>
	<section
		class="bg-neutral-800 flex flex-col items-center rounded-lg shadow-lg p-4 border border-slate-900"
	>
		<div class="flex justify-between w-full">
			<h2 class="text-lg text-neutral-300 mb-4">
				Daily Stress Distribution of {$donutChartDateStore}
			</h2>
			<Tooltip headerText={'Donut Chart of Daily Stress'} text={donutTooltipText} />
		</div>
		{#if data}
			<DonutChart />
		{/if}
	</section>
</body>
