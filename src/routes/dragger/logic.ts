import { writable, derived, get } from 'svelte/store'

// ts definitions

interface CardData {
	id: number,
	colour: string,
	suit: string,
	type: string
}

interface DroppedData {
	cardId: number,
	positionId: number
}


// set up our whole deck

let cards: CardData[] = []

const suits = ['Clubs', 'Hearts', 'Diamonds', 'Spades']
const colours = ['green', 'turquoise', 'olivedrab', 'springgreen']
const types = ['Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King', 'Ace']

const generateCards = () => {

	let id: number = 1;
	let colourIndex: number = 0;

	for(let i = 0; i < suits.length; i++){

		for(let j:number = 0; j < types.length; j++){

			// put in a random place in array so far
			const randomIndex = Math.floor(Math.random() * id)

			cards.splice(randomIndex, 0, {
				id,
				colour: colours[colourIndex],
				suit: suits[i],
				type: types[j]
			})

			id++

		}

		colourIndex++
	
	}

	return cards
}

generateCards()

export const getCards = () => cards

// helpers

export const getCard = (cardId: number) => {

	return cards.find(card => card.id == cardId)

}


// scoring

export const score = writable(0)

// positioning

export let cardPositionMap = writable({})

export const insertCard = (data: DroppedData) => {

	const positionId: number = data.positionId

	// this position is already filled
	if(get(cardPositionMap)[positionId]){
		return
	}

	cardPositionMap.set(
		Object.assign(
			{},
			get(cardPositionMap),
			{
				[positionId]: data.cardId
			}
		)
	)

}

export const removeCardsById = (toRemoveIds: any) => {

	const map = get(cardPositionMap)
	const clone = {}

	Object.keys(map).forEach((positionId: string) => {

		const mappedCardId = map[positionId]
		if(!toRemoveIds.includes(mappedCardId)){
			clone[positionId] = mappedCardId
		}

	})

	cardPositionMap.set(clone)

}

export const clear = () => {

	cardPositionMap.set({})
	score.set(0)

}

// generating new cards

const randomCard = cardPositionMap => {

	const placedCardIds = Object.values(cardPositionMap)
	const available: CardData[] = cards.filter(card => !placedCardIds.includes(card.id))

	if(!available.length){
		return null
	}

	const randomIndex: number = Math.floor(Math.random() * (available.length))

	return available[randomIndex]

}

export const deckCurrentCard = derived(cardPositionMap, randomCard)

export default {}