<script lang="ts">
	import { DonutChart } from '@carbon/charts-svelte';
	import '@carbon/charts-svelte/styles.css';
	import { donutChartStore } from '$lib/stores';
	import type { DonutChartData } from '$lib/types';

	let data: DonutChartData[];
	$: data = $donutChartStore;

	let options: any = {
		theme: 'g100',
		width: '300px',
		height: '300px',
		donut: {
			center: {
				label: 'Stress level'
			},
			alignment: 'center'
		},
		legend: {
			alignment: 'center'
		},
		toolbar: { enabled: false },
		resizable: true,
		pie: {
			valueMapsTo: 'value'
		}
	};
</script>

<DonutChart {data} {options} />
