<script lang="ts">
	import { toast } from "svelte-sonner";
	import * as Form from "$lib/components/ui/form/index.js";
	import * as Select from "$lib/components/ui/select/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { deploymentSchema, type DeploymentSchema } from "./schema";
	import { type SuperValidated, type Infer, superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";

	export let data: SuperValidated<Infer<DeploymentSchema>>;

	const form = superForm(data, {
		validators: zodClient(deploymentSchema),

		onUpdated: ({ form: f }) => {
			if (f.valid) {
				toast.success(`Created new deployment`);
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" action="?/create" use:enhance>
	<div class="flex flex-col gap-3">
		<Form.Field {form} name="name">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Name</Form.Label>
					<Form.Description>This is the displayed name of the component.</Form.Description>
					<Input {...props} bind:value={$formData.name} placeholder="Docker NginxPM Deployer" />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="repository">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Repository</Form.Label>
					<Form.Description>This is the repository source of the deployment.</Form.Description>
					<Input
						{...props}
						bind:value={$formData.repository}
						placeholder="m-krebs/docker-nginxpm-deploy"
					/>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="source">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Domain name</Form.Label>
					<Form.Description>This is the nginx proxy host source.</Form.Description>
					<Input {...props} bind:value={$formData.source} placeholder="sub.example.com" />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="destination">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Destination</Form.Label>
					<Form.Description>This is the ip:port, on which the app runs.</Form.Description>
					<Input {...props} bind:value={$formData.destination} placeholder="192.168.178.99:8080" />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="type">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Type</Form.Label>
					<Form.Description>This is the ip:port, on which the app runs.</Form.Description>
					<Select.Root type="single">
						<Select.Trigger class="w-[180px]" {...props}>
							{$formData.type ? $formData.type : "Select a deployment type"}
						</Select.Trigger>
						<Select.Content>
							<Select.Item value="compose" label="Docker Compose" />
						</Select.Content>
					</Select.Root>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Button>Create deployment</Form.Button>
	</div>
</form>
