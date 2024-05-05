<script lang="ts">
	// @ts-nocheck
	import { HeatmapChart } from '@carbon/charts-svelte';
	import '@carbon/charts-svelte/styles.css';

	export let data;

	let options = {
		theme: 'g90',
		height: '300px',
		toolbar: { enabled: false },
		axes: {
			bottom: {
				mapsTo: 'day',
				scaleType: 'labels'
			},
			left: {
				mapsTo: 'week',
				scaleType: 'labels'
			}
		},
		heatmap: {
			colorLegend: {
				title: 'Stress level',
				type: 'quantize'
			}
		}
	};
</script>

<HeatmapChart {data} {options} />
