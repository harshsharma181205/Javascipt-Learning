let numbers = [1, 2, 3, 4, 5];
let smallNum = [];

for (const num of numbers) {
  if (num === 4) {
  }
}

//5 - For-in loop
// Use a for-in loop to loop through an object

// An object literal is the simplest and most common way to define a JavaScript object
let citiesPopulation = {
  London: 8900000,
  "New York": 8400000,
  berlin: 350000,
  Paris: 2200000,
};

let cityPopulation = {};

// console.log(Object.keys(citiesPopulation));
// console.log(Object.values(citiesPopulation));

for (const city in citiesPopulation) {
  //   console.log(citiesPopulation[city]);
  if (city == "berlin") {
    break;
  }
  cityPopulation[city] = citiesPopulation[city];
}
console.log(cityPopulation);
// call,bind,apply

//6
let worldCities = {
  Sydney: 5000000,
  Tokyo: 9000000,
  Berlin: 3500000,
  Paris: 2200000,
};
let largeCities = {};
for (const city in worldCities) {
  if (worldCities[city] < 3000000) {
    continue;
  }
  largeCities[city] = worldCities[city];
}
console.log(largeCities);

//7 forEach loop

// forEach() Definition

// forEach() is an array method used to execute a callback function once for each element of an array. It is mainly used for iteration and does not return a new array.

// forEach() ek array method hai jo array ke har element par ek callback function execute karta hai. Ye iteration ke liye use hota hai aur koi naya array return nahi karta.

let teaCollection = ["earl gray", "green tea", "chai", "oolong tea"];
let availableTeas = [];

teaCollection.forEach(function (tea) {
  if (tea === "chai") {
    // break;// it does not work in for each loop
    return;
  }
  availableTeas.push(tea);
});
console.log(availableTeas);

//8
let myWorldCities = ["BErlin", "Tokyo", "Sydney", "Paris"];
let traveledCities = [];

myWorldCities.forEach((city) => {
  if(city === 'Sydney'){
    return;
  }
  traveledCities.push(city);
});
console.log(traveledCities);


//9
