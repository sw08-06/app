<script lang="ts">
	import { onMount } from 'svelte';
	import { HeatmapChart } from '@carbon/charts-svelte';
	import '@carbon/charts-svelte/styles.css';
	import test_data_month from '$lib/components/test_data_month';

	let data: any;
	let dates: string[];
	dates = formatDate();

	$: {
		data = test_data_month;
	}

	onMount(async () => {
		try {
			const response = await fetch(import.meta.env.VITE_API_URL, { method: 'GET' });
			if (response.ok) {
				const data = await response.json();
				console.log(data);
			} else {
				console.error(await response.text());
			}
		} catch (error) {
			console.error('Error:', error);
		}
	});

	function formatDate() {
		dates = ['Week 18', 'Week 17', 'Week 16', 'Week 15'];
		return dates;
	}

	let options: any = {
		theme: 'g100',
		height: '300px',
		toolbar: { enabled: false },
		axes: {
			bottom: {
				mapsTo: 'day',
				scaleType: 'labels'
			},
			left: {
				mapsTo: 'week',
				scaleType: 'labels',
				domain: [dates[0], dates[1], dates[2], dates[3]]
			}
		},
		heatmap: {
			colorLegend: {
				title: 'Stress level'
			}
		}
	};
</script>

{#if data}
	<HeatmapChart {data} {options} />
{/if}
