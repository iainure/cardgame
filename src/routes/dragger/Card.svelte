<script lang="ts">

	interface CardData {
		id: number,
		colour: string,
		suit: string,
		type: string
	}

	import { fade } from 'svelte/transition';

	export let data: CardData
	export let fixed: boolean = false

	$: style = data ? `background-color: ${data.colour}` : 'red'
	$: name = data ? `${data.type} of ${data.suit}` : 'undefined'

	let dragStart = (e:any) => {
		e.target.style.opacity = '0.4'
		e.dataTransfer.setData('text/cardid', `${data.id}`)
	}

	let dragEnd = (e:any) => {
		e.target.style.opacity = '1'
	}

</script>

{#if data}
<div
	style={style}
	draggable={!fixed}
	class="draggable"
	class:fixed={fixed}
	on:dragstart={dragStart}
	on:dragend={dragEnd}
	out:fade|local
>
	<p>{name}</p>
</div>
{/if}

<style>

.draggable {
	background-color: grey;
	width: calc(var(--slotWidth) - 6px);
	height: calc(var(--slotHeight) - 6px);
	border-radius: 6px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 2em;
}

.draggable:not(.fixed) {
	cursor: pointer;
}

p {
	text-align: center;
	color: white;
	font-weight: bold;
	font-size: 1.2em;
	line-height: 1.2em;
	margin: 0;
	-webkit-user-select: none; /* Safari */        
	-moz-user-select: none; /* Firefox */
	-ms-user-select: none; /* IE10+/Edge */
	user-select: none; /* Standard */
}

</style>