function Person(name,age){
    console.log("Hello,",name);
    this.name = name;
    this.age = age;
}




function Car(make, model){
    this.name = make
    this.model = model
}
let myCar = new Car("Toyota","Camry");
// console.log(myCar);
let myNewCar = new Car("Tata", "Safari")
// console.log(myNewCar);

// A constructor function is a regular function meant to be called with new. When you do new Car("Toyota", "Camry"):

// 1.A blank object {} is created automatically
// 2.this inside the function points to that new object
// 3.Properties are attached to it
// 4.The object is returned automatically

// So myCar becomes { name: "Toyota", model: "Camry" }.




function Tea(type){
    this.type = type
    this.describe = function(){
        return `this is a cup of ${this.type}`
    }
}

let LemonTea = new Tea("Lemon tea")
console.log(LemonTea.describe());
// 2. Method Inside Constructor — Tea
// javascriptfunction Tea(type) {
//     this.type = type
//     this.describe = function() {
//         return `this is a cup of ${this.type}`
//     }
// }
// Here describe is a method defined inside the constructor. It works, but has a downside — every new Tea(...) object gets its own separate copy of describe. If you create 1000 Tea objects, you get 1000 copies of the same function in memory. This is why prototype exists (see next section).
// Method in constructorWorks, but wastes memory (each instance gets own copy)



function Animal(species){
    this.species = species
}

Animal.prototype.sound = function(){
    return `${this.species} makes a sound`
}

let dog = new Animal("Dog")
console.log(dog.sound());
let cat = new Animal("Cat")
console.log(cat.sound());

//  Prototype — Animal
// javascriptAnimal.prototype.sound = function() {
//     return `${this.species} makes a sound`
// }
// Instead of defining sound inside the constructor, it's added to Animal.prototype. Now:

// dog.sound() and cat.sound() both work
// But there's only ONE copy of sound in memory, shared by all Animal instances

// This is the correct, memory-efficient pattern. Think of prototype as a shared blueprint all instances can look up.

// prototype methodShared across all instances — preferred pattern


function Drink(name){
    if(!new.target){
        throw new Error("Drink must be called with new keyboard");
    }
    this.name = name;
}
let tea = new Drink("tea") // works fine
let coffee = Drink("coffee") // throws error

// new.target is a safety check — it's undefined when the function is called without new, and points to the constructor when called with new.
// Without this guard, Drink("coffee") would silently attach name to the global object (window in browser), which is a hard-to-debug bug. The guard forces correct usage.

// new.targetDetects if function was called with new or not