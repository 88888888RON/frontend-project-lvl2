#!/usr/bin/env node

import { Command } from 'commander';
import { compare } from '../src/compare.js';

const program = new Command();

program
  .name('gendiff')
  .version('0.0.1', '-v, --vers', 'output the current version')
  .description('Compare two configuration files and shows a difference')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((file1, file2) => {
    const options = program.opts();
    console.log(compare(file1, file2, options));
  })
  .parse(process.argv);
