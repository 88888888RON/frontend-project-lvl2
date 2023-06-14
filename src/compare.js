import _ from 'lodash';
import path from 'node:path';
import * as fs from 'node:fs';
import parse from './parsers.js';
import stylish from './formatters/stylish.js';

const getFixturePath = (file) => path.resolve(file);
const readFile = (file) => fs.readFileSync(getFixturePath(file), 'utf-8');
const getExtension = (file) => {
  const ext = path.extname(file);
  return ext;
};

const getDiff = (fileName1, fileName2) => {
  const readFile1 = readFile(fileName1);
  const readFile2 = readFile(fileName2);
  const ext1 = getExtension(fileName1);
  const ext2 = getExtension(fileName2);
  const obj1 = parse(readFile1, ext1);
  // console.log(`obj1 = ${JSON.stringify(obj1, null, ' ')}`);
  const obj2 = parse(readFile2, ext2);
  // console.log(`obj2 = ${JSON.stringify(obj1, null, ' ')}`);

  // eslint-disable-next-line no-shadow
  const iter = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const unionKeys = _.union(keys1, keys2);
    const sortedUnionKeys = _.sortBy(unionKeys);

    const res = sortedUnionKeys.reduce((acc, key) => {
      // eslint-disable-next-line no-prototype-builtins
      if (!obj1.hasOwnProperty(key)) {
        return { ...acc, [key]: { type: 'added', value2: obj2[key] } };
      }
      // eslint-disable-next-line no-prototype-builtins
      if (!obj2.hasOwnProperty(key)) {
        return { ...acc, [key]: { type: 'removed', value1: obj1[key] } };
      }
      if (Object.prototype.toString.call(obj1[key]) === '[object Object]' && Object.prototype.toString.call(obj2[key]) === '[object Object]') {
        return { ...acc, [key]: { type: 'object', children: iter(obj1[key], obj2[key]) } };
      }
      if (obj1[key] === obj2[key]) {
        return { ...acc, [key]: { type: 'unchanged', value1: obj1[key] } };
      }
      return { ...acc, [key]: { type: 'changed', value1: obj1[key], value2: obj2[key] } };
    }, {});

    return res;
  };

  // console.log(`getDiff(obj1, obj2) = ${JSON.stringify(iter(obj1, obj2), 2, '    ')}`);
  return iter(obj1, obj2);
};

const compare = (file1, file2, format) => {
  if (format === 'stylish') {
    return stylish(getDiff(file1, file2));
  }
  return stylish(getDiff(file1, file2));
};

export {
  compare, getExtension,
};
