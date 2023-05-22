import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import * as fs from 'node:fs';
import {
  compare, getExtension,
} from '../src/compare.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf-8');
const expectedFileJson = readFile('expectedFile.txt');

test('getExtension', () => {
  expect(getExtension('file.json')).toEqual('json');
  expect(getExtension('file.yml')).toEqual('yml');
  expect(getExtension('file.yaml')).toEqual('yaml');
});

test('expectedFileJson', () => {
  const fileName1 = `${process.cwd()}/__fixtures__/file1.json`;
  const fileName2 = `${process.cwd()}/__fixtures__/file2.json`;

  expect(compare(fileName1, fileName2)).toEqual(expectedFileJson);
});
