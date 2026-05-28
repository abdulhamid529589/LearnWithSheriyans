// process.stdout.write('* ')
// process.stdout.write('* ')
// console.log() // ← go to next line
// process.stdout.write('* ')
// Output:
// * *
// *

let prompt = require('prompt-sync')()

let number = Number(prompt('Enter a number: '))

for (let i = 1; i <= number; i++) {
  for (let j = 1; j <= number; j++) {
    process.stdout.write('* ')
  }
  console.log()
}
console.log()
