<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
	import DataTable from "./data-table.svelte";
	import DeploymentForm from "./deployment-form.svelte";
	import * as Dialog from "$lib/components/ui/dialog/index";

	import { columns } from "./columns";
	import { PlusCircleIcon } from "lucide-svelte";

	let { data } = $props();
</script>

<Dialog.Root>
	<Dialog.Trigger><Button><PlusCircleIcon />Create new</Button></Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Create new deployment</Dialog.Title>
			<div class="py-3">
				<DeploymentForm data={data.form} />
			</div>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
<DataTable data={data.deployments} {columns} />
