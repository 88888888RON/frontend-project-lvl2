import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import * as fs from 'node:fs';
import { compare, getExtension } from '../src/compare.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePathRecursive = (filename) => path.join(__dirname, '..', '__fixtures__', 'recursiveFiles', filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf-8');
const readRecursiveFile = (fileName) => fs.readFileSync(getFixturePathRecursive(fileName), 'utf-8');
const expectedFlatFile = readFile('expectedFile.txt');
const expectedRecursiveFile = readRecursiveFile('expectedRecursive.txt');

test('getExtension', () => {
  expect(getExtension('file.json')).toEqual('.json');
  expect(getExtension('file.yml')).toEqual('.yml');
  expect(getExtension('file.yaml')).toEqual('.yaml');
});

test('compareRecursiveJson', () => {
  const fileName1 = `${process.cwd()}/__fixtures__/recursiveFiles/file1.json`;
  const fileName2 = `${process.cwd()}/__fixtures__/recursiveFiles/file2.json`;

  expect(compare(fileName1, fileName2)).toEqual(expectedRecursiveFile);
});

test('compareRecursiveYml', () => {
  const file3 = `${process.cwd()}/__fixtures__/recursiveFiles/file3.yml`;
  const file4 = `${process.cwd()}/__fixtures__/recursiveFiles/file4.yaml`;

  expect(compare(file3, file4)).toEqual(expectedRecursiveFile);
});

test('compareRecursiveYmlAndJson', () => {
  const file1 = `${process.cwd()}/__fixtures__/recursiveFiles/file1.json`;
  const file4 = `${process.cwd()}/__fixtures__/recursiveFiles/file4.yaml`;

  expect(compare(file1, file4)).toEqual(expectedRecursiveFile);
});

test('compareFlatJson', () => {
  const fileName1 = `${process.cwd()}/__fixtures__/file1.json`;
  const fileName2 = `${process.cwd()}/__fixtures__/file2.json`;

  expect(compare(fileName1, fileName2)).toEqual(expectedFlatFile);
});

test('compareFlatYml', () => {
  const file3 = `${process.cwd()}/__fixtures__/file3.yml`;
  const file4 = `${process.cwd()}/__fixtures__/file4.yaml`;

  expect(compare(file3, file4)).toEqual(expectedFlatFile);
});

test('compareFlatYmlAndJson', () => {
  const file1 = `${process.cwd()}/__fixtures__/file1.json`;
  const file4 = `${process.cwd()}/__fixtures__/file4.yaml`;

  expect(compare(file1, file4)).toEqual(expectedFlatFile);
});
