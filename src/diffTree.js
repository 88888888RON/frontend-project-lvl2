import _ from 'lodash';
import * as fs from 'node:fs';
import path from 'node:path';
import parse from './parsers.js';

const getFixturePath = (file) => path.resolve(file);
const readFile = (file) => fs.readFileSync(getFixturePath(file), 'utf-8');
const getExtension = (file) => path.extname(file);

const getDiff = (fileName1, fileName2) => {
  const readFile1 = readFile(fileName1);
  const readFile2 = readFile(fileName2);
  const ext1 = getExtension(fileName1);
  const ext2 = getExtension(fileName2);
  const obj1 = parse(readFile1, ext1);
  const obj2 = parse(readFile2, ext2);

  const iter = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const sortedUnionKeys = _.sortBy(_.union(keys1, keys2));
    const res = sortedUnionKeys.reduce((acc, key) => {
      if (!obj1.hasOwnProperty(key)) {
        return { ...acc, [key]: { type: 'added', value2: obj2[key] } };
      }
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
  return iter(obj1, obj2);
};

export { getDiff, getExtension };
