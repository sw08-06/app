<script lang="ts">
	import Heatmap from '$lib/components/Heatmap.svelte';
	import DonutChart from '$lib/components/DonutChart.svelte';
	import test_data_month from '$lib/components/test_data_month';
	import test_data_day from '$lib/components/test_data_day';

	let heatmap_data: any;
	let donut_data: any;

	$: {
		heatmap_data = test_data_month;
		donut_data = test_data_day;
	}
</script>

<title>Product Name</title>
<body class="bg-neutral-900 h-screen flex flex-col items-center">
	<header class="text-white text-2xl font-bold mt-4 mb-4 shadow-lg">Product Name</header>
	<section class="bg-neutral-800 flex flex-col items-center rounded-lg shadow-lg p-4 mb-4">
		<h2 class="text-lg text-white mb-4">Monthly Stress</h2>
		<Heatmap data={heatmap_data} />
	</section>
	<section class="bg-neutral-800 flex flex-col items-center rounded-lg shadow-lg p-4">
		<h2 class="text-lg text-white mb-4">Daily Stress for [date]</h2>
		<DonutChart data={donut_data} />
	</section>
</body>
