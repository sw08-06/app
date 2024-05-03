<script lang="ts">
	import { onMount } from 'svelte';
	import * as d3 from 'd3';

	export let data: number[] = [];

	onMount(() => {
		const margin = { top: 20, right: 40, bottom: 40, left: 50 };
		const width = document.documentElement.clientWidth - margin.left - margin.right;
		const height = document.documentElement.clientWidth * 0.8 - margin.top - margin.bottom;

		const svg = d3
			.select('#chart')
			.append('svg')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
			.append('g')
			.attr('transform', `translate(${margin.left},${margin.top})`);

		const x = d3
			.scaleBand()
			.domain(d3.range(data.length).map((d) => d.toString()))
			.range([0, width])
			.padding(0.1);

		const y = d3
			.scaleLinear()
			.domain([0, d3.max(data) || 0])
			.nice()
			.range([height, 0]);

		svg.append('g').attr('transform', `translate(0, ${height})`).call(d3.axisBottom(x));

		svg.append('g').call(d3.axisLeft(y));

		svg
			.selectAll('.bar')
			.data(data)
			.enter()
			.append('rect')
			.attr('class', 'bar')
			.attr('x', (d, i) => x(i.toString()) || 0)
			.attr('y', (d) => y(d) || 0)
			.attr('width', x.bandwidth())
			.attr('height', (d) => height - y(d) || 0)
			.attr('fill', 'steelblue');
	});
</script>

<div id="chart"></div>
