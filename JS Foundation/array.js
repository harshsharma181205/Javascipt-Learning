// ======================================
// Array Basics
// ======================================

let teaFlavors = ["green tea", "black tea", "oolong tea"];
const firstTea = teaFlavors[0];

let cities = ["London", "Tokyo", "Paris", "New York"];
const favoriteCity = cities[2];


// ======================================
// Add Elements
// ======================================

let teaTypes = ["Herbal Tea", "White Tea"];
teaTypes.push("Masala Chai"); // End me add
teaTypes.unshift("Green Tea"); // Start me add

console.log(teaTypes);


// ======================================
// Remove Elements
// ======================================

let teaOrders = ["chai", "iced tea", "green tea"];

teaOrders.pop(); // End se remove
teaOrders.shift(); // Start se remove

console.log(teaOrders);


// ======================================
// Soft Copy (Reference Copy)
// ======================================

let popularTeas = ["green tea", "oolong tea", "chai"];

let softCopyTeas = popularTeas;

popularTeas.pop();

console.log(popularTeas);
console.log(softCopyTeas);

// Both arrays changed because same reference


// ======================================
// Hard Copy
// ======================================

let topCities = ["Berlin", "Singapore", "New York"];

let hardCopy = [...topCities];
// let hardCopy = topCities.slice();

topCities.pop();

console.log(topCities);
console.log(hardCopy);

// Hard copy remains unchanged


// ======================================
// Merging Arrays
// ======================================

let europeanCities = ["Paris", "Rome"];
let asianCities = ["Tokyo", "Bangkok"];

let worldCities = europeanCities.concat(asianCities);

console.log(worldCities);


// ======================================
// Spread Operator
// ======================================

let allCities = [...europeanCities, ...asianCities];

console.log(allCities);


// ======================================
// Includes Method
// ======================================

let availableTeas = ["green tea", "black tea", "oolong tea"];

console.log(availableTeas.includes("black tea")); // true
console.log(availableTeas.includes("masala chai")); // false


// ======================================
// indexOf()
// ======================================

let teaMenu = ["chai", "green tea", "black tea"];

console.log(teaMenu.indexOf("green tea")); // 1
console.log(teaMenu.indexOf("coffee")); // -1


// ======================================
// Slice (Doesn't Modify Original)
// ======================================

let citiesList = ["London", "Tokyo", "Paris", "Berlin"];

let selectedCities = citiesList.slice(1, 3);

console.log(selectedCities);
console.log(citiesList);


// ======================================
// Splice (Modifies Original)
// ======================================

let fruits = ["Apple", "Banana", "Orange"];

fruits.splice(1, 1);

console.log(fruits);


// ======================================
// Reverse
// ======================================

let numbers = [1, 2, 3, 4, 5];

numbers.reverse();

console.log(numbers);


// ======================================
// Sort
// ======================================

let scores = [30, 10, 50, 20];

scores.sort((a, b) => a - b);

console.log(scores);


// ======================================
// Loop Through Array
// ======================================

let teas = ["chai", "green tea", "black tea"];

for (let i = 0; i < teas.length; i++) {
    console.log(teas[i]);
}


// ======================================
// for...of Loop
// ======================================

for (const tea of teas) {
    console.log(tea);
}


// ======================================
// Array Destructuring
// ======================================

let colors = ["red", "green", "blue"];

let [firstColor, secondColor] = colors;

console.log(firstColor);
console.log(secondColor);



// # Array Destructuring

// ## Definition
// Array Destructuring is a JavaScript feature that allows us to extract values from an array and store them directly into variables.

// ---

// ## Basic Syntax

// ```js
// let colors = ["red", "green", "blue"];

// let [firstColor, secondColor] = colors;

// console.log(firstColor);  // red
// console.log(secondColor); // green
// ```

// ### How it Works

// ```js
// let [a, b, c] = ["red", "green", "blue"];
// ```

// Position-wise assignment:

// ```text
// ["red", "green", "blue"]
//     ↓       ↓       ↓
//     a       b       c
// ```

// Output:

// ```js
// a = "red"
// b = "green"
// c = "blue"
// ```

// ---

// ## Traditional Way vs Destructuring

// ### Traditional Way

// ```js
// let colors = ["red", "green", "blue"];

// let firstColor = colors[0];
// let secondColor = colors[1];
// ```

// ### Destructuring Way

// ```js
// let colors = ["red", "green", "blue"];

// let [firstColor, secondColor] = colors;
// ```

// Destructuring makes code shorter and cleaner.

// ---

// ## Skipping Values

// If you don't need a value, leave an empty space.

// ```js
// let colors = ["red", "green", "blue"];

// let [first, , third] = colors;

// console.log(first); // red
// console.log(third); // blue
// ```

// ---

// ## Rest Operator (...)

// Collect remaining elements into a new array.

// ```js
// let colors = ["red", "green", "blue", "yellow"];

// let [first, ...remaining] = colors;

// console.log(first);      // red
// console.log(remaining);  // ["green", "blue", "yellow"]
// ```

// ### Use Case
// Useful when you need the first few values and want the rest together.

// ---

// ## Swapping Variables

// ### Without Destructuring

// ```js
// let a = 10;
// let b = 20;

// let temp = a;
// a = b;
// b = temp;
// ```

// ### With Destructuring

// ```js
// let a = 10;
// let b = 20;

// [a, b] = [b, a];

// console.log(a); // 20
// console.log(b); // 10
// ```

// ---

// ## Using with Functions

// Functions can return multiple values.

// ```js
// function getUser() {
//     return ["Harsh", 20];
// }

// let [name, age] = getUser();

// console.log(name); // Harsh
// console.log(age);  // 20
// ```

// ---

// ## Default Values

// If an element is missing, a default value can be provided.

// ```js
// let [name = "Guest", age = 18] = ["Harsh"];

// console.log(name); // Harsh
// console.log(age);  // 18
// ```

// ---

// ## Common Mistakes

// ### Mistake 1: Expecting More Values Than Exist

// ```js
// let [a, b, c] = [1, 2];

// console.log(c); // undefined
// ```

// ### Mistake 2: Thinking Rest Operator Stores a Single Value

// ```js
// let [first, ...rest] = [1, 2, 3, 4];

// console.log(rest);
// ```

// Output:

// ```js
// [2, 3, 4]
// ```

// Rest operator always returns an array.

// ---

// ## Interview Questions

// ### Q1. What is Array Destructuring?
// A feature that extracts values from an array and assigns them to variables.

// ### Q2. Can we skip values during destructuring?
// Yes, using commas.

// ```js
// let [first, , third] = arr;
// ```

// ### Q3. What does the Rest Operator do?

// ```js
// let [first, ...rest] = arr;
// ```

// It collects all remaining elements into a new array.

// ### Q4. How can we swap two variables using destructuring?

// ```js
// [a, b] = [b, a];
// ```

// ### Q5. What happens if the array has fewer elements?

// Missing values become `undefined` unless default values are provided.

// ---

// ## Key Points

// - Destructuring extracts array values into variables.
// - Assignment is position-based.
// - Values can be skipped using commas.
// - Rest operator (`...`) collects remaining elements.
// - Variables can be swapped without a temporary variable.
// - Default values can be assigned.
// - Commonly used in React, APIs, and modern JavaScript development.