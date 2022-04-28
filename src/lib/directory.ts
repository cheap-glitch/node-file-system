import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { readdir, mkdir, mkdtemp, rm } from 'node:fs/promises';
import { readdirSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';

import { cleanTemporaryDirectoryNamePrefix, getFilenamesFromDirectoryEntries } from './helpers.js';

import type { Path } from './path.js';
import type { Dirent as DirectoryEntry } from 'node:fs';

export function createDirectory(path: Path): Promise<string | undefined> {
	return mkdir(path, { recursive: true });
}

export function createDirectorySync(path: Path): string | undefined {
	return mkdirSync(path, { recursive: true });
}

export function createTemporaryDirectory(prefix: string): Promise<string> {
	return mkdtemp(join(tmpdir(), cleanTemporaryDirectoryNamePrefix(prefix)));
}

export function createTemporaryDirectorySync(prefix: string): string {
	return mkdtempSync(join(tmpdir(), cleanTemporaryDirectoryNamePrefix(prefix)));
}

export function getDirectoryEntries(path: Path): Promise<DirectoryEntry[]> {
	return readdir(path, { withFileTypes: true });
}

export function getDirectoryEntriesSync(path: Path): DirectoryEntry[] {
	return readdirSync(path, { withFileTypes: true });
}

export async function tryGettingDirectoryEntries(path: Path): Promise<DirectoryEntry[] | undefined> {
	try {
		return await getDirectoryEntries(path);
	} catch {
		return undefined;
	}
}

export function tryGettingDirectoryEntriesSync(path: Path): DirectoryEntry[] | undefined {
	try {
		return getDirectoryEntriesSync(path);
	} catch {
		return undefined;
	}
}

export async function getFilenamesInDirectory(path: Path, filter?: (file: DirectoryEntry) => boolean): Promise<string[]> {
	return getFilenamesFromDirectoryEntries(await getDirectoryEntries(path), filter);
}

export function getFilenamesInDirectorySync(path: Path, filter?: (file: DirectoryEntry) => boolean): string[] {
	return getFilenamesFromDirectoryEntries(getDirectoryEntriesSync(path), filter);
}

export function removeDirectory(path: Path): Promise<void> {
	return rm(path, {
		force: true,
		recursive: true,
	});
}

export function removeDirectorySync(path: Path): void {
	rmSync(path, {
		force: true,
		recursive: true,
	});
}
