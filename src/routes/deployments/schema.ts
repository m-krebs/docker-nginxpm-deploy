import { z } from "zod";

const sourceRegExp: RegExp = new RegExp("^ [^&| @!# %^ ();:/\\\\}{=+? <>, ~`'\"]+$")

export const deploymentSchema = z.object({
	id: z.number(),
	repository: z.string(),
	name: z.string().min(2, { message: "Must be at least 1 charter long." }), // myapp
	source: z.string()
		.min(2, { message: "Must include at least 2 characters." }),
	// .regex(sourceRegExp, { message: "Pattern mismatch" }),
	destination: z.string().includes(":", { message: "Must include :" }), // 192.168.178.99:8080
	type: z.enum(["compose"]),
});

export type DeploymentSchema = typeof deploymentSchema;
