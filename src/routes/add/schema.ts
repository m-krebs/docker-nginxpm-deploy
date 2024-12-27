import { z } from "zod";

export const deploymentSchema = z.object({
	repository: z.string()
});

export type DeploymentSchema = typeof deploymentSchema;
