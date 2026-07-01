# 📚 DSA — Advanced Arrays: Logic Notes (Part 2)

> Based on Shyam Coding School — DSA Series | Advanced Arrays & Named Algorithms

---

## 🔁 Left Rotation by One Element

### Problem:

Shift every element one position to the left. The first element wraps around to the last position.

`[1, 2, 3, 4, 5]` → `[2, 3, 4, 5, 1]`

### Logic:

- The first element (`arr[0]`) will be lost during shifting → **save a copy of it first**.
- For every index `i`, place the element from `i+1` into index `i`.
- Stop at index `length - 2` (second last), because the last element has no `i+1` to pull from.
- After the loop, place the saved copy at the **last index**.

```
Step 1: copy = arr[0]
Step 2: Loop i from 0 to length - 2:
            arr[i] = arr[i + 1]
Step 3: arr[length - 1] = copy
```

---

## 🔁 Right Rotation by One Element

### Problem:

Shift every element one position to the right. The last element wraps to the first position.

`[1, 2, 3, 4, 5]` → `[5, 1, 2, 3, 4]`

### Logic:

- The last element will be lost → **save a copy of it first**.
- Traverse from the **last index backwards** to index 1.
- For every index `i`, place the element from `i-1` into index `i`.
- Stop at index `1` (we never go to index 0 because `i-1` would be `-1` — out of bounds).
- After the loop, place the saved copy at **index 0**.

```
Step 1: copy = arr[length - 1]
Step 2: Loop i from length - 1 down to 1:
            arr[i] = arr[i - 1]
Step 3: arr[0] = copy
```

---

## 🔢 Nested Loops (Concept)

### What is it?

A loop inside another loop. Used when you have a **repeated task that itself contains a repeated sub-task**.

### How it works:

- The **outer loop** runs its full count.
- For **each iteration** of the outer loop, the **inner loop** runs its full count from scratch.
- Inner loop variables reset on every new outer loop iteration.

```
Outer loop runs 4 times
  → Each time, Inner loop runs 3 times
  → Total executions = 4 × 3 = 12
```

---

## 🔁 Left Rotation by K Elements (Brute Force — O(n²))

### Problem:

Rotate every element left by `k` steps (user-defined).

### Logic:

- Reuse the **Left Rotation by One** logic, but run it `k` times using an outer loop.
- The inner loop does one full left rotation.
- The outer loop runs it `k` times.

### ⚠️ Important Edge Case — Modulo:

If `k >= array length`, some rotations cancel out. E.g., rotating a 5-element array 5 times = no change.

```
k = k % arr.length   ← normalize k before starting
```

```
Step 1: k = k % arr.length
Step 2: Outer loop runs k times:
            (perform one full left rotation by 1 step)
```

> **Why O(n²)?** Inner loop (length n) runs inside outer loop (k times) → n × k.

---

## 🔁 Left Rotation by K Elements (Efficient — O(n), With Extra Space)

### Logic:

Use the formula: **element at index `i` should go to index `(i + k) % length`** in a new temporary array.

```
Step 1: Create temp array of same length
Step 2: Loop i from 0 to length - 1:
            temp[i] = arr[(i + k) % arr.length]
Step 3: temp is your answer
```

### Dry Run (arr = [1,2,3,4,5], k = 2):

- `temp[0]` = `arr[(0+2)%5]` = `arr[2]` = **3**
- `temp[1]` = `arr[(1+2)%5]` = `arr[3]` = **4**
- `temp[2]` = `arr[(2+2)%5]` = `arr[4]` = **5**
- `temp[3]` = `arr[(3+2)%5]` = `arr[0]` = **1**
- `temp[4]` = `arr[(4+2)%5]` = `arr[1]` = **2**

**Result: [3, 4, 5, 1, 2]** ✅

> **Downside:** Uses O(n) extra space.

---

## 🔁 Left Rotation by K Elements (Most Efficient — O(n), No Extra Space)

### Algorithm: Reverse Block Swap (Named Algorithm)

### Idea:

For `arr = [1,2,3,4,5]` with `k = 2`, answer is `[3,4,5,1,2]`.
Notice: the first 2 elements moved to the end. Use 3 reverse operations.

```
Step 1: Reverse arr[0 to k-1]       → [2, 1, 3, 4, 5]
Step 2: Reverse arr[k to length-1]  → [2, 1, 5, 4, 3]
Step 3: Reverse entire array        → [3, 4, 5, 1, 2] ✅
```

> **For Right Rotation:** Same idea, just apply the full reverse first, then sub-reverses.
> Right rotation steps: Reverse all → Reverse [0 to k-1] → Reverse [k to length-1]

---

## 🗑️ Remove Duplicates from Sorted Array (LeetCode 26)

### Problem:

Given a **sorted** array, remove duplicates **in-place** so each unique element appears only once. Return the count of unique elements.

### Logic (Two Pointer):

- `j` starts at index 1 → marks where the **next unique element should be placed**.
- `i` starts at index 0 → scans every element.
- When `arr[i] !== arr[i+1]` → a new unique element is found at `i+1`. Place it at `arr[j]`, then `j++`.
- Stop loop at `length - 2` (last element has no `i+1` to compare).
- Return `j` (which equals the count of unique elements).

```
Step 1: j = 1
Step 2: Loop i from 0 to length - 2:
            if arr[i] !== arr[i + 1]:
                arr[j] = arr[i + 1]
                j++
Step 3: return j
```

---

## 🔀 Merge Two Sorted Arrays

### Problem:

Given two sorted arrays, merge them into one sorted array.

### Logic (Two Pointer):

- Create a `merged` array of combined length.
- Use `i` (pointer for arr1), `j` (pointer for arr2), `k` (pointer for merged).
- **While both are in range:** compare `arr1[i]` and `arr2[j]`, place the smaller into `merged[k]`, advance the used pointer and `k`.
- **Leftover:** if `i` exhausted, copy remaining `arr2` elements; if `j` exhausted, copy remaining `arr1` elements.

```
Step 1: i = 0, j = 0, k = 0
Step 2: While i < arr1.length AND j < arr2.length:
            if arr1[i] <= arr2[j]:
                merged[k] = arr1[i]; i++; k++
            else:
                merged[k] = arr2[j]; j++; k++
Step 3: While i < arr1.length: merged[k] = arr1[i]; i++; k++
Step 4: While j < arr2.length: merged[k] = arr2[j]; j++; k++
```

---

## 📈 Best Time to Buy and Sell Stock (LeetCode 121)

### Problem:

Given an array of prices (price on each day), find the **maximum profit** from one buy-sell transaction. Return 0 if no profit possible.

### Key Insight:

Maximum profit = (highest future price) − (lowest past price). So track the **running minimum** as you scan forward, and compute profit at each step.

### Logic:

```
Step 1: maxProfit = 0
Step 2: minElement = prices[0]
Step 3: Loop i from 0 to length - 1:
            if prices[i] < minElement:
                minElement = prices[i]     ← found a cheaper buy price
            profit = prices[i] - minElement
            if profit > maxProfit:
                maxProfit = profit         ← update best profit seen so far
Step 4: return maxProfit
```

### Dry Run (prices = [7,1,5,3,6,4]):

| i   | price | minElement | profit | maxProfit |
| --- | ----- | ---------- | ------ | --------- |
| 0   | 7     | 7          | 0      | 0         |
| 1   | 1     | 1          | 0      | 0         |
| 2   | 5     | 1          | 4      | 4         |
| 3   | 3     | 1          | 2      | 4         |
| 4   | 6     | 1          | 5      | 5         |
| 5   | 4     | 1          | 3      | 5         |

**Answer: 5** ✅

---

## 🎨 Sort Colors / Dutch National Flag (LeetCode 75)

### Problem:

Array contains only `0`, `1`, and `2`. Sort in-place so all 0s come first, then 1s, then 2s. No library sort allowed.

### Logic (Three Pointer):

- `i` → scanner (checks every element)
- `j` → "zero placer" (starts at 0, marks where next 0 should go)
- `k` → "two placer" (starts at last index, marks where next 2 should go)

| Current `arr[i]` | Action                                                   |
| ---------------- | -------------------------------------------------------- |
| `0`              | Swap `arr[i]` with `arr[j]`, then `i++` and `j++`        |
| `1`              | Do nothing, just `i++`                                   |
| `2`              | Swap `arr[i]` with `arr[k]`, then `k--` only (NOT `i++`) |

### ⚠️ Why not increment `i` when swapping with `k`?

Because the element swapped from `k` to `i` is unknown — it might be a `0` that still needs to be moved left. So `i` stays and re-checks.

```
Step 1: i = 0, j = 0, k = length - 1
Step 2: While i <= k:
            if arr[i] == 0: swap(arr[i], arr[j]); i++; j++
            else if arr[i] == 2: swap(arr[i], arr[k]); k--
            else: i++
```

---

## ➕ Maximum Subarray — Kadane's Algorithm (LeetCode 53)

### Problem:

Find the subarray (contiguous part of array) with the **largest sum**. Return that sum.

### Key Concept — Subarray:

A **subarray** is a contiguous, ordered slice of the array (not random elements).

### Algorithm: Kadane's Algorithm (Named)

```
Step 1: sum = 0
Step 2: max = -Infinity   ← NOT zero (handles all-negative arrays)
Step 3: Loop through each element:
            a) sum = sum + currentElement     ← add current to running sum
            b) if sum > max: max = sum        ← update max if better
            c) if sum < 0: sum = 0            ← reset sum to 0 if negative
Step 4: return max
```

### Why reset sum to 0 when negative?

If running sum goes negative, carrying it forward only **reduces** future sums. Start fresh from 0 so any upcoming positive element gives the full benefit.

### Why `max = -Infinity` (not 0)?

If all elements are negative, the answer is also negative. Starting with 0 would give a wrong answer.

### Dry Run (arr = [-2,1,-3,4,-1,2,1,-5,4]):

Best subarray is `[4,-1,2,1]` with sum **6** ✅

---

## 🗳️ Majority Element — Moore's Voting Algorithm (LeetCode 169)

### Problem:

Find the element that appears **more than n/2 times** in the array. Guaranteed to exist.

### Algorithm: Moore's Voting Algorithm (Named)

### Key Insight:

The majority element "survives" cancellation. Every time it appears, count goes up. Every time a different element appears, count goes down. When count hits 0, reset the candidate.

```
Step 1: answer = arr[0], count = 1
Step 2: Loop i from 1 to length - 1:
            if count == 0:
                answer = arr[i]    ← new candidate
                count = 1
            else if arr[i] == answer:
                count++            ← same element, strengthen
            else:
                count--            ← different element, weaken
Step 3: return answer
```

### Dry Run (arr = [2,2,1,1,1,2,2]):

| i   | arr[i] | answer | count |
| --- | ------ | ------ | ----- |
| -   | -      | 2      | 1     |
| 1   | 2      | 2      | 2     |
| 2   | 1      | 2      | 1     |
| 3   | 1      | 2      | 0     |
| 4   | 1      | 1      | 1     |
| 5   | 2      | 1      | 0     |
| 6   | 2      | 2      | 1     |

**Answer: 2** ✅

---

## 🌧️ Trapping Rain Water (LeetCode 42)

### Problem:

Given an array of bar heights (each width = 1), calculate how much water can be trapped after rain.

### Key Insight:

Water above any single bar = `min(maxLeft, maxRight) - currentHeight`

Where `maxLeft` = highest bar to the left (including self), `maxRight` = highest bar to the right (including self).

If this value is negative, no water sits on that bar (it's taller than its boundaries).

### Logic (Precompute Left/Right Max Arrays):

```
Step 1: Build leftMax[] array:
        leftMax[0] = height[0]
        Loop i from 1 to length - 1:
            leftMax[i] = max(leftMax[i-1], height[i])

Step 2: Build rightMax[] array:
        rightMax[length-1] = height[length-1]
        Loop i from length-2 down to 0:
            rightMax[i] = max(rightMax[i+1], height[i])

Step 3: ans = 0
        Loop i from 0 to length - 1:
            water = min(leftMax[i], rightMax[i]) - height[i]
            ans += water

Step 4: return ans
```

### Dry Run (height = [4, 2, 0, 3, 2, 5]):

| i   | height | leftMax | rightMax | min(L,R) | water |
| --- | ------ | ------- | -------- | -------- | ----- |
| 0   | 4      | 4       | 5        | 4        | 0     |
| 1   | 2      | 4       | 5        | 4        | 2     |
| 2   | 0      | 4       | 5        | 4        | 4     |
| 3   | 3      | 4       | 5        | 4        | 1     |
| 4   | 2      | 4       | 5        | 4        | 2     |
| 5   | 5      | 5       | 5        | 5        | 0     |

**Total: 0+2+4+1+2+0 = 9** ✅

---

## 📌 Summary of All Algorithms — Part 2

| Problem                    | Algorithm / Technique                 |
| -------------------------- | ------------------------------------- |
| Left/Right Rotation by 1   | Save copy, shift elements, place copy |
| Rotation by K (Brute)      | Nested loop — O(n²)                   |
| Rotation by K (With Space) | Formula: `(i + k) % length`           |
| Rotation by K (Optimal)    | Reverse Block Swap — O(n), O(1) space |
| Remove Duplicates          | Two Pointer (sorted array)            |
| Merge Sorted Arrays        | Two Pointer merge                     |
| Best Time to Buy/Sell      | Running minimum + max profit          |
| Sort Colors                | Dutch National Flag (3 pointers)      |
| Maximum Subarray           | **Kadane's Algorithm**                |
| Majority Element           | **Moore's Voting Algorithm**          |
| Trapping Rain Water        | Precompute leftMax + rightMax arrays  |

---

> 🏠 **Homework from this lecture:**
>
> 1. Right Rotation by K steps — O(n²) version
> 2. Right Rotation by K steps — Reverse Block Swap version
> 3. Right Rotation by K steps — with extra space (formula-based)
> 4. Sort Colors — implement from the pseudocode (no code was given)
> 5. LeetCode 122: Best Time to Buy and Sell Stock II
> 6. LeetCode 88: Merge Sorted Array (in-place, no extra array)

---

_Notes prepared from: Shyam Coding School — DSA Series (Advanced Arrays)_
