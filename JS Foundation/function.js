//1
function makeTea(typeOfTea) {
  return `Making ${typeOfTea}`;
}
let teaOrder = makeTea("Lemon tea");
console.log(teaOrder);

//2
function orderTea(teaType) {
  function confirmOrder() {
    return `Order confirmed for chai`;
  }
  return confirmOrder();
}
let orderConfirmation = orderTea("chai");
console.log(orderConfirmation);

//3 - Arrow Function

const calculateTotal = (price, quantity) => {
  return price * quantity;
};
let totalCollection = calculateTotal(499, 100);
console.log(totalCollection);


//4 - Higher order function
// What is a Higher Order Function?
// A Higher Order Function (HOF) is any function that does at least one of these:
// FeatureMeaning✅ Takes a function as argumentLike processTeaOrder(makeTea)✅ Returns a functionReturns a new function instead of a value
function makeTea(typeOfTea) {
  return `maketea : ${typeOfTea}`;
}
function processTeaOrder(teaFunction) { // processTeaOrder is a higher order function
  return teaFunction("earl grey");
}
let order = processTeaOrder(makeTea);
console.log(order);


//5
function createTeaMaker(name){
    return function(teaType){
        return `Making ${teaType} ${name}`;
    };
}
let teaMaker = createTeaMaker("harsh");
let result = teaMaker("green tea");
console.log(result);

