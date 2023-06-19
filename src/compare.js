import { getDiff } from './diffTree.js';
import formatSelection from './formatters/index.js';

const compare = (file1, file2, format) => formatSelection(format, getDiff(file1, file2));

export default compare;
