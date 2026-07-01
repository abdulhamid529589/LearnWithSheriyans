// let prompt = require('prompt-sync')()

// Valid but infinite

// for (let i = 0; i <= 10; ) {
//   console.log(i)
// }

// for (;;) {
//   console.log('hello')
// }

// for (let i = 0; ; ) {
//   console.log('Hi')
// }

//  ~~~~~~~~~~~~~~~~~~~*******~~~~~~~~~~~~~~~~~~~
//  ~~~~~~~~~~~~~~~~~~~*******~~~~~~~~~~~~~~~~~~~

// Problem No 1 - Sum of n natural numbers

// let pr = prompt('Enter your number: ') // user will give a number for adding n natural numbers

// // console.log(prompt('Enter your number: ')) // if we cancel any prompt the ans will be null
// if (pr === null) {
//   console.log('Cancelled')
// } else {
//   var ans = Number(pr)
//   if (isNaN(ans)) {
//     console.log('Invalid input')
//   } else {
//     if (ans > 0) {
//       var sum = 0
//       for (var i = 1; i <= ans; i++) {
//         sum += i
//       }
//       console.log(sum)
//     } else {
//       console.log('Should be +ve and more that 0')
//     }
//   }
// }

//  ~~~~~~~~~~~~~~~~~~~*******~~~~~~~~~~~~~~~~~~~
//  ~~~~~~~~~~~~~~~~~~~*******~~~~~~~~~~~~~~~~~~~

// Problem No 2 - Factorial numbers

// let pr = prompt('Enter your number: ') // user will give a number for adding n natural numbers

// // console.log(prompt('Enter your number: ')) // if we cancel any prompt the ans will be null
// if (pr === null) {
//   console.log('Cancelled')
// } else {
//   var ans = Number(pr)
//   if (isNaN(ans)) {
//     console.log('Invalid input')
//   } else {
//     if (ans > 0) {
//       var factorial = 1
//       for (var i = 1; i <= ans; i++) {
//         factorial *= i
//       }
//       console.log(factorial)
//     } else {
//       console.log('Should be +ve and more that 0')
//     }
//   }
// }

//  ~~~~~~~~~~~~~~~~~~~*******~~~~~~~~~~~~~~~~~~~
//  ~~~~~~~~~~~~~~~~~~~*******~~~~~~~~~~~~~~~~~~~

// Problem No 3 - Factors of numbers

// let pr = prompt('Enter your number: ') // user will give a number for adding n natural numbers

// // console.log(prompt('Enter your number: ')) // if we cancel any prompt the ans will be null
// if (pr === null) {
//   console.log('Cancelled')
// } else {
//   var ans = Number(pr)
//   if (isNaN(ans)) {
//     console.log('Invalid input')
//   } else {
//     if (ans > 0) {
//       for (var i = 1; i <= Math.floor(ans / 2); i++) {
//         if (ans % i === 0) {
//           console.log(i)
//         }
//       }
//       console.log(ans)
//     } else {
//       console.log('Should be +ve and more that 0')
//     }
//   }
// }

//  ~~~~~~~~~~~~~~~~~~~*******~~~~~~~~~~~~~~~~~~~
//  ~~~~~~~~~~~~~~~~~~~*******~~~~~~~~~~~~~~~~~~~

// Problem No 3 - Prime Number

// let pr = prompt('Enter your number: ') // user will give a number for adding n natural numbers

// // console.log(prompt('Enter your number: ')) // if we cancel any prompt the ans will be null
// if (pr === null) {
//   console.log('Cancelled')
// } else {
//   var ans = Number(pr)
//   if (isNaN(ans)) {
//     console.log('Invalid input')
//   } else {
//     if (ans > 0) {
//       // var primeNumber = true
//       // for (var i = 2; i <= Math.floor(ans / 2); i++) {
//       //   if (ans % i === 0) {
//       //     primeNumber = false
//       //     break
//       //   }
//       // }
//       // console.log(primeNumber)

//       console.log(isPrime(ans))
//     } else {
//       console.log('Should be +ve and more that 0')
//     }
//   }
// }

// // With Best Approach for this problem
// function isPrime(ans) {
//   if (ans <= 1) return false
//   if (ans === 2) return true
//   if (ans % 2 === 0) false
//   for (let i = 3; i <= Math.floor(Math.sqrt(ans)); i += 2) {
//     if (ans % i == 0) {
//       return false
//     }
//   }
//   return true
// }

//  ~~~~~~~~~~~~~~~~~~~*******~~~~~~~~~~~~~~~~~~~
//  ~~~~~~~~~~~~~~~~~~~*******~~~~~~~~~~~~~~~~~~~

// Problem No 4 - Sum of Digit

// let pr = prompt('Enter your number: ') // user will give a number for adding n natural numbers

// // console.log(prompt('Enter your number: ')) // if we cancel any prompt the ans will be null
// if (pr === null) {
//   console.log('Cancelled')
// } else {
//   var ans = Number(pr)
//   if (isNaN(ans)) {
//     console.log('Invalid input')
//   } else {
//     if (ans > 0) {
//       var sum = 0
//       while (ans > 0) {
//         var rem = ans % 10
//         sum = sum + rem
//         ans = Math.floor(ans / 10)
//       }
//       console.log(sum)
//     } else {
//       console.log('Should be +ve and more that 0')
//     }
//   }
// }

//  ~~~~~~~~~~~~~~~~~~~*******~~~~~~~~~~~~~~~~~~~
//  ~~~~~~~~~~~~~~~~~~~*******~~~~~~~~~~~~~~~~~~~

// Problem No 5 - reverse of number

// let pr = prompt('Enter your number: ') // user will give a number for adding n natural numbers

// // console.log(prompt('Enter your number: ')) // if we cancel any prompt the ans will be null
// if (pr === null) {
//   console.log('Cancelled')
// } else {
//   var ans = Number(pr)
//   if (isNaN(ans)) {
//     console.log('Invalid input')
//   } else {
//     if (ans > 0) {
//       var reverse = 0
//       while (ans > 0) {
//         var remainder = ans % 10
//         reverse = reverse * 10 + remainder
//         ans = Math.floor(ans / 10)
//       }
//       console.log(reverse)
//     } else {
//       console.log('Should be +ve and more that 0')
//     }
//   }
// }

//  ~~~~~~~~~~~~~~~~~~~*******~~~~~~~~~~~~~~~~~~~
// //  ~~~~~~~~~~~~~~~~~~~*******~~~~~~~~~~~~~~~~~~~

// // Problem No 6 - Strong Number

// let pr = prompt('Enter your number: ') // user will give a number for adding n natural numbers

// // console.log(prompt('Enter your number: ')) // if we cancel any prompt the ans will be null
// if (pr === null) {
//   console.log('Cancelled')
// } else {
//   var userInp = Number(pr)
//   if (isNaN(userInp)) {
//     console.log('Invalid input')
//   } else {
//     if (userInp > 0) {
//       var sum = 0
//       var copy = userInp
//       while (userInp > 0) {
//         var rem = userInp % 10
//         var fact = 1
//         for (var i = 1; i <= rem; i++) {
//           fact *= i
//         }
//         sum = sum + fact
//         userInp = Math.floor(userInp / 10)
//       }
//       if (copy === sum) {
//         console.log('Strong')
//       } else {
//         console.log('Not Strong')
//       }
//     } else {
//       console.log('Should be +ve and more that 0')
//     }
//   }
// }

// //  ~~~~~~~~~~~~~~~~~~~*******~~~~~~~~~~~~~~~~~~~
// //  ~~~~~~~~~~~~~~~~~~~*******~~~~~~~~~~~~~~~~~~~

// 7. Problem: Guess the Number Game

let random = Math.floor(Math.random() * 100) + 1

// console.log(random)

let guess = 0

// let attempts = 0

while (guess !== random) {
  guess = Number(prompt('Guess the number between 1-100: '))
  if (isNaN(guess) || guess < 1 || guess > 100) {
    console.log('Try again b/w 1 - 100')
    continue
  }
  //   if (attempts < 5) {
  //     attempts++
  //   } else {
  //     console.log('Gave over')
  //   }
  if (guess > random) {
    console.log('too high , try again')
  } else if (guess < random) {
    console.log('too low, try again')
  } else {
    console.log('Congrats and number was: ', guess)
  }
}

// //  ~~~~~~~~~~~~~~~~~~~*******~~~~~~~~~~~~~~~~~~~
