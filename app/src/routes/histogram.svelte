<script>
	import data from './testData.js';
	import { onMount } from 'svelte';
	import { scaleLinear, scaleTime, extent } from 'd3';

	const width = 600;
	const height = 350;
	const margin = { top: 40, bottom: 30, left: 50, right: 0 };

	let xScale = scaleTime();
	let yScale = scaleLinear();
	let xTicks = [];
	let yTicks = [];

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
			.range([margin.left, width - margin.right]);

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
	let xLabel = (x) => x.getHours().toString();
	// d's for axis paths
	let xPath = `M${margin.left + 0.5},6V0H${width - margin.right + 1}V6`;
	let yPath = `M-6,${height + 0.5}H0.5V0.5H-6`;
</script>

<svg {width} {height} viewBox="0 0 {width} {height}" role="figure">
	<g>
		<!-- bars -->
		{#each data as d}
			<rect
				x={xScale(d.time)}
				y={yScale(d.stress)}
				width="10"
				height={height - yScale(d.stress)}
				fill="blue"
			/>
		{/each}
	</g>

	<g transform="translate({margin.left}, 0)">
		<path stroke="currentColor" d={yPath} fill="none" />

		{#each yTicks as y}
			<g class="tick" opacity="1" transform="translate(0,{yScale(y)})">
				<line stroke="currentColor" x2="-5" />
				<text dy="0.32em" fill="currentColor" x="-{margin.left}">
					{y}
				</text>
			</g>
		{/each}
	</g>

	<g transform="translate(0, {height})">
		<path stroke="currentColor" d={xPath} fill="none" />

		{#each xTicks as x}
			<g class="tick" opacity="1" transform="translate({xScale(x)},0)">
				<line stroke="currentColor" y2="6" />
				<text fill="currentColor" y="9" dy="0.71em" x="-{margin.left}">
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
