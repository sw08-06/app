<script lang="ts">
	import { onMount } from 'svelte';
	import Heatmap from '$lib/components/Heatmap.svelte';
	import DonutChart from '$lib/components/DonutChart.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';

	let data: any;

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

	function donutBins(data: any, chosenDate: string) {
		const bins: { group: string; value: number }[] = [
			{ group: '00 - 03', value: 0 },
			{ group: '03 - 06', value: 0 },
			{ group: '06 - 09', value: 0 },
			{ group: '09 - 12', value: 0 },
			{ group: '12 - 15', value: 0 },
			{ group: '15 - 18', value: 0 },
			{ group: '18 - 21', value: 0 },
			{ group: '21 - 24', value: 0 }
		];

		const currentDate = new Date(chosenDate);
		const chosenDay = currentDate.getDay();

		for (let i = 0; i < data.length; i++) {
			const currentDateTime = new Date(data[i]._time);
			if (currentDateTime.getDay() === chosenDay) {
				const hour = currentDateTime.getHours();
				if (hour >= 0 && hour < 3) {
					bins[0].value += data[i]._value;
				} else if (hour >= 3 && hour < 6) {
					bins[1].value += data[i]._value;
				} else if (hour >= 6 && hour < 9) {
					bins[2].value += data[i]._value;
				} else if (hour >= 9 && hour < 12) {
					bins[3].value += data[i]._value;
				} else if (hour >= 12 && hour < 15) {
					bins[4].value += data[i]._value;
				} else if (hour >= 15 && hour < 18) {
					bins[5].value += data[i]._value;
				} else if (hour >= 18 && hour < 21) {
					bins[6].value += data[i]._value;
				} else if (hour >= 21 && hour <= 23) {
					bins[7].value += data[i]._value;
				}
			}
		}
		console.log(bins);
		return bins;
	}

	function heatmapBins(data: any) {
		let bins: { day: string; week: string; value: number }[] = [];
		let bin: { day: string; week: string; value: number } | undefined = undefined;
		let date: string = '';

		for (let i = 0; i < data.length; i++) {
			const currentDate: string = data[i]._time.split('T')[0];
			const currentDay: string = new Date(currentDate).toLocaleDateString('en', {
				weekday: 'long'
			});
			const currentWeekStart: string = getWeekStartDate(currentDate);
			const currentWeekEnd: string = getWeekEndDate(currentDate);

			if (currentDate !== date) {
				bin = {
					day: currentDay,
					week: `${currentWeekStart} - ${currentWeekEnd}`,
					value: data[i]._value
				};
				bins.push(bin);
			} else {
				if (bin) {
					bin.value += data[i]._value;
				}
			}
			date = currentDate;
		}
		console.log(bins);
		return bins;
	}

	function getWeekStartDate(date: string): string {
		const d = new Date(date);
		const day = d.getDay();
		const diff = d.getDate() - day;
		const weekStart = new Date(d.setDate(diff));
		const month = weekStart.getMonth() + 1;
		const dayOfMonth = weekStart.getDate();
		return `${month < 10 ? '0' : ''}${month}/${dayOfMonth < 10 ? '0' : ''}${dayOfMonth}`;
	}

	function getWeekEndDate(date: string): string {
		const d = new Date(date);
		const day = d.getDay();
		const diff = d.getDate() + (6 - day);
		const weekEnd = new Date(d.setDate(diff));
		const month = weekEnd.getMonth() + 1;
		const dayOfMonth = weekEnd.getDate();
		return `${month < 10 ? '0' : ''}${month}/${dayOfMonth < 10 ? '0' : ''}${dayOfMonth}`;
	}

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
			<Heatmap data={heatmapBins(data)} />
		{/if}
	</section>
	<section
		class="bg-neutral-800 flex flex-col items-center rounded-lg shadow-lg p-4 border border-slate-900"
	>
		<div class="flex justify-between w-full">
			<h2 class="text-lg text-neutral-300 mb-4">Daily Stress Distribution of [date]</h2>
			<Tooltip headerText={'Donut Chart of Daily Stress'} text={donutTooltipText} />
		</div>
		{#if data}
			<DonutChart data={donutBins(data, data[2000]._time.split('T')[0])} />
		{/if}
	</section>
</body>
