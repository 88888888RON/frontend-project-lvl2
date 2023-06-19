import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import * as fs from 'node:fs';
import compare from '../src/compare.js';
import { getExtension } from '../src/diffTree.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePathRecursive = (filename) => path.join(__dirname, '..', '__fixtures__', 'recursiveFiles', filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf-8');
const readRecursiveFile = (fileName) => fs.readFileSync(getFixturePathRecursive(fileName), 'utf-8');
const expectedFlatFile = readFile('expectedFile.txt');
const expectedRecursiveFileStylish = readRecursiveFile('testStylish.txt');
const expectedRecursiveFileFlat = readRecursiveFile('testPlain.txt');
const expectedRecursiveFileJson = readRecursiveFile('testJson.txt');

test('getExtension', () => {
  expect(getExtension('file.json')).toEqual('.json');
  expect(getExtension('file.yml')).toEqual('.yml');
  expect(getExtension('file.yaml')).toEqual('.yaml');
});

test('stylishRecJsonJson', () => {
  const fileName1 = `${process.cwd()}/__fixtures__/recursiveFiles/file1.json`;
  const fileName2 = `${process.cwd()}/__fixtures__/recursiveFiles/file2.json`;

  expect(compare(fileName1, fileName2, 'stylish')).toEqual(expectedRecursiveFileStylish);
});

test('stylishRecYmlYml', () => {
  const file3 = `${process.cwd()}/__fixtures__/recursiveFiles/file3.yml`;
  const file4 = `${process.cwd()}/__fixtures__/recursiveFiles/file4.yaml`;

  expect(compare(file3, file4, 'stylish')).toEqual(expectedRecursiveFileStylish);
});

test('stylishRecYmlJson', () => {
  const file1 = `${process.cwd()}/__fixtures__/recursiveFiles/file1.json`;
  const file4 = `${process.cwd()}/__fixtures__/recursiveFiles/file4.yaml`;

  expect(compare(file1, file4, 'stylish')).toEqual(expectedRecursiveFileStylish);
});

test('StylishFlatJson', () => {
  const fileName1 = `${process.cwd()}/__fixtures__/file1.json`;
  const fileName2 = `${process.cwd()}/__fixtures__/file2.json`;

  expect(compare(fileName1, fileName2, 'stylish')).toEqual(expectedFlatFile);
});

test('StylishFlatYml', () => {
  const file3 = `${process.cwd()}/__fixtures__/file3.yml`;
  const file4 = `${process.cwd()}/__fixtures__/file4.yaml`;

  expect(compare(file3, file4, 'stylish')).toEqual(expectedFlatFile);
});

test('StylishFlatYmlJson', () => {
  const file1 = `${process.cwd()}/__fixtures__/file1.json`;
  const file4 = `${process.cwd()}/__fixtures__/file4.yaml`;

  expect(compare(file1, file4, 'stylish')).toEqual(expectedFlatFile);
});

test('PlainRecJsonJson', () => {
  const fileName1 = `${process.cwd()}/__fixtures__/recursiveFiles/file1.json`;
  const fileName2 = `${process.cwd()}/__fixtures__/recursiveFiles/file2.json`;

  expect(compare(fileName1, fileName2, 'plain')).toEqual(expectedRecursiveFileFlat);
});

test('PlainRecYmlYml', () => {
  const file3 = `${process.cwd()}/__fixtures__/recursiveFiles/file3.yml`;
  const file4 = `${process.cwd()}/__fixtures__/recursiveFiles/file4.yaml`;

  expect(compare(file3, file4, 'plain')).toEqual(expectedRecursiveFileFlat);
});

test('PlainRecYmlJson', () => {
  const file1 = `${process.cwd()}/__fixtures__/recursiveFiles/file1.json`;
  const file4 = `${process.cwd()}/__fixtures__/recursiveFiles/file4.yaml`;

  expect(compare(file1, file4, 'plain')).toEqual(expectedRecursiveFileFlat);
});

test('JsonRecJsonJson', () => {
  const fileName1 = `${process.cwd()}/__fixtures__/recursiveFiles/file1.json`;
  const fileName2 = `${process.cwd()}/__fixtures__/recursiveFiles/file2.json`;

  expect(compare(fileName1, fileName2, 'json')).toEqual(expectedRecursiveFileJson);
});

test('JsonRecYmlYml', () => {
  const file3 = `${process.cwd()}/__fixtures__/recursiveFiles/file3.yml`;
  const file4 = `${process.cwd()}/__fixtures__/recursiveFiles/file4.yaml`;

  expect(compare(file3, file4, 'json')).toEqual(expectedRecursiveFileJson);
});

test('JsonRecYmlJson', () => {
  const file1 = `${process.cwd()}/__fixtures__/recursiveFiles/file1.json`;
  const file4 = `${process.cwd()}/__fixtures__/recursiveFiles/file4.yaml`;

  expect(compare(file1, file4, 'json')).toEqual(expectedRecursiveFileJson);
});

test('sorry', () => {
  const file3 = `${process.cwd()}/__fixtures__/recursiveFiles/testJson.txt`;
  const file4 = `${process.cwd()}/__fixtures__/recursiveFiles/file4.yaml`;

  expect(compare(file3, file4, 'unknown format')).toEqual('sorry, but I can use only stylish, plain and json format');
});
