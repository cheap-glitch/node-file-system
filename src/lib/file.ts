import { readFile, rm } from 'node:fs/promises';
import { readFileSync, rmSync } from 'node:fs';

import type { Path } from './path.js';

export function getFileContents(path: Path): Promise<string> {
	return readFile(path, { encoding: 'utf8' });
}

export function getFileContentsSync(path: Path): string {
	return readFileSync(path, { encoding: 'utf8' });
}

export async function tryGettingFileContents(path: Path): Promise<string | undefined> {
	try {
		return await getFileContents(path);
	} catch {
		return undefined;
	}
}

export function tryGettingFileContentsSync(path: Path): string | undefined {
	try {
		return getFileContentsSync(path);
	} catch {
		return undefined;
	}
}

export function removeFile(path: Path): Promise<void> {
	return rm(path, { force: true });
}

export function removeFileSync(path: Path): void {
	rmSync(path, { force: true });
}
