<script lang="ts">
	import ScaleButton from '$lib/components/ScaleButton.svelte';
	import Histogram from '$lib/components/Histogram.svelte';
	import Donut from '$lib/components/Donut.svelte';
	import { Scales } from '$lib/types.ts';
	import type { DonutData } from '$lib/types';

	let scale: Scales = Scales.day;

	function generateRandomData(scale: Scales) {
		if (scale === Scales.day) {
			return Array.from({ length: 24 }, () => Math.floor(Math.random() * 100));
		} else if (scale === Scales.week) {
			return Array.from({ length: 7 }, () => Math.floor(Math.random() * 100));
		} else if (scale === Scales.month) {
			return Array.from({ length: 31 }, () => Math.floor(Math.random() * 100));
		} else {
			return [];
		}
	}

	function convertToDonutData(data: number[], scale: Scales): DonutData[] {
		const donutData: DonutData[] = [];

		if (scale === Scales.day) {
			for (let i = 0; i < data.length; i += 3) {
				const groupValue = data.slice(i, i + 3).reduce((acc, curr) => acc + curr, 0);
				donutData.push({ label: `Hour ${i / 3 + 1}`, value: groupValue });
			}
		} else if (scale === Scales.week) {
			for (let i = 0; i < data.length; i += 3) {
				const groupValue = data.slice(i, i + 3).reduce((acc, curr) => acc + curr, 0);
				donutData.push({ label: `Day ${i / 3 + 1}`, value: groupValue });
			}
		} else if (scale === Scales.month) {
			for (let i = 0; i < data.length; i += 3) {
				const groupValue = data.slice(i, i + 3).reduce((acc, curr) => acc + curr, 0);
				donutData.push({ label: `Day ${i / 3 + 1}`, value: groupValue });
			}
		}

		return donutData;
	}

	$: data = generateRandomData(scale);
	$: histogramData = data;
	$: donutData = convertToDonutData(data, scale);
</script>

<title>Name of product</title>
<body class="bg-neutral-900 h-screen flex flex-col items-center">
    <h1>Today</h1>
	<Histogram data={histogramData} />
	<div class="w-full flex justify-evenly items-center p-8">
		<ScaleButton onClick={() => (scale = Scales.day)} text={'Day'} />
		<ScaleButton onClick={() => (scale = Scales.week)} text={'Week'} />
		<ScaleButton onClick={() => (scale = Scales.month)} text={'Month'} />
	</div>
	<div class="w-full flex justify-center items-center"><Donut data={donutData} /></div>
</body>
