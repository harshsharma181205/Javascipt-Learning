console.log("Hello from script");
// console.log(document);
console.log(document.firstChild);

/* ***window Object — Notes***
Definition
window is the global object provided by the browser. It is the top-level object that contains all global variables, functions, and the DOM itself.

window sabse top-level object hai jo browser deta hai — isme entire page, saare global variables/functions, aur DOM khud reside karta hai.

***Property***
1. window.document - The DOM tree of the current page
2. window.location - Info about the current URL
3. window.innerWidth - Width of the browser viewport
4. window.history - Browser navigation history (back/forward)
5. window.alert - Built-in method to show alert popup



***Implicit window. prefix***
Definition: In global scope, browser-provided objects/methods are automatically accessed without writing window. explicitly — e.g. document.getElementById() is really window.document.getElementById().


***TREE ANALOGY***
window root hai, document uska ek major branch hai jisse DOM tree start hota hai. Isliye document.querySelector() jaisi DOM selection methods asal mein window.document ke methods hain.
*/


/* 
***var vs let/const on window***
Definition: Global variables declared with var become properties of the window object. Variables declared with let/const do NOT attach to window.
*/
var x = 10;
console.log(window.x); // 10

let y = 20;
console.log(window.y); // undefined