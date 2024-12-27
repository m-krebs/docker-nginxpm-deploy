import type { PageServerLoad } from "./$types.js";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { deploymentSchema } from "./schema.js";

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(deploymentSchema)),
	};
};
