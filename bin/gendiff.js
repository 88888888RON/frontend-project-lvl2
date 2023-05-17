#!/usr/bin/env node

import { objToString } from '../src/compare.js';
import { Command } from 'commander';
const program = new Command();

program
    .name('gendiff')
    .version('output the version number')
    .description('Compare two configuration files and shows a difference')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .option('-f, --format <type>', 'output format')
    .action((file1, file2) => {
        console.log(objToString(file1, file2));
    })
    .parse();
