<script lang="ts">

	import { createEventDispatcher } from 'svelte'
	import { get } from 'svelte/store'
	import { saveScore } from '../../api/api'
	import { score } from './logic'

	const dispatch = createEventDispatcher()

	let name: string = 'iain'
	let email: string = 'iain@ure.com'

	let nameInvalid: boolean = false
	let emailInvalid: boolean = false
	let saveText: string = 'Save'
	let saveClass: string = 'primary'

	const close = () => dispatch('close')

	const save = async () => {

		// validate
		nameInvalid = name.length < 4
		emailInvalid = !email.includes('@') || !email.includes('.') || email.length < 10

		if(nameInvalid || emailInvalid){
			return false
		}

		// save
		saveText = 'Saving...'

		try {

			await saveScore({
				email,
				name,
				score: get(score),
				timestamp: Date.now()
			})

			saveText = 'Saved!'
			saveClass= 'success'

			setTimeout(() => close(), 1000)

		}

		catch(err){

			saveText = 'Unable to save score'
			saveClass= 'alert'

			setTimeout(() => {

				saveText = 'Save'
				saveClass= 'primary'

			}, 4000)

		}

	}


</script>

<p>Enter your details below and your score will be saved to the scoreboard.</p>
<label>Name:
	<input type="text" bind:value={name} />
</label>
{#if nameInvalid}
<p class="help-text" >Your name must be at least 3 characters long.</p>
{/if}
<label>Email address:
	<input type="email" bind:value={email} />
</label>
{#if emailInvalid}
<p class="help-text" >Enter a valid email address.</p>
{/if}
<div class="button-group align-right">
	<a on:click|preventDefault={close} href="/" class="button hollow primary">Cancel</a>
	<a on:click|preventDefault={save} href="/" class={'button ' + saveClass}>{ saveText }</a>
</div>


<style>

.help-text {
	color: red;
}

</style>
