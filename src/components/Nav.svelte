<script lang="ts">
	export let segment: string;

	$: path = segment || ''

	interface MenuItem {
		path: string | undefined;
		label: string
	}

	let menuItems: MenuItem[] = [
		{
			path: '',
			label: 'Home'
		},
		{
			path: 'dragger',
			label: 'Play'
		},
		{
			path: 'about',
			label: 'About'
		}
	]

</script>

<style>

nav {
	margin-bottom: 1em;
}

</style>

<nav>
	<ul class="menu align-center">
		{#each menuItems as item(item.path)}
		<li class="{path === item.path ? 'is-active' : ''}">
			<a aria-current="{segment === item.path ? 'page' : undefined}" href="{item.path}">{item.label}</a>
		</li>
		{/each}
	</ul>
</nav>
