<script lang="ts">
	import { onMount } from 'svelte';
	import { DonutChart } from '@carbon/charts-svelte';
	import '@carbon/charts-svelte/styles.css';
	import test_data_day from '$lib/components/test_data_day';

	let data: any;

	$: {
		data = test_data_day;
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

	let options: any = {
		theme: 'g100',
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
			alignment: 'center'
		},
		toolbar: { enabled: false },
		resizable: true,
		pie: {
			valueMapsTo: 'value'
		}
	};
</script>

{#if data}
	<DonutChart {data} {options} />
{/if}
