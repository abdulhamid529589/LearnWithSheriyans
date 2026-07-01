// let arr = new Array(5)

// for (let i = 0; i < arr.length; i++) {
//   arr[i] = Number(prompt('Enter your Value: '))
// }
// console.log(arr)

// Sum of n element in array

// let arr = [10, 20, 30, 40, 50]
// let sum = 0
// for (let i = 0; i < arr.length; i++) {
//   sum = sum + arr[i]
// }
// console.log(sum)

// Find Maximum Element in an Array

// let arr = [10, 34, 45, 56, 6723, 453]
// let max = arr[0]
// for (let i = 1; i < arr.length; i++) {
//   if (max < arr[i]) {
//     max = arr[i]
//   }
// }
// console.log(max)

// Find Second Maximum Element in an Array

// let arr = [23, 34, 45, 5623, 3423, 4, 556, 3, 42, 2, 345]

// let max = Math.max(arr[0], arr[1]) //34
// let secondMax = Math.min(arr[0], arr[1]) // 23

// for (let i = 2; i < arr.length; i++) {
//   if (arr[i] > max) {
//     secondMax = max
//     max = arr[i]
//   } else if (arr[i] > secondMax && max != arr[i]) {
//     secondMax = arr[i]
//   }
// }
// console.log(secondMax)

//Reverse an Array (Not Recommended)

// let arr = [12, 23, 34, 45, 56, 6734, 23, 45, 34]
// let temp = new Array(arr.length)

// let j = 0
// for (let i = arr.length - 1; i >= 0; i--) {
//   temp[j] = arr[i]
//   j++
// }
// console.log(temp)

// Recommended way
// let arr = [12, 34, 45, 56, 67, 78, 89]

// let i = 0,
//   j = arr.length - 1

// while (i != j) {
//   let temp = arr[i]
//   arr[i] = arr[j]
//   arr[j] = temp
//   i++
//   j--
// }

// console.log(arr)

let arr = [1, 1, 0, 1, 0, 1, 1, 0]

let i = 0,
  j = 0
while (i < arr.length) {
  if (arr[i] === 0) {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
    j++
  }
  i++
}
