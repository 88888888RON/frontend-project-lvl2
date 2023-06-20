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
        switch (value.type) {
          case 'object':
            return iter(value.children, newName);
          case 'removed':
            return `Property '${newName}' was removed`;
          case 'added':
            return `Property '${newName}' was added with value: ${str(value.value2)}`;
          case 'changed':
            return `Property '${newName}' was updated. From ${str(value.value1)} to ${str(value.value2)}`;
          default:
            return '';
        }
      })
      .filter((el) => el !== '');
    return [...lines].join('\n');
  };
  return iter(obj, '');
};

export default plain;
