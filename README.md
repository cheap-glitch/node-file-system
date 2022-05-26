# 🗄 node-file-system

[![License](https://shields.io/github/license/cheap-glitch/node-file-system)](LICENSE)
[![Latest release](https://shields.io/github/v/release/cheap-glitch/node-file-system?sort=semver&label=latest%20release&color=green)](https://github.com/cheap-glitch/node-file-system/releases/latest)
[![Coverage status](https://shields.io/coveralls/github/cheap-glitch/node-file-system)](https://coveralls.io/github/cheap-glitch/node-file-system)

This is a  tiny wrapper around some of  the file system APIs of  Node.js, with a
few convenient helpers thrown  in. Its main purpose is to  keep a consistent and
expressive interface to the file system across various projects.

> This package is only available as an ESM module

## Features

 * Helpers for common file system tasks
 * Wrappers with expressive names and useful options enabled by default
 * Variants of built-in functions that return `undefined` instead of throwing an error

## Installation

```
npm i @cheap-glitch/node-file-system
```

## Usage

```typescript
import { tryGettingFileContents, removeDirectory } from 'node-file-system';

const fileContents = tryGettingFileContents(new URL('temp/file.txt', import.meta.url)) ?? '';
removeDirectory(new URL('temp', import.meta.url));
```

## Changelog

See the full changelog [here](https://github.com/cheap-glitch/node-file-system/releases).

## Contributing

Contributions are welcomed! Please open an issue before submitting substantial changes.

## Related

 * [Awesome Node.js file system packages](https://github.com/sindresorhus/awesome-nodejs#filesystem)

## License

ISC
