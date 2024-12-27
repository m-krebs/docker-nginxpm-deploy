import { gitClone } from "$lib/utils";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = () => {
        // { name: "reponame", path: "/tmp/cloneto/", branch: "main" }
        // pull repo
        return new Response("OK")
}
