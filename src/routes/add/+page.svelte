<script lang="ts">
	import { deploymentSchema, type DeploymentSchema } from './schema';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<DeploymentSchema>>;

	const form = superForm(data, {
		validators: zodClient(deploymentSchema),
		dataType: 'json'
	});

	const { form: formData, enhance } = form;
</script>

<div>Create new</div>

<form method="post" use:enhance>
	<Form.Field {form} name="repository">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Username</Form.Label>
				<Input {...props} bind:value={$formData.repository} />
			{/snippet}
		</Form.Control>
		<Form.Description>This is your public display name.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Add</Form.Button>
</form>
