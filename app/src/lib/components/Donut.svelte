<script lang="ts">
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	import type { DonutData } from '$lib/types';

	export let data: DonutData[] = [];

	onMount(() => {
		const margin = { top: 20, right: 20, bottom: 20, left: 20 };
		const svgSize =
			Math.min(document.documentElement.clientWidth, document.documentElement.clientHeight) * 0.6;
		const radius = svgSize / 2;

		const color = d3.scaleOrdinal().range(d3.schemeCategory10);

		const arc = d3
			.arc()
			.innerRadius(radius * 0.5) // Adjust inner radius for donut chart
			.outerRadius(radius);

		const pie = d3
			.pie()
			.sort(null)
			.value((d) => d.valueOf());

		const svg = d3
			.select('#chart')
			.append('svg')
			.attr('width', svgSize + margin.left + margin.right)
			.attr('height', svgSize + margin.top + margin.bottom)
			.append('g')
			.attr(
				'transform',
				`translate(${(svgSize + margin.left + margin.right) / 2},${(svgSize + margin.top + margin.bottom) / 2})`
			);

		const arcs = svg.selectAll('.arc').data(pie(data)).enter().append('g').attr('class', 'arc');

		arcs
			.append('path')
			.attr('d', arc)
			.attr('fill', (d, i) => color(i));

		arcs
			.append('text')
			.attr('transform', (d) => `translate(${arc.centroid(d)})`)
			.attr('text-anchor', 'middle')
			.text((d) => d.value.toString()); // Display value as text
	});
</script>

<div id="chart"></div>
