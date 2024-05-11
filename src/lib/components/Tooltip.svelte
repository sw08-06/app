<script lang="ts">
	import Modal from './Modal.svelte';

	let showModal = false;

	export let headerText: string = '';
	export let text: string = '';
</script>

<button
	on:click={() => (showModal = true)}
	class="flex justify-center items-center bg-neutral-700 text-neutral-300 rounded-xl border border-slate-900 w-6 h-6"
	>?</button
>
<Modal bind:showModal>
	<h1 class="text-neutral-300 text-lg" slot="header">{headerText}</h1>
	<p class="text-neutral-300">{text}</p>
</Modal>
