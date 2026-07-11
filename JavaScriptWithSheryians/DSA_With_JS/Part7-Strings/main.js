// Problem 1 — Print Each Character on a New Line

// let myName = 'Abdul Hamid'

// for (let i = 0; i < myName.length; i++) {
//   //   console.log(myName[i])
//   console.log(myName.charAt(i))
// }

// reverse
// for (let i = myName.length - 1; i >= 0; i--) {
//   console.log(myName.charAt(i))
// }

// ~~~~~~~~~~~~~~~~~~~~~~~ || ~~~~~~~~~~~~~~~~~~~~~~~

// Problem 2 — Print String in Reverse Order (as a single reversed string)
// let myName = 'Abdul Hamid'
// let reverse = ''
// for (let i = myName.length - 1; i >= 0; i--) {
//   reverse = reverse + myName.charAt(i)
// }
// console.log(reverse)

// ~~~~~~~~~~~~~~~~~~~~~~~ || ~~~~~~~~~~~~~~~~~~~~~~~

// Problem 3 — Check if String is a Palindrome
// let myName = 'madam'
// let reverse = ''
// for (let i = myName.length - 1; i >= 0; i--) {
//   reverse = reverse + myName.charAt(i)
// }
// if (reverse == myName) console.log('pallindrome')
// else console.log('no pallindrome')
// console.log(reverse)

// Approach 2 — Two Pointer Algorithm (Optimal ✅)
// let myName = prompt('Enter a String: ')
let myName = 'madam'
let i = 0,
  j = myName.length - 1
isPallindrome = true
while (i < j) {
  if (myName.charAt(i) != myName.charAt(j)) {
    isPallindrome = false
    break
  }
  i++
  j--
}
if (isPallindrome) console.log('pallindrome')
else console.log('no pallindrome')
