<script lang="ts">
	// @ts-nocheck
	import '@carbon/charts-svelte/styles.css';
	import { HistogramChart } from '@carbon/charts-svelte';

	let options = {
		theme: 'g90',
		title: '',
		width: '300px',
		height: '300px',
		toolbar: { enabled: false },
		axes: {
			bottom: {
				title: 'Hour',
				mapsTo: 'group',
				scaleType: 'labels'
			},
			left: {
				title: 'Stress Level',
				mapsTo: 'value',
				binned: true
			}
		}
	};

	let data = [
		{
			group: 'Monday',
			value: 71
		},
		{
			group: 'Tuesday',
			value: 32
		},
		{
			group: 'Wednesday',
			value: 42
		},
		{
			group: 'Thursday',
			value: 56
		},
		{
			group: 'Friday',
			value: 37
		},
		{
			group: 'Saturday',
			value: 7
		},
		{
			group: 'Sunday',
			value: 17
		}
	];
</script>

<HistogramChart {data} {options} />
