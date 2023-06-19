import path from 'node:path';

const plain = (obj) => {
  const str = (value) => {
    if (Object.prototype.toString.call(value) === '[object Object]') {
      return '[complex value]';
    }
    if (Object.prototype.toString.call(value) === '[object Boolean]' || Object.prototype.toString.call(value) === '[object Null]') {
      return value;
    }
    return `'${value}'`;
  };

  const iter = (current, fullName) => {
    const lines = Object
      .entries(current)
      .map(([key, value]) => {
        const newName = path.join(fullName, key).split('/').join('.');
        if (value.type === 'object') {
          return iter(value.children, newName);
        }
        if (value.type === 'removed') {
          return `Property '${newName}' was removed`;
        }
        if (value.type === 'added') {
          return `Property '${newName}' was added with value: ${str(value.value2)}`;
        }
        if (value.type === 'changed') {
          return `Property '${newName}' was updated. From ${str(value.value1)} to ${str(value.value2)}`;
        }
        return '';
      })
      .filter((el) => el !== '');

    return [...lines].join('\n');
  };

  return iter(obj, '');
};

export default plain;
