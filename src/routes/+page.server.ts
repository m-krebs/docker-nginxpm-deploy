import type { PageServerLoad } from './$types';

import { executeCmdSubProcess } from '$lib/utils';

export const load: PageServerLoad = async () => {
	return {
		commandResult: executeCmdSubProcess("ls"),
	}
};
