/* ============================================================
   JAVASCRIPT OOP CONCEPTS — DEEP NOTES
   File annotated topic-by-topic. Comments explain WHY, not just WHAT.
   ============================================================ */


/* ------------------------------------------------------------
   1. OBJECT LITERAL + METHOD + `this`
   ------------------------------------------------------------
   - `car` is a plain object literal. `start` is a method (function stored as a property).
   - Inside `start`, `this` refers to the object on which the method was CALLED
     (here: car.start() → this = car). This is "implicit binding".
   - Template literals (`...${}...`) let us inject expressions directly into strings.
*/
let car = {
  make: "Toyota",
  model: "Camry",
  year: 2020,
  start: function () {
    return `${this.make} car got started in ${this.year}`;
  },
};
console.log(car.start()); // "Toyota car got started in 2020"


/* ------------------------------------------------------------
   2. PROTOTYPAL CHAIN (using constructor function)
   ------------------------------------------------------------
   DEFINITION: Prototypal chain is the mechanism by which JS objects inherit
   features from one another. When you access a property/method on an object
   and it's not found directly on it, JS looks up the chain to the object's
   prototype, then that prototype's prototype, and so on, until found or
   the chain ends (at `null`).

   - `Animal` is a constructor function (old-school way of making "classes" before ES6).
   - Every function in JS automatically gets a `.prototype` object.
   - Instead of writing `speak` inside the function (which would create a NEW copy
     of the function for every object), we put it on `Animal.prototype`.
   - All instances created via `new Animal(...)` SHARE the same `speak` function
     in memory → this is why prototypes exist: memory efficiency + shared behavior.
   - When you call `someAnimalInstance.speak()`, JS first looks for `speak` on the
     instance itself → not found → walks UP the prototype chain → finds it on
     `Animal.prototype` → executes it with `this` = the instance.
*/
function Animal(type) {
  this.type = type;
}
Animal.prototype.speak = function () {
  return `${this.type} makes a sound`;
};


/* ------------------------------------------------------------
   3. EXTENDING A BUILT-IN PROTOTYPE (Array.prototype)
   ------------------------------------------------------------
   - Built-in objects like Array, String, Object also have prototypes you CAN modify.
   - Here we add a custom `harsh` method to EVERY array in this program (and any
     library code running alongside it, since prototypes are global!).
   - `this` inside `harsh` = the array it was called on.
   - `${this}` triggers implicit `.toString()` on the array → arrays convert to a
     comma-separated string by default → "1,2,3".

   ⚠️ REAL-WORLD WARNING (important for interviews):
   Modifying built-in prototypes is considered BAD PRACTICE in production code:
     - It can silently break other libraries that expect native Array behavior
       (e.g. if some library also defines `Array.prototype.harsh` differently).
     - It can break `for...in` loops, since added methods become enumerable
       unless you use Object.defineProperty with enumerable:false.
     - It's called "monkey patching". Fine for learning/demo, avoid in real apps.
*/
Array.prototype.harsh = function () {
  return `Custom method ${this}`;
};

let myArray = [1, 2, 3];
console.log(myArray.harsh()); // "Custom method 1,2,3"

let myNewArray = [1, 2, 3, 4, 5, 6, 6];
console.log(myNewArray.harsh()); // "Custom method 1,2,3,4,5,6,6"
// Both arrays use the SAME function from Array.prototype — no duplication in memory.


/* ------------------------------------------------------------
   4. CLASS SYNTAX (syntactic sugar over prototypes)
   ------------------------------------------------------------
   DEFINITION: A class is a blueprint/template for creating objects that
   share the same structure (properties) and behavior (methods).

   - `class` is NOT a new feature conceptually — under the hood, methods written
     inside a class still land on `ClassName.prototype`, same as section 2.
   - It's just a cleaner syntax introduced in ES6.
*/
class Vehicle {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }

  start() {
    return `${this.model} is a car from ${this.make}`;
  }
}


/* ------------------------------------------------------------
   5. INHERITANCE (extends + super)
   ------------------------------------------------------------
   DEFINITION: Inheritance lets one class (child) acquire the properties
   and methods of another class (parent), so you can reuse and extend
   existing functionality instead of rewriting it ("is-a" relationship).

   - `Car extends Vehicle` means Car's prototype chain links to Vehicle's prototype.
   - Car automatically gets access to Vehicle's methods (like `start`) without
     rewriting them — classic "is-a" relationship (a Car IS-A Vehicle).
   - Since Car has no constructor of its own, JS auto-generates an implicit one
     that calls `super(...args)`, passing args to Vehicle's constructor.
   - Now that the constructor typo is fixed, `this.make` / `this.model` are
     properly set, so this works correctly.
*/
class Car extends Vehicle {
  drive() {
    return `${this.make} : This is an inheritance example`;
  }
}
let myCar = new Car("Toyota", "Corolla");
console.log(myCar.start()); // "Corolla is a car from Toyota"
console.log(myCar.drive()); // "Toyota : This is an inheritance example"

// let vehOne = Vehicle("Toyota", "Corolla")
// console.log(vehOne.make);
// ^ This is commented out because classes CANNOT be called like normal functions
//   (without `new`). Doing so throws: "TypeError: Class constructor Vehicle
//   cannot be invoked without 'new'". This is a deliberate JS safety rule —
//   it forces you to use `new` for classes, unlike regular functions.


/* ------------------------------------------------------------
   6. ENCAPSULATION (private fields using #)
   ------------------------------------------------------------
   - `#balance` is a TRUE private field (ES2022 feature) — it can ONLY be
     accessed/modified from INSIDE the class. Even `account.#balance` from
     outside throws a SyntaxError.
   - This is stricter than the old convention of using `_balance` (underscore),
     which was just a NAMING CONVENTION (a polite request, not actual protection —
     `_balance` is still fully public and accessible from outside).
   - Encapsulation = bundling data + the methods that operate on it, while
     hiding the data from direct outside access. Forces interaction through
     controlled methods (`deposit`, `getBalance`) only.
*/
class BankAccount {
  #balance = 0;

  deposit(amount) {
    this.#balance += amount;
    return this.#balance;
  }
  getBalance() {
    return `$ ${this.#balance}`;
  }
}

let account = new BankAccount();
console.log(account.getBalance()); // "$ 0"


/* ------------------------------------------------------------
   7. ABSTRACTION (hiding complexity behind a simple interface)
   ------------------------------------------------------------
   - Abstraction = showing only the necessary/relevant details to the user,
     hiding internal implementation complexity.
   - The user of CoffeeMachine just calls `pressStartButtom()` — they don't
     need to know HOW `start()` or `brewCoffee()` work internally (could
     involve DB calls, sensor checks, complex calculations etc. in real life).
   - Difference from Encapsulation: Encapsulation is about RESTRICTING access
     (private data). Abstraction is about SIMPLIFYING the interface exposed
     to the user. They often work together but solve different problems.
*/
class CoffeeMachine {
  start() {
    //call database
    //filter value
    return `Starting the machine...`;
  }
  brewCoffee() {
    //complex calculation
    return `Brewing coffee`;
  }
  pressStartButtom() { // note: typo "Buttom" — harmless, just a naming typo
    let msg1 = this.start();
    let msg2 = this.brewCoffee();
    return `${msg1} + ${msg2}`;
  }
}

let myMachine = new CoffeeMachine();
console.log(myMachine.pressStartButtom());


/* ------------------------------------------------------------
   8. POLYMORPHISM (same method name, different behavior)
   ------------------------------------------------------------
   - Polymorphism = "many forms". The SAME method name (`fly`) behaves
     differently depending on WHICH class's instance calls it.
   - `Penguin extends Bird` and OVERRIDES the `fly` method. When `fly()`
     is called on a `Penguin` instance, JS finds the overridden version
     on `Penguin.prototype` FIRST (closer in the chain), so it never even
     looks up to `Bird.prototype`.
   - This is "method overriding" — the most common form of polymorphism
     you'll use in real projects (e.g. different payment methods all having
     a `.pay()` method that behaves differently per payment type).
*/
class Bird {
  fly() {
    return `Flying...`;
  }
}

class Penguin extends Bird {
  fly() {
    return `Penguins can't fly`;
  }
}

let bird = new Bird();
let penguin = new Penguin();
console.log(bird.fly());    // "Flying..."
console.log(penguin.fly()); // "Penguins can't fly" (overridden version wins)


/* ------------------------------------------------------------
   9. STATIC METHODS
   ------------------------------------------------------------
   DEFINITION: Static methods/properties belong to the class itself, not to
   any instance of it — called directly on the class name, never via `new`.

   - `static` methods belong to the CLASS itself, not to instances.
   - They live directly on the class (not on `Calculator.prototype`), so
     instances created via `new Calculator()` do NOT have access to them.
   - Used for utility/helper functions that don't need instance data
     (e.g. `Math.max()`, `Array.isArray()` are static-style methods too).
*/
class Calculator {
  static add(a, b) {
    return a + b;
  }
}

// let miniCalc = new Calculator();
// console.log(miniCalc.add(2,3));
// ^ This would throw "TypeError: miniCalc.add is not a function" because
//   `add` exists only on the Calculator class itself, not on its instances.

console.log(Calculator.add(2, 3)); // 5 — called directly on the class


/* ------------------------------------------------------------
   10. GETTERS & SETTERS (controlled property access)
   ------------------------------------------------------------
   DEFINITION: Getters and setters are special methods that let you read
   (`get`) and write (`set`) a property using normal property syntax
   (`obj.prop`, `obj.prop = x`) while actually running custom logic
   (like validation) behind the scenes.

   - `get`/`set` let you define properties that LOOK like normal fields
     (`emp.salary`, `emp.salary = x`) but actually RUN FUNCTIONS behind
     the scenes — giving you a hook to add validation/logic.

   🐞 BUGS THAT WERE HERE (now fixed):

   a) Old code did `new Employee("Alice", -50000)` → constructor's
      `if (salary < 0) throw new Error(...)` fired IMMEDIATELY, crashing the
      whole script before any of the next lines could run. Fixed below by
      using a valid (non-negative) salary when creating the instance, AND
      wrapping creation in try/catch so future negative-salary attempts
      fail gracefully instead of crashing the program.

   b) Old setter assigned to `this._salary` (a normal PUBLIC property) instead
      of `this.#salary` (the true private field) — so updating salary via the
      setter never actually changed the real private value. Fixed below by
      making the setter update `this.#salary` directly. The getter is also
      updated to actually return the real (private) value instead of an
      unrelated fixed string, so get/set now work together consistently.
*/
class Employee {
  #salary;
  constructor(name, salary) {
    if (salary < 0) {
      throw new Error("Salary cannot be in negative");
    }
    this.name = name;
    this.#salary = salary;
  }
  get salary() {
    return `$ ${this.#salary}`; // fixed: now reflects the real private value
  }
  set salary(value) {
    if (value < 0) {
      console.error("Invalid salary"); // rejects bad input, doesn't crash
    } else {
      this.#salary = value; // fixed: updates the actual private field
    }
  }
}

let emp;
try {
  emp = new Employee("Alice", 50000); // fixed: valid non-negative salary
} catch (err) {
  console.error(err.message);
}

console.log(emp.salary);   // "$ 50000"
emp.salary = -6000;        // rejected → logs "Invalid salary", value unchanged
console.log(emp.salary);   // still "$ 50000"
emp.salary = 70000;        // valid → accepted
console.log(emp.salary);   // "$ 70000"