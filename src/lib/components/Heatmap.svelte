<script lang="ts">
	import { HeatmapChart } from '@carbon/charts-svelte';
	import '@carbon/charts-svelte/styles.css';

	export let data: any;

	let options: any = {
		theme: 'g100',
		height: '300px',
		toolbar: { enabled: false },
		axes: {
			bottom: {
				mapsTo: 'day',
				scaleType: 'labels',
				domain: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
			},
			left: {
				mapsTo: 'week',
				scaleType: 'labels'
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
