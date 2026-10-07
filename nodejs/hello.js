const fs = require('fs');

fs.readFile('hello.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
});

console.log("Finished reading file");

const data = fs.readFileSync('hello.txt', 'utf8');
console.log(data);

console.log("Finished reading file synchronously");



console.log("Hello");