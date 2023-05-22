import _ from 'lodash';
import path from 'node:path';
import * as fs from 'node:fs';

const getFixturePath = (file) => path.resolve(file);
const readFile = (file) => fs.readFileSync(getFixturePath(file), 'utf-8');

const compareFlatJson = (fileName1, fileName2) => {
  const obj1 = JSON.parse(readFile(fileName1));
  const obj2 = JSON.parse(readFile(fileName2));
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const unionKeys = _.union(keys1, keys2);
  const sortedUnionKeys = _.sortBy(unionKeys);
  const obj = {};

  for (const key of sortedUnionKeys) {
    if (!Object.hasOwn(obj2, key)) {
      obj[`- ${key}`] = obj1[key];
    } else if (!Object.hasOwn(obj1, key)) {
      obj[`+ ${key}`] = obj2[key];
    } else if (obj1[key] === obj2[key]) {
      obj[`  ${key}`] = obj1[key];
    } else if (obj1[key] !== obj2[key]) {
      obj[`- ${key}`] = obj1[key];
      obj[`+ ${key}`] = obj2[key];
    }
  }

  return obj;
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

const getExtension = (file) => {
  const result = file
    .split('.')
    .pop();
  // console.log(result);
  return result;
};

const compare = (file1, file2) => {
  if ((getExtension(file1) === getExtension(file2)) && (getExtension(file1) === 'json')) {
    // console.log(`равенство выполнилось`);
    return objToString(compareFlatJson(file1, file2));
  }
  return 'error';
};

export {
  compare, compareFlatJson, getExtension, objToString,
};
