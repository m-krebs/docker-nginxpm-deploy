<script lang="ts">
	import "../app.css";
	import { Toaster } from "$lib/components/ui/sonner/index";
	import { ModeWatcher } from "mode-watcher";
	let { children } = $props();
</script>

<ModeWatcher />
<Toaster richColors position="bottom-center" />
{@render children()}
