import fs from 'fs';
const year = process.argv[2];
const day = process.argv[3];

fs.writeFileSync(`./src/${year}/days/day${day}.js`, 'createday');
fs.writeFileSync(`./src/${year}/__tests__/day${day}Test.js`, 'createtest');
fs.writeFileSync(`./src/${year}/inputs/day/${day}.input`, '');
fs.writeFileSync(`./src/${year}/inputs/test/${day}.input`, '');

console.log(`Created files for ${year} day ${day}`);