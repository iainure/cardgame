<script lang="ts">

	import { createEventDispatcher } from 'svelte'
	const dispatch: any = createEventDispatcher()

	export let id: number

	let beingDraggedOver: boolean = false
	$: classes = `position${beingDraggedOver ? ' over' : ''}`

	const draggingEnter = (event: any) => {
		event.preventDefault();
		beingDraggedOver = true
	}

	const draggingLeave = (event: any) => {
		event.preventDefault();
		beingDraggedOver = false
	}

	// must do this for drop event to trigger
	const draggingOver = (event: any) => event.preventDefault()

	const handleDrop = (event: any) => {

		beingDraggedOver = false

		dispatch('droppedOnPosition', {
			cardId: parseInt(event.dataTransfer.getData("text/cardid")),
			positionId: id
		})

	}

</script>

<div
	data-id={id}
	class={classes}
	on:dragenter={draggingEnter}
	on:dragleave={draggingLeave}
	on:dragover={draggingOver}
	on:drop={handleDrop}
>
	<slot></slot>
</div>


<style>

.position {
	border: 3px dashed #e6e6e6;
}

:global(.position.over) {
	border: 3px dashed green;
}


</style>