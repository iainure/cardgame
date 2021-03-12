<script lang="ts">
	
	import { fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()
	const close = () => dispatch('close')

	export let title: string = 'My title'

</script>

<div transition:fade="{{duration: 100}}" class="outer grid-x align-center align-middle">
	<div class="inner cell small-6">
		<div class="header">
			<h2>{ title }</h2>
			<button on:click={close} class="close-button" aria-label="Close alert" type="button" data-close>
				<span aria-hidden="true">&times;</span>
			</button>
		</div>
		<div class="body">
			<slot></slot>
		</div>
	</div>
</div>

<style>

.outer {
	position: fixed;
	background-color: rgba(0,0,0,0.5);
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
}

.inner {
	background-color: white;
}

.header,
.body {
	padding: 1rem;
}

.header {
	position: relative;
	background-color: #e6e6e6;
}

.header h2 {
	font-size: 1.3rem;
	margin: 0;
}

.body {
	min-height: 200px;
}

.close-button {
	font-size: 3rem;
}

</style>
