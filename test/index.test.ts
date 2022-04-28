import os from 'node:os';
import path from 'node:path';
import { Dirent, Stats, rmSync, mkdirSync, existsSync as pathExists } from 'node:fs';

import * as fs from '../src';

// The trailing slash is needed to keep the folder when used as a base URL
const fixturesDirectory = new URL('fixtures/', import.meta.url);

function clearFixturesDirectory(): void {
	rmSync(fixturesDirectory, {
		force: true,
		recursive: true,
	});

	mkdirSync(fixturesDirectory);
}

describe('path.ts', () => { // {{{

	test('getFilename', () => { // {{{

		expect(fs.getFilename('file.txt')).toBe('file');
		expect(fs.getFilename('/path/to/file.txt')).toBe('file');
		expect(fs.getFilename(new URL('file:///path/to/file.txt'))).toBe('file');

	}); // }}}

	test('getCurrentWorkingDirectoryAbsolutePath', () => { // {{{

		expect(fs.getCurrentWorkingDirectoryAbsolutePath()).toBe(path.resolve(process.cwd()));

	}); // }}}

	test('tryGettingPathStats', async () => { // {{{

		await expect(fs.tryGettingPathStats(process.cwd())).resolves.toBeInstanceOf(Stats);
		await expect(fs.tryGettingPathStats('/non/existing/path')).resolves.toBeUndefined();

	}); // }}}

	test('tryGettingPathStatsSync', () => { // {{{

		expect(fs.tryGettingPathStatsSync(process.cwd())).toBeInstanceOf(Stats);
		expect(fs.tryGettingPathStatsSync('/non/existing/path')).toBeUndefined();

	}); // }}}

	test('getTemporaryFilePath', async () => { // {{{

		const temporaryFilePathRegex = new RegExp('^' + path.join(os.tmpdir(), 'foo-\\w+?', 'bar.txt') + '$', 'u');

		await expect(fs.getTemporaryFilePath('foo', 'bar.txt')).resolves.toMatch(temporaryFilePathRegex);
		await expect(fs.getTemporaryFilePath('foo-', 'bar.txt')).resolves.toMatch(temporaryFilePathRegex);

		await expect(fs.getTemporaryFilePath('foo-XXXXXX', 'bar.txt')).rejects.toThrow("Don't use trailing `X` characters for placeholders in temporary directory name");

	}); // }}}

	test('getTemporaryFilePathSync', () => { // {{{

		const temporaryFilePathRegex = new RegExp('^' + path.join(os.tmpdir(), 'foo-\\w+?', 'bar.txt') + '$', 'u');

		expect(fs.getTemporaryFilePathSync('foo', 'bar.txt')).toMatch(temporaryFilePathRegex);
		expect(fs.getTemporaryFilePathSync('foo-', 'bar.txt')).toMatch(temporaryFilePathRegex);

		expect(() => {
			fs.getTemporaryFilePathSync('foo-XXXXXX', 'bar.txt');
		}).toThrow("Don't use trailing `X` characters for placeholders in temporary directory name");

	}); // }}}

}); // }}}

describe('file.ts', () => { // {{{

	test('getFileContents', async () => { // {{{

		await expect(fs.getFileContents('package.json')).resolves.toStrictEqual(expect.any(String));
		await expect(fs.getFileContents(new URL('../package.json', import.meta.url))).resolves.toStrictEqual(expect.any(String));

	}); // }}}

	test('getFileContentsSync', () => { // {{{

		expect(fs.getFileContentsSync('package.json')).toStrictEqual(expect.any(String));
		expect(fs.getFileContentsSync(new URL('../package.json', import.meta.url))).toStrictEqual(expect.any(String));

	}); // }}}

	test('tryGettingFileContents', async () => { // {{{

		await expect(fs.tryGettingFileContents('package.json')).resolves.toStrictEqual(expect.any(String));
		await expect(fs.tryGettingFileContents(new URL('../package.json', import.meta.url))).resolves.toStrictEqual(expect.any(String));

		await expect(fs.tryGettingFileContents('missing.txt')).resolves.toBeUndefined();
		await expect(fs.tryGettingFileContents(new URL('missing.txt', import.meta.url))).resolves.toBeUndefined();

	}); // }}}

	test('tryGettingFileContentsSync', () => { // {{{

		expect(fs.tryGettingFileContentsSync('package.json')).toStrictEqual(expect.any(String));
		expect(fs.tryGettingFileContentsSync(new URL('../package.json', import.meta.url))).toStrictEqual(expect.any(String));

		expect(fs.tryGettingFileContentsSync('missing.txt')).toBeUndefined();
		expect(fs.tryGettingFileContentsSync(new URL('missing.txt', import.meta.url))).toBeUndefined();

	}); // }}}

	test('removeFile', async () => { // {{{

		await expect(fs.removeFile('missing.txt')).resolves.toBeUndefined();
		await expect(fs.removeFile(new URL('missing.txt', import.meta.url))).resolves.toBeUndefined();

	}); // }}}

	test('removeFileSync', () => { // {{{

		expect(fs.removeFileSync('missing.txt')).toBeUndefined();
		expect(fs.removeFileSync(new URL('missing.txt', import.meta.url))).toBeUndefined();

	}); // }}}

}); // }}}

describe('directory.ts', () => { // {{{

afterAll(clearFixturesDirectory);

	describe('create/remove', () => { // {{{

		beforeEach(clearFixturesDirectory);

		test('createDirectory', async () => { // {{{

			const nestedDirectory = new URL('foo/bar/baz', fixturesDirectory);

			await expect(fs.createDirectory(nestedDirectory)).resolves.toMatch(/\/test\/fixtures\/foo$/u);
			expect(pathExists(nestedDirectory)).toBe(true);

		}); // }}}

		test('createDirectorySync', () => { // {{{

			const nestedDirectory = new URL('foo/bar/baz', fixturesDirectory);

			expect(fs.createDirectorySync(nestedDirectory)).toMatch(/\/test\/fixtures\/foo$/u);
			expect(pathExists(nestedDirectory)).toBe(true);

		}); // }}}

		test('removeDirectory', async () => { // {{{

			await expect(fs.removeDirectory(fixturesDirectory)).resolves.toBeUndefined();
			await expect(fs.removeDirectory(fixturesDirectory)).resolves.toBeUndefined();
			expect(pathExists(fixturesDirectory)).toBe(false);

		}); // }}}

		test('removeDirectorySync', () => { // {{{

			expect(fs.removeDirectorySync(fixturesDirectory)).toBeUndefined();
			expect(fs.removeDirectorySync(fixturesDirectory)).toBeUndefined();
			expect(pathExists(fixturesDirectory)).toBe(false);

		}); // }}}

	}); // }}}

	test('createTemporaryDirectory', async () => { // {{{

		await expect(fs.createTemporaryDirectory('foobar')).resolves.toMatch(/\/foobar-\w+$/u);
		await expect(fs.createTemporaryDirectory('foobar-')).resolves.toMatch(/\/foobar-\w+$/u);

		await expect(async () => {
			await fs.createTemporaryDirectory('foobar-XXXXXX');
		}).rejects.toThrow("Don't use trailing `X` characters for placeholders in temporary directory name");

	}); // }}}

	test('createTemporaryDirectorySync', () => { // {{{

		expect(fs.createTemporaryDirectorySync('foobar')).toMatch(/\/foobar-\w+$/u);
		expect(fs.createTemporaryDirectorySync('foobar-')).toMatch(/\/foobar-\w+$/u);

		expect(() => {
			fs.createTemporaryDirectorySync('foobar-XXXXXX');
		}).toThrow("Don't use trailing `X` characters for placeholders in temporary directory name");

	}); // }}}

	test('getDirectoryEntries', async () => { // {{{

		const twelveDirectoryEntries = Array.from({ length: 12 }, () => expect.any(Dirent));

		// eslint-disable-next-line jest/prefer-strict-equal -- We just want to check the length of the resulting array and the type of its items
		await expect(fs.getDirectoryEntries(new URL('..', import.meta.url))).resolves.toEqual(twelveDirectoryEntries);

	}); // }}}

	test('getDirectoryEntriesSync', () => { // {{{

		const twelveDirectoryEntries = Array.from({ length: 12 }, () => expect.any(Dirent));

		// eslint-disable-next-line jest/prefer-strict-equal -- We just want to check the length of the resulting array and the type of its items
		expect(fs.getDirectoryEntriesSync(new URL('..', import.meta.url))).toEqual(twelveDirectoryEntries);

	}); // }}}

	test('tryGettingDirectoryEntries', async () => { // {{{

		await expect(fs.tryGettingDirectoryEntries('missing/')).resolves.toBeUndefined();

	}); // }}}

	test('tryGettingDirectoryEntriesSync', () => { // {{{

		expect(fs.tryGettingDirectoryEntriesSync('missing/')).toBeUndefined();

	}); // }}}

	test('getFilenamesInDirectory', async () => { // {{{

		await expect(fs.getFilenamesInDirectory(new URL('..', import.meta.url))).resolves.toStrictEqual([
			'.gitignore',
			'LICENSE',
			'README.md',
			'package-lock.json',
			'package.json',
			'tsconfig.json',
		]);

		await expect(fs.getFilenamesInDirectory(new URL('..', import.meta.url), entry => entry.name.endsWith('.json'))).resolves.toStrictEqual([
			'package-lock.json',
			'package.json',
			'tsconfig.json',
		]);

	}); // }}}

	test('getFilenamesInDirectorySync', () => { // {{{

		expect(fs.getFilenamesInDirectorySync(new URL('..', import.meta.url))).toStrictEqual([
			'.gitignore',
			'LICENSE',
			'README.md',
			'package-lock.json',
			'package.json',
			'tsconfig.json',
		]);

	}); // }}}

}); // }}}
