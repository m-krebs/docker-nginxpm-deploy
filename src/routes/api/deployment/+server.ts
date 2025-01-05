import { db } from "$lib/server/db";
import { deployment } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import type { RequestHandler } from "./$types";

export const DELETE: RequestHandler = async ({ request }) => {
        const { id } = await request.json();
        const response = await db.delete(deployment).where(eq(deployment.id, id))
        return new Response(response.toString())
}
