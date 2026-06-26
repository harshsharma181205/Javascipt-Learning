// For each example tell me what should i do from this , its applications
// Example 1

document.getElementById("changeTextButton").addEventListener("click", function () {
    // console.log(this);// output is <button id="changeTextButton">Change Text</button>
    // Simple function is pointing to current context who is calling it.

    /*if we use arrow function instead of simple function 
     it give a window object , this is pointing to global this
    */
    let paragraph = document.getElementById("myParagraph");
    console.log(paragraph);
    // let original = paragraph.textContent;
    paragraph.textContent = "The paragraph is change"
});


//Example 2

document.getElementById("highlightFirstCity").addEventListener("click",function () {
    let citiesList = document.getElementById("citiesList");
    citiesList.firstElementChild.classList.add("highlight");
});

// element.classList.add("highlight");     // adds the class
// element.classList.remove("highlight");  // removes the class
// element.classList.toggle("highlight");  // adds if not present, removes if present
// element.classList.contains("highlight"); // returns true/false — does it have this class?

//Example 3

document.getElementById("changeOrder").addEventListener("click",function () {
    let type = document.getElementById("coffeeType");
    type.textContent = "Espresso";
    type.style.backgroundColor = "brown";
    type.style.padding = "5px";
});
// Real world application: Updating a live order summary on a food delivery app — item name, price, and styling all change based on what user selects.

//Example 4

document.getElementById("addNewItem").addEventListener("click", function () {
    let newItem = document.createElement('li');
    newItem.textContent = "Eggs";

    document.getElementById("shoppingList").appendChild(newItem);
})


//Example 5
document.getElementById("removeLastTask").addEventListener("click", function () {
    let taskToRemove = document.getElementById("taskList");
    taskToRemove.lastElementChild.remove();
});


//Example 6

document.getElementById("clickMeButton").addEventListener("click", function () {
    alert("chaiCode")
})


//Example 7

document.getElementById("teaList").addEventListener("click", function (event) {
    if(event.target && event.target.matches(".teaItem")){
        alert("You selected: "+event.target.textContent)
    }
});


//Example 8
// Exercise - How to grab the label??
// note - i am struggled in this part i have to more emphasis on it when i revise it or study it by claude
document.getElementById("feedbackForm").addEventListener("submit", function (event) {
    event.preventDefault();
    let feedback = document.getElementById("feedbackInput").value;
    console.log(feedback);
    document.getElementById("feedbackDisplay").textContent = `Feedback is: ${feedback}`// how to make it little bit bigger, background colour..
})
// step 1 -  to stop the default behaviour of the form which is submit, so the event behaviour in this case is to have a default behaviour to submit it


//Example 9

document.addEventListener("DOMContentLoaded", function    () {
    document.getElementById('domStatus').textContent = "Dom Fully loaded"
});


//Example 10

document.getElementById("toggleHighlight").addEventListener("click", function () {
    let description = document.getElementById("descriptionText");
    descriptionText.classList.add('highlight') 
})


// What is nodelist ??