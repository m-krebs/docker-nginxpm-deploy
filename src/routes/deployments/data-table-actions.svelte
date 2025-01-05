<script lang="ts">
	import Ellipsis from "lucide-svelte/icons/ellipsis";
	import { Button } from "$lib/components/ui/button/index.js";
	import { Pencil, Trash } from "lucide-svelte";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
	import { applyAction, enhance } from "$app/forms";
	import { toast } from "svelte-sonner";

	let { id }: { id: string } = $props();

	function wait(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	let open = $state(false);
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button {...props} variant="ghost" size="icon" class="relative size-8 p-0">
				<span class="sr-only">Open menu</span>
				<Ellipsis class="size-4" />
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.GroupHeading>Actions</DropdownMenu.GroupHeading>
			<DropdownMenu.Item onclick={() => navigator.clipboard.writeText(id)}>
				<Pencil />
				Edit
			</DropdownMenu.Item>
			<DropdownMenu.Separator />
			<AlertDialog.Root bind:open>
				<DropdownMenu.Item class="flex w-full text-red-600 hover:text-red-600">
					{#snippet child({ props })}
						<AlertDialog.Trigger {...props}>
							<Trash color="#dc2626" />
							Delete
						</AlertDialog.Trigger>
					{/snippet}
				</DropdownMenu.Item>
				<AlertDialog.Content>
					<AlertDialog.Header>
						<AlertDialog.Title>Delete Deployment</AlertDialog.Title>
						<AlertDialog.Description>
							This action cannot be undone. This will permanently delete this Deployment.
						</AlertDialog.Description>
					</AlertDialog.Header>
					<AlertDialog.Footer>
						<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
						<form
							method="POST"
							action="?/delete"
							use:enhance={({ formElement, formData, action, cancel }) => {
								return async ({ result, update }) => {
									if (result.type === "failure") {
										toast.error("Failed to delete deployment.");
									} else {
										toast.success("Deployment deleted succesfully.");
										await update();
									}
									wait(300).then(() => (open = false));
								};
							}}
						>
							<input name="id" bind:value={id} class="hidden" />
							<AlertDialog.Action type="submit">Delete</AlertDialog.Action>
						</form>
					</AlertDialog.Footer>
				</AlertDialog.Content>
			</AlertDialog.Root>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
