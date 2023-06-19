import json from './json.js';
import plain from './plain.js';
import stylish from './stylish.js';

const formatSelection = (format, obj) => {
  if (format === 'plain') {
    return plain(obj);
  }
  if (format === 'stylish') {
    return stylish(obj);
  }
  if (format === 'json') {
    return json(obj);
  }
  return 'sorry, but I can use only stylish, plain and json format';
};

export default formatSelection;
