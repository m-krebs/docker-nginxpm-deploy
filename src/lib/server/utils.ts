import { type ClassValue, clsx } from "clsx";

import { twMerge } from "tailwind-merge";
import { error } from '@sveltejs/kit';
import { exec } from 'child_process'
import { simpleGit, type SimpleGit } from 'simple-git';

const git: SimpleGit = simpleGit();

export function cn(...inputs: ClassValue[]) {
        return twMerge(clsx(inputs));
}

export async function executeCmdSubProcess(command: string) {
        return new Promise<string>((resolve, reject) => {
                exec(command, (err, stdout, stderr) => {
                        if (err || stderr) {
                                reject(err || stderr);
                        } else {
                                resolve(stdout)
                        }
                })
        }).catch((err) => {
                throw error(500, `Command failed: ${err}`);
        });
}

export async function gitClone(repo: string, directory: string) {
        return new Promise<string>((resolve, reject) => {
                git.clone(repo, directory, {}, (error, data) => {
                        if (error) {
                                reject(error)
                        } else {
                                resolve(data);
                        }
                });
        });
}
