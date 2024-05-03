<script lang="ts">
	export let onClick: () => void;
	export let text: string = 'text';
</script>

<button
	on:click={onClick}
	class="justify-center items-center flex shadow-lg rounded-xl bg-neutral-800 text-blue-400 text-md border border-slate-500 p-2 w-[90px]"
	><p>
		{text}
	</p></button
>
