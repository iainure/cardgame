<script lang="ts">

	import { onMount } from 'svelte'
	import { loadScores } from '../api/api'
	import { fade } from 'svelte/transition';

	let limit: number = 10
	let scores: any[] = []

	onMount(async () => {

		let res = await loadScores()
		let { Items } = await res.json()

		scores = Items

	})

	$: results = scores.slice(0, limit).sort((r1, r2) => r2.score - r1.score)

</script>


<svelte:head>
	<title>Three in a Row</title>
</svelte:head>

<div class="row">
	<div class="columns">
		<div class="callout">
			<h4>A quite boring game of matching 3 cards in a row by suit or type.</h4>
			<p>Built with Svelte, Sapper, Foundation CSS, Typescript and AWS.</p>
			<p>Drag cards onto the grid. Three in a row with a matching suit or type will be scored. See how long you can go for!</p>
			<p><strong>Example scoring combinations:</strong><br> Jack, Ten and Four of Hearts. Nine of Hearts, Clubs and Diamonds.</p>
			<p><a href="/dragger" class="button primary">Let's play!</a></p>
		</div>
		<h3>Top 10 Scores</h3>
		<ol>
		{#each results as result}
			<li in:fade|local>{result.name} - {result.score} points</li>
		{/each}
		</ol>
	</div>
</div>


