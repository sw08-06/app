<script lang="ts">
	import { HeatmapChart } from '@carbon/charts-svelte';
	import '@carbon/charts-svelte/styles.css';
	import type { HeatmapData } from '$lib/types';
	import { donutChartStore, donutChartDateStore } from '$lib/stores';

	export let data: any[];
	let heatmapData: HeatmapData[];

	$: {
		heatmapData = convertToHeatmapData(data);
		updateDonutChartData(data, data.at(-1).day, data.at(-1).week, data.at(-1).value);
	}

	document.addEventListener('click', function (event: MouseEvent) {
		const clickedElement = event.target as HTMLElement;

		if (
			!clickedElement ||
			!(clickedElement as any).__data__ ||
			typeof (clickedElement as any).__data__ !== 'object' ||
			!('day' in (clickedElement as any).__data__) ||
			!('week' in (clickedElement as any).__data__) ||
			!('index' in (clickedElement as any).__data__)
		) {
			return;
		}

		const data = (clickedElement as any).__data__;

		const day: string | null = data.day;
		const week: string | null = data.week;
		const index: number | null = data.index;
		if (day !== null && week !== null && index !== null) {
			updateDonutChartData(data, day, week, index);
		}
	});

	function updateDonutChartData(data: any[], day: string, week: string, index: number) {
		if (index == -1) {
			const emptyData: { group: string; value: number }[] = [
				{
					group: 'No data',
					value: 0
				}
			];
			donutChartStore.set(emptyData);
		} else {
			const stressDistribution = data.find(
				(obj) => obj.day === day && obj.week === week
			).distribution;
			donutChartStore.set(stressDistribution);
		}

		let monthStr = week.split(' - ')[0].split('/')[0];
		let dayNumber: number = parseInt(week.split('/')[1], 10);

		const dayIndex = [
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
			'Sunday'
		].indexOf(day);

		const date: string = monthStr + '/' + (dayNumber + dayIndex).toString().padStart(2, '0');

		donutChartDateStore.set(date);
	}

	function convertToHeatmapData(data: any) {
		const modifiedData = data.map((obj: HeatmapData) => ({
			day: obj.day,
			week: obj.week,
			value: obj.value
		}));
		return modifiedData;
	}

	function extractWeekLabels(data: any) {
		let weekLabels: string[] = [];

		for (let i = 0; i < data.length; i++) {
			const weekLabel = data[i].week;
			if (!weekLabels.includes(weekLabel)) {
				weekLabels.push(weekLabel);
			}
		}
		weekLabels.reverse();
		return weekLabels;
	}

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
				scaleType: 'labels',
				domain: extractWeekLabels(data)
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
