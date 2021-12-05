const year = process.argv[2];
const day = process.argv[3];
const time = process.argv[4];

const { part1, part2 } = await import(`./src/${year}/days/day${day}.js`);

console.log(`${year} Day ${day}\n`);
const inputFile = `day/${day}.input`;
if (time != 'time') {
  console.log(`Part 1: ${part1(inputFile)}`);
  console.log(`Part 2: ${part2(inputFile)}`);
} else {
  [part1, part2].forEach((fn, i) => {
    const startTime = performance.now();
    let count = 0;
    while (performance.now() - startTime < 5000) {
      fn(inputFile);
      count++;
    }
    console.log(`Part ${i+1}: ${((performance.now() - startTime)/count).toFixed(2)}ms`);
  });
}