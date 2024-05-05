<script lang="ts">
	import { DonutChart } from '@carbon/charts-svelte';
	import '@carbon/charts-svelte/styles.css';

	export let data;

	let options = {
		theme: 'g90',
		title: '',
		width: '300px',
		height: '300px',
		donut: {
			center: {
				label: 'Stress level'
			},
			alignment: 'center'
		},
		legend: {
			alignment: 'center',
		},
		toolbar: { enabled: false },
		resizable: true,
		pie: {
			valueMapsTo: 'value'
		}
	};
</script>

<DonutChart {data} {options} />
