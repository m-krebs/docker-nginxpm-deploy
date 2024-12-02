import { error } from '@sveltejs/kit';
import { exec } from 'child_process'
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const command = 'docker ps -a';
	const commandResult = await new Promise<string>((resolve, reject) => {
		exec(command, (err, stdout, stderr) => {
			if (err || stderr) {
				reject(err || stderr);
			} else {
				resolve(stdout.trim())
			}
		})
	}).catch((err) => {
		throw error(500, `Command failed: ${err}`);
	});

	return {
		commandResult
	}
};
