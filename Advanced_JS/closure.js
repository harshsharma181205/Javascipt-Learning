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
*/// ─── var vs let IN LOOPS (Deep Dive) ────────────────────────────────────────
 
/*
    MOST PEOPLE EXPECT THIS TO PRINT: 0, 1, 2
    BUT IT ACTUALLY PRINTS:           3, 3, 3
*/
 
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 1000);
}
 
/*
    WHY 3, 3, 3 ?
    -------------
    var is NOT block scoped.
    So there is only ONE i shared across all iterations.
 
    What happens step by step:
        iteration 1 → i = 0 → setTimeout registered → moves on immediately
        iteration 2 → i = 1 → setTimeout registered → moves on immediately
        iteration 3 → i = 2 → setTimeout registered → moves on immediately
        loop ends   → i = 3  (loop condition failed here)
 
        ...1000ms later...
 
        all three setTimeouts fire → all read i → i is already 3
 
    All three callbacks share the SAME i.
    By the time they run, i is already 3.
*/
 
 
/*
    WHAT IF I GIVE 0ms INSTEAD OF 1000ms ?
    ----------------------------------------
    Even with 0ms the output is still 3, 3, 3.
 
    Because setTimeout(fn, 0) does NOT mean "run immediately."
    It means → go to Callback Queue → wait until Call Stack is empty.
 
    The loop ALWAYS finishes first before any setTimeout callback runs.
    So i is already 3 before any callback executes.
 
        loop runs fully → i = 3 → Call Stack empty
        ↓
        all three callbacks run → i is already 3
*/
 
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 0); // still prints 3, 3, 3
}
 
 
/*
    WITH let — PRINTS 0, 1, 2
    --------------------------
    let IS block scoped.
    Each iteration gets its OWN fresh i.
 
    What happens step by step:
        iteration 1 → its OWN i = 0 → setTimeout registered → i = 0 saved
        iteration 2 → its OWN i = 1 → setTimeout registered → i = 1 saved
        iteration 3 → its OWN i = 2 → setTimeout registered → i = 2 saved
 
        ...1000ms later...
 
        first callback  → prints its own i → 0
        second callback → prints its own i → 1
        third callback  → prints its own i → 2
*/
 
for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 1000); // prints 0, 1, 2
}
 
 
/*
    THIS IS CLOSURE AGAIN
    ----------------------
    Each setTimeout callback is an inner function.
    Each one closes over its own i and keeps it alive in memory.
 
    With let:
        iteration 1 creates → callback + i=0  (its own closure)
        iteration 2 creates → callback + i=1  (its own closure)
        iteration 3 creates → callback + i=2  (its own closure)
 
    With var:
        all three callbacks share ONE i → no separate closures
        by the time they run → i = 3
 
 
    SIMPLE RULE:
        var  → one shared i  → all callbacks see final value → 3, 3, 3
        let  → own fresh i   → each callback sees its own   → 0, 1, 2
*/
