/*
 * ============================================================
 *  03_promises.js
 *  Topic  : Promises in JavaScript
 *  Covers : Why Promises · Promise states · Creating a Promise
 *           resolve / reject · .then() chaining · .catch()
 * ============================================================
 */


/*
    WHY PROMISES?
    -------------
    JS is async — it moves on instead of waiting for a task to finish.
    But how do you handle the result when it comes back?

    Old way → Callbacks → leads to callback hell (deeply nested code)
    New way → Promises → cleaner, readable, chainable
*/


/*
    WHAT IS A PROMISE?
    ------------------
    A Promise is an object that represents the eventual result
    of an async operation — either success or failure.

    Three states:
        PENDING   → operation is still running
        FULFILLED → operation succeeded → .then() runs
        REJECTED  → operation failed    → .catch() runs

    Once a Promise is fulfilled or rejected — it CANNOT change state.
*/


// ─── CREATING A PROMISE ─────────────────────────────────────────────────────

/*
    new Promise() takes a function with two parameters:
        resolve → call this on success  → sends value to .then()
        reject  → call this on failure  → sends value to .catch()
*/

function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {              // async operation (simulated)
            let success = true;

            if (success) {
                resolve("Data fetched successfully"); // → goes to .then()
            } else {
                reject("Error fetching data");        // → goes to .catch()
            }
        }, 3000);
    });
}


// ─── CONSUMING A PROMISE ────────────────────────────────────────────────────

/*
    WRONG WAY — Promise is still PENDING when you log it
*/
// let response = fetchData();
// console.log(response);  // Promise { <pending> }  ← not useful


/*
    CORRECT WAY — use .then() and .catch()

    .then(fn)   → runs when Promise is FULFILLED (resolve was called)
                  receives the value passed to resolve()
                  whatever you RETURN from .then() → goes to next .then()

    .catch(fn)  → runs when Promise is REJECTED (reject was called)
                  receives the value passed to reject()
                  also catches any error thrown anywhere in the chain
*/

fetchData()
    .then((data) => {
        console.log(data);      // "Data fetched successfully"
        return `harsh`;         // return value → goes to next .then()
    })
    .then((value) => {
        console.log(value);     // "harsh"
    })
    .catch((error) => {
        console.error(error);   // "Error fetching data" (if success = false)
    });

/*
    Flow when success = true:
        resolve("Data fetched successfully")
            ↓
        .then(data) → logs "Data fetched successfully" → returns "harsh"
            ↓
        .then(value) → logs "harsh"
            ↓
        .catch() → skipped (no error)

    Flow when success = false:
        reject("Error fetching data")
            ↓
        .then() → skipped
            ↓
        .catch(error) → logs "Error fetching data"
*/


/*
    SUMMARY
    -------
    - A Promise wraps an async operation and gives back a result later.
    - resolve() → success → .then() gets the value.
    - reject()  → failure → .catch() gets the error.
    - .then() can be chained — return value passes to the next .then().
    - One .catch() at the end handles ALL errors in the chain.
*/