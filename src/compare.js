import _ from 'lodash';
import path from 'node:path';
import * as fs from 'node:fs';
import parse from './parsers.js';

const getFixturePath = (file) => path.resolve(file);
const readFile = (file) => fs.readFileSync(getFixturePath(file), 'utf-8');
const getExtension = (file) => {
  const ext = path.extname(file);
  return ext;
};

const compareFlatJson = (fileName1, fileName2) => {
  const readFile1 = readFile(fileName1);
  const readFile2 = readFile(fileName2);
  const ext1 = getExtension(fileName1);
  const ext2 = getExtension(fileName2);
  const obj1 = parse(readFile1, ext1);
  console.log(obj1);
  const obj2 = parse(readFile2, ext2);
  console.log(obj2);
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const unionKeys = _.union(keys1, keys2);
  const sortedUnionKeys = _.sortBy(unionKeys);

  const object = sortedUnionKeys.reduce((obj, key) => {
    if (!Object.hasOwn(obj2, key)) {
      return { ...obj, [`- ${key}`]: obj1[key] };
    }
    if (!Object.hasOwn(obj1, key)) {
      return { ...obj, [`+ ${key}`]: obj2[key] };
    }
    if (obj1[key] === obj2[key]) {
      return { ...obj, [`  ${key}`]: obj1[key] };
    }
    if (obj1[key] !== obj2[key]) {
      return { ...obj, [`- ${key}`]: obj1[key], [`+ ${key}`]: obj2[key] };
    }
    return obj;
  }, {});

  return object;
};

const objToString = (obj) => {
  const str = JSON.stringify(obj)
    .slice(1, -1) // убираю скобки
    .split(',') // из строки массив, разделитель - запятая
    .map((el) => el.split(':')) // каждый элемент массива разделяю на массив, разделитель - двоеточие (массив массивов получился)
    .map(([el0, el1]) => { // каждый элемент массива (это маленький массив
      if (el0.startsWith('"')) { // ) распаковываю и отображаю по условию, есть кавычки в начале или нет?
        el0 = el0.slice(1, -1); // если да, то убираю по символу с начала и конца (кавычки)
      }
      if (el1.startsWith('"')) {
        el1 = el1.slice(1, -1);
      }
      return `${el0}: ${el1}`;
    }); // собираю ответ
  const res = `{\n  ${str.join('\n  ')}\n}`; // из массива делаю строку, соединяя элементы переносом строки.
  return res; // В начало и в конец ставлю { и }, после 1ой делаю перенос строки.
}; //  Вывод напоминает объект, но им не является.

const compare = (file1, file2) => objToString(compareFlatJson(file1, file2));

export {
  compare, compareFlatJson, objToString, getExtension,
};
