const year = process.argv[2];
const day = process.argv[3];

const { part1, part2 } = await import(`./src/${year}/days/day${day}.js`);

console.log(`${year} Day ${day}\n`);
const inputFile = `day/${day}.input`;
console.log(`Part 1: ${part1(inputFile)}`);
console.log(`Part 2: ${part2(inputFile)}`);