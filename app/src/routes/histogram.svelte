<script>
	import data from './testData.js';
	import { onMount } from 'svelte';
	import { scaleLinear, scaleTime, extent, interpolateRound } from 'd3';

	const width = 600;
	const height = 250;
	const barWidth = 15;
	const margin = { top: 40, bottom: 30, left: 50, right: 0 };

	let xScale = scaleTime();
	let yScale = scaleLinear();
	let xTicks = [];
	let yTicks = [];

	//const endpoint = "0.0.0.0:5000";

	//onMount(async function () {
	//	const response = await fetch(endpoint);
	//	const data = await response.json();
	//	console.log(data);
	//});

	onMount(() => {
		updateScales(); // Initialize scales
	});
	$: {
		// Reactively update scales when data changes
		updateScales();
	}

	function updateScales() {
		let filteredData = data.filter((d) => d.time !== undefined && d.stress !== undefined);

		let extentX = extent(filteredData, (d) => d.time);

		let extentY = extent(filteredData, (d) => d.stress);

		xScale = scaleTime()
			.domain(extentX)
			.range([margin.left, width - margin.right - 50])
			.nice()
			.interpolate(interpolateRound);

		yScale = scaleLinear()
			.domain(extentY)
			.range([height - margin.bottom, margin.top]);

		data.forEach((d) => {
			xTicks.push(d.time);
		});

		for (var i = 0; i < extentY[1] + 1; i++) {
			yTicks.push(i);
		}
	}
	let xLabel = (x) => x.getHours();
	// d's for axis paths
	let xPath = `M${margin.left},5V0H${width - margin.right -1}V5`;
	let yPath = `M-5,${height-20}H0.5V0.5H-5`;
</script>

<svg {width} {height} viewBox="0 0 {width} {height}" role="figure">
	<g transform="translate(0, -20)">
		<!-- bars -->
		{#each data as d}
			<rect
				x={xScale(d.time)}
				y={yScale(d.stress)}
				width={barWidth}
				height={height - yScale(d.stress)}
				fill="blue"
				rx="5"
				ry="5"
			/>
		{/each}
	</g>

	<g transform="translate({margin.left}, 0)">
		<path stroke="currentColor" d={yPath} fill="none" />

		{#each yTicks as y}
			<g class="tick" opacity="1" transform="translate(0,{yScale(y)-20})">
				<line stroke="currentColor" x2="-5" />
				<text dy="0.32em" fill="currentColor" x="-{margin.left}">
					{y}
				</text>
			</g>
		{/each}
	</g>

	<g transform="translate(0, {height-20})">
		<path stroke="currentColor" d={xPath} fill="none" />

		{#each xTicks as x}
			<g class="tick" opacity="1" transform="translate({xScale(x)+(barWidth/2)},0)">
				<line stroke="currentColor" y2="5" />
				<text fill="currentColor" y="9" dy="0.71em" x="-3">
					{xLabel(x)}
				</text>
			</g>
		{/each}
	</g>
</svg>

<style>
	svg {
		width: 100%;
		height: 100%;
	}
	.tick {
		font-size: 11px;
	}
</style>
