/*
 * ============================================================
 *  01_async_foundations.js
 *  Topic  : How Async Works Internally in JavaScript
 *  Covers : JS Engine · Runtime · Single Thread · Call Stack
 *           Timer · Callback Queue · Microtask Queue · Event Loop
 * ============================================================
 */


/*
    WHY DOES ASYNC EVEN EXIST?
    ---------------------------
    JavaScript runs on a single thread — it can only do one thing at a time.
    If a task takes time (fetching data, reading a file, timers), a synchronous
    approach would freeze the entire page.

    Restaurant analogy:
    A synchronous waiter would take order → go to kitchen → stand and wait
    → bring food → take next order. Nobody else gets served!
    An async waiter takes the order, goes to the next table,
    and comes back when the food is ready.
*/


/*
    DEFINITIONS
    -----------
    Asynchronous JavaScript:
        Allows JavaScript to delegate time-consuming tasks to the runtime
        environment (Browser or Node.js), continue executing other code,
        and process the result later when the task completes.

    JavaScript Engine:
        A program that reads, compiles, and executes JavaScript code.

    Runtime Environment:
        The platform that provides features which JavaScript itself does not have.

    JavaScript alone cannot:
        - Make network requests
        - Access the DOM
        - Set timers
        - Read files
        The runtime provides these capabilities.

    Single Thread:
        JavaScript executes only one task at a time using a single Call Stack.

    Async Operations (tasks that take an unknown or noticeable amount of time):
        - Network calls (fetch, XMLHttpRequest)
        - Read / write files
        - Timer functions (setTimeout, setInterval)
        - User input events
*/


// ─── ASYNC BEHAVIOUR EXAMPLE ────────────────────────────────────────────────

function sayHello() {
    console.log("I Would like to say hello");
}

setTimeout(() => {
    sayHello();
}, 4000);

console.log("Harsh"); // prints first — JS doesn't wait for the timer


// ─── CALL STACK ──────────────────────────────────────────────────────────────
/*
    The Call Stack is a data structure where JavaScript keeps track of
    function execution.
        - Every function call enters (pushed onto) the stack.
        - When execution finishes, it leaves (popped off) the stack.
        - Because it is a Stack, it follows LIFO (Last In, First Out).

    Stack at peak of the example below:
        [ one ]  ← bottom
        [ two ]
        [ three ] ← top (currently executing)
*/

function three() {
    console.log("three - top of stack");
}

function two() {
    three();                                   // three() pushed ON TOP of two()
    console.log("two - three has returned");
}

function one() {
    two();                                     // two() pushed ON TOP of one()
    console.log("one - two has returned");
}

one();
/*
    Output:
        three - top of stack
        two - three has returned
        one - two has returned
*/


// ─── BROWSER / NODE RUNTIME ──────────────────────────────────────────────────
/*
    The Runtime Environment executes asynchronous operations on behalf of
    JavaScript.

    Timer:
        Managed by the runtime. Tracks when timer-based callbacks should
        become eligible for execution.
*/

setTimeout(() => {
    console.log("Done");
}, 3000);

/*
    What happens step by step:
        1. Browser starts a 3-second timer.
        2. JavaScript immediately continues executing other code.

    Important:
        setTimeout(fn, 3000) means "don't run BEFORE 3000ms."
        It does NOT guarantee it will run exactly at 3000ms.
        The callback still has to wait until the Call Stack is empty.
*/


// ─── CALLBACK QUEUE (TASK QUEUE) ─────────────────────────────────────────────
/*
    The Callback Queue stores completed asynchronous callbacks that are
    waiting to be executed.

    Flow:
        Timer finishes
            ↓
        Callback enters Callback Queue
            ↓
        Waits...
            ↓
        Call Stack becomes empty
            ↓
        Event Loop moves callback to Call Stack
            ↓
        Callback executes
*/


// ─── MICROTASK QUEUE ─────────────────────────────────────────────────────────
/*
    There are actually TWO queues, not one.

    Microtask Queue:
        Stores callbacks from Promises (.then, .catch, .finally)
        and queueMicrotask().
        It has HIGHER priority than the Callback Queue.

    Callback Queue (Task Queue):
        Stores callbacks from setTimeout, setInterval, etc.
        It has LOWER priority — runs only after Microtask Queue is empty.

    Priority order when Call Stack is empty:
        1. Microtask Queue  ← runs first (ALL pending microtasks)
        2. Callback Queue   ← runs after microtask queue is empty
*/

console.log("1");                              // sync → runs immediately

setTimeout(() => console.log("2"), 0);        // Callback Queue

Promise.resolve().then(() => console.log("3")); // Microtask Queue

console.log("4");                              // sync → runs immediately

/*
    Output: 1 → 4 → 3 → 2

    Why?
        "1" and "4" are synchronous → run first.
        After Call Stack is empty:
            → Microtask Queue runs → prints "3"
            → Callback Queue runs  → prints "2"
*/


// ─── EVENT LOOP ──────────────────────────────────────────────────────────────
/*
    The Event Loop continuously monitors the Call Stack, the Microtask Queue,
    and the Callback Queue.

    Its only responsibility is coordination:
        - It never executes your code directly.
        - If the Call Stack is empty:
            → First drains the entire Microtask Queue.
            → Then picks the next callback from the Callback Queue.

    Full picture:

        ┌─────────────────────────────┐
        │         JS Engine           │
        │  ┌───────────────────────┐  │
        │  │      Call Stack       │  │
        │  └───────────────────────┘  │
        └─────────────┬───────────────┘
                      │  (stack empty?)
                      ▼
        ┌─────────────────────────────┐   ← checked FIRST
        │      Microtask Queue        │  (Promises)
        └─────────────────────────────┘
                      │  (microtasks done?)
                      ▼
        ┌─────────────────────────────┐   ← checked SECOND
        │      Callback Queue         │  (setTimeout, setInterval)
        └─────────────────────────────┘
                      │
                      ▼
              Runtime Environment
          (Browser APIs / Node APIs)
*/