<script lang="ts">
	import ScaleButton from '$lib/components/ScaleButton.svelte';
	import { Scales } from '$lib/types.ts';

	let scale: Scales = Scales.DAY;
</script>

<title>Name of product</title>
<body class="bg-neutral-900 h-screen flex flex-col items-center">
	<div class="w-full flex justify-evenly items-center p-8">
		<ScaleButton onClick={() => (scale = Scales.DAY)} text={'Day'} />
		<ScaleButton onClick={() => (scale = Scales.WEEK)} text={'Week'} />
		<ScaleButton onClick={() => (scale = Scales.MONTH)} text={'Month'} />
	</div>
</body>
