<script lang="ts">

	import Position from './Position.svelte';
	import Deck from './Deck.svelte';
	import Card from './Card.svelte';
	import Controls from './Controls.svelte';
	import { get } from 'svelte/store'
	import { getCard, insertCard, removeCardsById, cardPositionMap, score } from './logic'

	const scoringGroups = [
		{
			name: 'v1',
			positions: [1,4,7]
		},
		{
			name: 'v2',
			positions: [2,5,8]
		},
		{
			name: 'v3',
			positions: [3,6,9]
		},
		{
			name: 'h1',
			positions: [1,2,3]
		},
		{
			name: 'h2',
			positions: [4,5,6]
		},
		{
			name: 'h3',
			positions: [7,8,9]
		},
		{
			name: 'd1',
			positions: [1,5,9]
		},
		{
			name: 'd2',
			positions: [3,5,7]
		}
	]

	const positions: {id: number}[] = []

	// grid of 9
	for(let i = 1; i < 10; i++){
		positions.push({
			id: i
		})
	}


	const removeScored = (toRemoveIds: number[]) => {

		setTimeout(() => {

			removeCardsById(toRemoveIds)

		}, 200)

	}


	const updatePositions = (e: any) => {
	
		insertCard(e.detail)

		const map = get(cardPositionMap)

		// which scoring groups have a card in every slot?
		const filled = scoringGroups.filter(group => group.positions.every(positionId => !!map[positionId]))

		filled.forEach(group => {

			// cards in this group
			const groupedCards = group.positions.map(positionId => getCard(map[positionId]))
			
			let suit: string, type: string

			// do all cards have the same suit?
			const sameSuit = groupedCards.every(card => {
				if(!suit){
					suit = card.suit
				}

				return suit == card.suit

			})

			// are they the same type?
			const sameType = groupedCards.every(card => {
				if(!type){
					type = card.type
				}

				return type == card.type

			})

			let add: number

			switch(true){

				case sameSuit && sameType:
					add = 10
					break

				case sameType:
					add = 5
					break

				case sameSuit:
					add = 1
					break

			}

			// winning combo? score them and remove the cards
			if(add){
				score.set(get(score) + add)
				removeScored(groupedCards.map(card => card.id))				
			}


		})

	}

</script>

<svelte:head>
	<title>Drag and drop</title>
</svelte:head>

<div class="board">

	<div class="left">
		<Deck />
	</div>

	<div class="positions">
	{#each positions as position(position.id)}	
		<Position id={position.id} on:droppedOnPosition={updatePositions}>
		{#if !!$cardPositionMap[position.id]}
			<Card fixed data={getCard($cardPositionMap[position.id])} />
		{/if}
		</Position>
	{/each}
	</div>

	<div class="right">
		<Controls />
	</div>

</div>

<style>

.board {
	--slotWidth: 150px;
	--slotHeight: 200px;

	display: grid;
	grid-template-columns: 200px 1fr 200px;
	grid-gap: 2em;
}

.positions {
	display: grid;
	grid-template-columns: repeat(3, var(--slotWidth));
	grid-template-rows: repeat(3, var(--slotHeight));
	grid-gap: 2em;
	justify-content: center;
}

</style>