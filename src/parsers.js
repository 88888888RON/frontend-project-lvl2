import yaml from 'js-yaml';

const parse = (file, ext) => {
  if (ext === '.json') {
    // console.log(JSON.parse(file));
    return JSON.parse(file);
  }
  if (ext === '.yml' || ext === '.yaml') {
    // console.log(yaml.load(file));
    return yaml.load(file);
  }
  if (file === '.txt') {
    return file;
  }
  return 'unknown format';
};

export default parse;
