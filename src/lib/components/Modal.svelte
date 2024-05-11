<script lang="ts">
	export let showModal: Boolean;

	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	class="bg-neutral-800 max-w-[350px] border border-slate-900 rounded-lg w-full"
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="p-2 text-neutral-300 w-full" on:click|stopPropagation>
		<div class="flex justify-between w-full">
			<slot name="header" />
			<!-- svelte-ignore a11y-autofocus -->
			<button
				class="flex justify-center items-center text-slate-900 rounded-xl w-6 h-6"
				autofocus
				on:click={() => dialog.close()}>X</button
			>
		</div>
        <hr class="border-slate-900">
		<slot />
	</div>
</dialog>

<style>
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
