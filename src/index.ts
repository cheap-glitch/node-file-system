/*
 *!
 * node-file-system
 *
 * TODO.
 *
 * Copyright (c) 2022-present, cheap glitch
 *
 * Permission  to use,  copy, modify,  and/or distribute  this software  for any
 * purpose  with or  without  fee is  hereby granted,  provided  that the  above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
 * REGARD TO THIS  SOFTWARE INCLUDING ALL IMPLIED  WARRANTIES OF MERCHANTABILITY
 * AND FITNESS. IN NO EVENT SHALL THE  AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 * INDIRECT, OR CONSEQUENTIAL  DAMAGES OR ANY DAMAGES  WHATSOEVER RESULTING FROM
 * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
 * OTHER  TORTIOUS ACTION,  ARISING OUT  OF  OR IN  CONNECTION WITH  THE USE  OR
 * PERFORMANCE OF THIS SOFTWARE.
 */

export {
	tmpdir as getOsTemporaryDirectory,
} from 'node:os';

export {
	join as joinPaths,
	extname as getExtension,
	resolve as resolvePaths,
	dirname as getDirectoryName,
	basename as getBasename,
	relative as getRelativePathBetween,
	normalize as normalizePath,
	isAbsolute as isAbsolutePath,
} from 'node:path';

export {
	fileURLToPath as getAbsolutePathFromURL,
} from 'node:url';

export {
	stat as getPathStats,
	writeFile as writeFileContents,
} from 'node:fs/promises';

export {
	statSync as getPathStatsSync,
	existsSync as pathExists,
	writeFileSync as writeFileContentsSync,
} from 'node:fs';

export {
	getFilename,
	getCurrentWorkingDirectoryAbsolutePath,
	tryGettingPathStats,
	tryGettingPathStatsSync,
	getTemporaryFilePath,
	getTemporaryFilePathSync,
} from './lib/path.js';

export {
	getFileContents,
	getFileContentsSync,
	tryGettingFileContents,
	tryGettingFileContentsSync,
	removeFile,
	removeFileSync,
} from './lib/file.js';

export {
	createDirectory,
	createDirectorySync,
	createTemporaryDirectory,
	createTemporaryDirectorySync,
	getDirectoryEntries,
	getDirectoryEntriesSync,
	tryGettingDirectoryEntries,
	tryGettingDirectoryEntriesSync,
	getFilenamesInDirectory,
	getFilenamesInDirectorySync,
	removeDirectory,
	removeDirectorySync,
} from './lib/directory.js';
