// Left Rotation by One Element
// let arr = [1, 2, 3, 4, 5]

// let copy = arr[0]
// for (let i = 0; i < arr.length - 1; i++) {
//   arr[i] = arr[i + 1]
// }

// arr[arr.length - 1] = copy

// console.log(arr)

// ~~~~~~~~~~~~~~~~~~~~~~~ || ~~~~~~~~~~~~~~~~~~~~~~~

// Right Rotation by One Element
// let arr = [1, 2, 3, 4, 5]

// let copy = arr[arr.length - 1]
// for (let i = arr.length - 1; i > 0; i--) {
//   arr[i] = arr[i - 1]
// }
// arr[0] = copy

// console.log(arr)

// ~~~~~~~~~~~~~~~~~~~~~~~ || ~~~~~~~~~~~~~~~~~~~~~~~

// Left Rotation by K Elements (Brute Force — O(n²))
// let arr = [1, 2, 3, 4, 5]
// let k = Number(prompt('Enter k value'))
// k = k % arr.length
// let count = 0
// for (let j = 0; j < k; j++) {
//   count++
//   let copy = arr[0]
//   for (let i = 0; i < arr.length - 1; i++) {
//     arr[i] = arr[i + 1]
//   }
//   arr[arr.length - 1] = copy
// }

// console.log(arr)
// console.log(count)

// ~~~~~~~~~~~~~~~~~~~~~~~ || ~~~~~~~~~~~~~~~~~~~~~~~

// Left Rotation by K Elements (Efficient — O(n), With Extra Space)

let arr = [1, 2, 3, 4, 5]

let temp = new Array(arr.length)
let k = Number(prompt('Enter k value: '))
k = k % arr.length
let count = 0

for (let i = 0; i < arr.length; i++) {
  count++
  temp[i] = arr[(i + k) % arr.length]
}

console.log(temp)
console.log(count)
