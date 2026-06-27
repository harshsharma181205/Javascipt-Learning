/*
 * ============================================================
 *  02_closures.js
 *  Topic  : Closures in JavaScript
 *  Covers : Variable lifetime · Closure definition · 
 *           Independent closures · Practical use cases
 * ============================================================
 */


/*
    FIRST — HOW VARIABLES NORMALLY WORK
    -------------------------------------
    Every variable inside a function lives and dies with that function.
    When the function finishes → variable is deleted from memory.
*/

function greet() {
    let name = "Harsh";   // created when greet() starts
    console.log(name);    // used
}                         // ← name is DELETED here. function is done.

greet();

/*
    Also — every new call creates a FRESH variable.
    The old one was already deleted.
*/

greet(); // new name = "Harsh" created again from scratch
greet(); // again, brand new


/*
    THE ONE EXCEPTION — WHEN JS DOES NOT DELETE A VARIABLE
    -------------------------------------------------------
    If an inner function still NEEDS a variable from outer function,
    JavaScript will NOT delete it.
    It keeps it alive in memory as long as the inner function exists.

    That inner function + that variable staying alive = CLOSURE
*/


/*
    DEFINITION
    ----------
    A closure is when an inner function keeps a variable alive in memory
    — even after the outer function has finished —
    because it still needs that variable.

    In simple words:
    "JS did not delete counter from memory because the inner function still needs it."
*/


// ─── BASIC CLOSURE EXAMPLE ──────────────────────────────────────────────────

function outer() {
    let counter = 0;          // step 1: counter is created

    return function () {       // step 2: inner function is returned
        counter++;             // step 4: uses counter that is still in memory
        return counter;
    }
}

let increment = outer();      // step 3: outer() finishes, but counter is NOT deleted
                              //         because inner function still needs it

console.log(increment());     // 1
console.log(increment());     // 2
console.log(increment());     // 3
// counter keeps increasing — it is NOT reset on each call
// because JS is using the same counter from memory


/*
    WHY increment() AND NOT JUST increment ?
    -----------------------------------------
    increment holds a FUNCTION — not a value.
    To run a function you need () — that tells JS "execute this now."

        increment    → function is just sitting there, not running
        increment()  → NOW it runs
*/


// ─── EACH CLOSURE IS INDEPENDENT ────────────────────────────────────────────
/*
    Every call to outer() creates a BRAND NEW counter in memory.
    So two separate calls = two separate closures = two separate counters.
    They do not share anything.
*/

let increment1 = outer();    // its own counter, starts at 0
let increment2 = outer();    // completely separate counter, starts at 0

console.log(increment1());   // 1
console.log(increment1());   // 2  ← increment1's counter is now 2

console.log(increment2());   // 1  ← increment2 has its OWN counter, unaffected
console.log(increment2());   // 2


// ─── PRACTICAL USE CASES ────────────────────────────────────────────────────

// 1. DATA PRIVACY
//    counter cannot be accessed or changed from outside
//    only way to interact with it is through increment()

let count = outer();
// count.counter  ❌ — cannot access directly
// count()        ✅ — only way to use it


// 2. REMEMBERING STATE (e.g. button click counter)

function makeButton(label) {
    let clickCount = 0;
    return function () {
        clickCount++;
        console.log(`${label} clicked ${clickCount} times`);
    }
}

let btn = makeButton("Submit");
btn();   // Submit clicked 1 times
btn();   // Submit clicked 2 times
btn();   // Submit clicked 3 times


// 3. let vs var IN LOOPS (classic interview question)

// with var → prints 3, 3, 3 (no closure, all share same variable)
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 1000);
}

// with let → prints 0, 1, 2 (let creates a new closure per iteration)
for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 1000);
}


/*
    SUMMARY
    -------
    - Variables inside a function normally die when function finishes.
    - If an inner function still needs that variable → JS keeps it alive.
    - That inner function + that alive variable = closure.
    - Each outer() call = fresh independent closure.
    - Closures are used for data privacy, remembering state, event handlers.
*/