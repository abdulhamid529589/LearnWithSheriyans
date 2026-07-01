//  Practice No 1
// let ans = Number(prompt('What is your age? '))
// if (isNaN(ans)) {
//   console.log('Invalid input')
// } else if (ans >= 18) {
//   console.log('You can vote')
// } else {
//   console.log('You can not vote')
// }

//  ~~~~~~~~~~~~~~~~~~~*******~~~~~~~~~~~~~~~~~~~

// Practice No 2 (Shop Discount final amount) - This is not efficient code, but it is just for practice purpose
// let amount = Number(prompt('What is the final amount? '))

// if (amount > 0 && amount <= 7000) {
//   console.log(amount)
// } else if (amount > 7000 && amount <= 9000) {
//   console.log('5% Discount')
//   console.log(amount - Math.floor((5 * amount) / 100))
// } else if (amount > 9000 && amount <= 10000) {
//   console.log('10% Discount')
//   console.log(amount - Math.floor((10 * amount) / 100))
// } else if (amount > 10000) {
//   console.log('15% Discount')
//   console.log(amount - Math.floor((15 * amount) / 100))
// } else {
//   console.log('Invalid input')
// }

// Now let's do the same thing with efficiency
// let amount = Number(prompt('What is the final amount? '))

// let discount = 0

// if (amount > 0 && amount <= 7000) {
//   discount = 0
// } else if (amount > 7000 && amount <= 9000) {
//   discount = 5
// } else if (amount > 9000 && amount <= 10000) {
//   discount = 10
// } else if (amount > 10000) {
//   discount = 15
// } else {
//   console.log('Invalid input')
// }

// console.log(amount - Math.floor((discount * amount) / 100))

// explaination of the above code - We are first taking the input from the user and then we are checking the amount and based on the amount we are calculating the discount and then we are calculating the final amount by subtracting the discount from the original amount. This way we are avoiding the repetition of code and making it more efficient.

//  ~~~~~~~~~~~~~~~~~~~*******~~~~~~~~~~~~~~~~~~~

// Practice No 3 (Bijli Bill)

// let units = Number(prompt('Enter the number of units consumed: '))
// let billAmount = 0

// if (units > 400) {
//   billAmount = (units - 400) * 13
//   units = 400
// }
// if (units > 200 && units <= 400) {
//   billAmount += (units - 200) * 8
//   units = 200
// }
// if (units > 100 && units <= 200) {
//   billAmount += (units - 100) * 6
//   units = 100
// }
// if (units > 0 && units <= 100) {
//   billAmount += units * 4
// }

// console.log('Total Bill Amount: ' + billAmount)

// explaination of the above code - We are first taking the input from the user and then we are checking the units consumed and based on the units consumed we are calculating the bill amount. We are using if statements to check the units consumed and then we are calculating the bill amount accordingly. We are also updating the units variable to avoid repetition of code and to make it more efficient.

//  ~~~~~~~~~~~~~~~~~~~*******~~~~~~~~~~~~~~~~~~~

// Practice No 4 (INR Denominations)

// let amount = 6324
// if (amount >= 1000) {
//   console.log('1000 notes: ' + Math.floor(amount / 1000))
//   amount = amount % 1000
// }
// if (amount >= 200) {
//   console.log('200 notes: ' + Math.floor(amount / 200))
//   amount = amount % 200
// }
// if (amount >= 100) {
//   console.log('100 notes: ' + Math.floor(amount / 100))
//   amount = amount % 100
// }
// if (amount >= 50) {
//   console.log('50 notes: ' + Math.floor(amount / 50))
//   amount = amount % 50
// }
// if (amount >= 20) {
//   console.log('20 notes: ' + Math.floor(amount / 20))
//   amount = amount % 20
// }
// if (amount >= 5) {
//   console.log('5 notes: ' + Math.floor(amount / 5))
//   amount = amount % 5
// }
// if (amount >= 2) {
//   console.log('2 notes: ' + Math.floor(amount / 2))
//   amount = amount % 2
// }
// if (amount === 1) {
//   console.log('1 notes: ' + amount)
// }

// console.log(amount)

//  ~~~~~~~~~~~~~~~~~~~*******~~~~~~~~~~~~~~~~~~~

// Practice No 5 - Nested ternary operator
// let num = 0
// console.log(num > 0 ? 'positive' : num < 0 ? 'negative' : 'zero')

//  ~~~~~~~~~~~~~~~~~~~*******~~~~~~~~~~~~~~~~~~~

// switch (true) {
//   case 19 > 6:
//     console.log('Hello')
//     break
//   case 10 > 9:
//     console.log('Hey')
//     break
//   default:
//     console.log('Invalid')
// }

let num = 0.1 + 0.2
switch (num) {
  case 0.3:
    console.log('Hello')
    break
  case 0.5:
    console.log('Hey')
    break
  default:
    console.log('HI')
}
