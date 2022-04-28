import { stat } from 'node:fs/promises';
import { statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, parse, resolve } from 'node:path';

import { createTemporaryDirectory, createTemporaryDirectorySync } from './directory.js';

import type { Stats as FileSystemStats } from 'node:fs';

export type Path = string | URL;

export function getFilename(path: Path): string {
	const { name } = parse(path instanceof URL ? fileURLToPath(path) : path);

	return name;
}

export function getCurrentWorkingDirectoryAbsolutePath(): string {
	// If no path segments are passed, path.resolve() will return the absolute path of the current working directory (https://nodejs.org/api/path.html#pathresolvepaths)
	return resolve();
}

export async function tryGettingPathStats(path: Path): Promise<FileSystemStats | undefined> {
	try {
		return await stat(path);
	} catch {
		return undefined;
	}
}

export function tryGettingPathStatsSync(path: Path): FileSystemStats | undefined {
	return statSync(path, { throwIfNoEntry: false });
}

export async function getTemporaryFilePath(directoryNamePrefix: string, filename: string): Promise<string> {
	return join(await createTemporaryDirectory(directoryNamePrefix), filename);
}

export function getTemporaryFilePathSync(directoryNamePrefix: string, filename: string): string {
	return join(createTemporaryDirectorySync(directoryNamePrefix), filename);
}
