import { db } from "$lib/server/db";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { deploymentSchema } from "./schema";
import type { Actions, PageServerLoad } from "./$types";
import { fail } from "@sveltejs/kit"
import { deployment } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

export const load: PageServerLoad = async () => {
	const getDeployments = () => {
		return db.query.deployment.findMany({})
	}

	const deployments = await getDeployments();
	return {
		deployments,
		form: await superValidate(zod(deploymentSchema))
	};
}

export const actions: Actions = {
	create: async (event) => {
		const form = await superValidate(event, zod(deploymentSchema));

		if (!form.valid) {
			return fail(400, { form })
		}

		await db.insert(deployment).values(form.data)
		return { form }
	},
	delete: async ({ request }) => {
		const data = await request.formData();
		const id: number = Number(data.get('id'))

		const deletedDeployment = await db.delete(deployment).where(eq(deployment.id, id)).returning()

		if (!deletedDeployment || deletedDeployment === null) {
			return fail(400, { message: "Failed to delete deployment" })
		}

		return { success: true }
	}
}
