let sum = 0;
let i = 1;
while (i <= 5) {
  sum += i;
  i++;
}
console.log(sum);

//2
let j = 5;
let countdown = [];
while (j) {
  countdown.push(j--);
}
console.log(countdown);

//3
// let seriesCollection = []
// let series
// do {
//     series = prompt(`Enter your favorite series(type "stop" to finish)`)
//     if(series !== "stop"){
//         seriesCollection.push(series)
//     }
// } while (series !== "stop");

//4
let array = [2, 4, 6];
let multipliedNumbers = [];
for (let i = 0; i < 3; i++) {
  multipliedNumbers.push(2 * array[i]);
}
console.log(multipliedNumbers);
