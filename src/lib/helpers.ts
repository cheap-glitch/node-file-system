import type { Dirent as DirectoryEntry } from 'node:fs';

export function getFilenamesFromDirectoryEntries(entries: DirectoryEntry[], additionalFilter?: (file: DirectoryEntry) => boolean): string[] {
	const filenames: string[] = [];

	for (const entry of entries) {
		if (entry.isFile() && (additionalFilter === undefined || additionalFilter(entry))) {
			filenames.push(entry.name);
		}
	}

	return filenames;
}

export function cleanTemporaryDirectoryNamePrefix(prefix: string): string {
	// TODO [>=1.0.0]: Can TypeScript take care of this?
	if (prefix.endsWith('X')) {
		throw new Error("Don't use trailing `X` characters for placeholders in temporary directory name (https://nodejs.org/api/fs.html#fspromisesmkdtempprefix-options)");
	}

	return prefix.replace(/-+$/u, '') + '-';
}
