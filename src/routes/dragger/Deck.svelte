<script lang="ts">

import { onDestroy } from 'svelte'
import { deckCurrentCard } from './logic'
import Card from './Card.svelte'

let nextCard: any

const unsub = deckCurrentCard.subscribe(value => {
	nextCard = value
})

onDestroy(unsub)

</script>

<Card  data={nextCard} />