const stylish = (obj) => {
  const indentCountperLevel = 4;
  const indent = ' ';
  const iter = (currentValue, deth) => {
    if (Object.prototype.toString.call(currentValue) !== '[object Object]') {
      return `${currentValue}`;
    }

    const currentIndent = indent.repeat(indentCountperLevel * deth - 2);
    const bracketIndent = indent.repeat(indentCountperLevel * deth - 4);
    const lines = Object
      .entries(currentValue)
      .map(([key, value]) => {
        if (value.type === 'object') {
          return `${currentIndent}  ${key}: ${iter(value.children, deth + 1)}`;
        }
        if (value.type === 'added') {
          return `${currentIndent}+ ${key}: ${iter(value.value2, deth + 1)}`;
        }
        if (value.type === 'removed') {
          return `${currentIndent}- ${key}: ${iter(value.value1, deth + 1)}`;
        }
        if (value.type === 'unchanged') {
          return `${currentIndent}  ${key}: ${iter(value.value1, deth + 1)}`;
        }
        if (value.type === 'changed') {
          return `${currentIndent}- ${key}: ${iter(value.value1, deth + 1)}\n${currentIndent}+ ${key}: ${iter(value.value2, deth + 1)}`;
        }
        return `${currentIndent}  ${key}: ${iter(value, deth + 1)}`;
      });

    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };
  return iter(obj, 1);
};

export default stylish;
