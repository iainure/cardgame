<script lang="ts">
	import Nav from '../components/Nav.svelte';

	export let segment: string;
</script>

<div class="grid-container">
	<h1 class="text-center">Three in a Row</h1>

	<Nav {segment}/>

	<main>
		<slot></slot>
	</main>
</div>