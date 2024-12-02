<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<span class="whitespace-pre-wrap">{data.commandResult}</span>
