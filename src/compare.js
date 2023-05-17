import _ from 'lodash';
import path from 'node:path';
import * as fs from 'node:fs';

const compare = (fileName1, fileName2) => {
    const obj1 = JSON.parse(fs.readFileSync(path.resolve(fileName1)));
    const obj2 = JSON.parse(fs.readFileSync(path.resolve(fileName2)));
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const unionKeys = _.union(keys1, keys2);
    const sortedUnionKeys = _.sortBy(unionKeys)
    const resObj = {};
  
    for (const key of sortedUnionKeys) {
      if (!Object.hasOwn(obj2, key)) {
        resObj[`- ${key}`] = obj1[key];
      } else if (!Object.hasOwn(obj1, key)) {
        resObj[`+ ${key}`] = obj2[key];
      } else if (obj1[key] === obj2[key]) {
        resObj[`  ${key}`] = obj1[key];
      } else if (obj1[key] !== obj2[key]) {
        resObj[`- ${key}`] = obj1[key];
        resObj[`+ ${key}`] = obj2[key];
      }
    }
  
    return resObj;
};

const objToString = (fileName1, fileName2) => {
  const obj = compare(fileName1, fileName2);
  const strFromObjWOИBrackets = JSON.stringify(obj).slice(1, -1);
  const arrFromStr = strFromObjWOИBrackets.split(',');
  const str = arrFromStr
    .map(el => el.split(':'))
    .map(([el0, el1]) => {
      if (el0.startsWith('"')) {
        el0 = el0.slice(1, -1);
      };
      if (el1.startsWith('"')) {
        el1 = el1.slice(1, -1);
      };
      return`${el0}: ${el1}`});
  const res = `{\n  ${str.join('\n  ')}\n}`
  return res;
};

export { objToString };
