<script lang="ts">
	
	import { clear, score } from './logic'
	import Save from './Save.svelte'
	import Modal from '../../components/Modal.svelte'

	let saving: boolean = false

	const startSave = () => {

		saving = true

	}

	const close = () => saving = false

</script>

<h3 class="text-center">SCORE: {$score}</h3>
<a on:click|preventDefault={startSave} class="button primary expanded" href="/" >Save</a>
<a on:click|preventDefault={clear} class="button hollow primary expanded" href="/">Clear</a>
{#if saving}
<Modal on:close={close} title="Save my score">
	<Save on:close={close} />
</Modal>
{/if}