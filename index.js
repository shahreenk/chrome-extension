let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads")); // Checks if any leads are in local storage and parses them into an array
const tabBtn = document.getElementById("tab-btn");

if (leadsFromLocalStorage) { // If there are leads in local storage,
    myLeads = leadsFromLocalStorage; // add them to myLeads array.
    render(myLeads); // Calls function that renders out leads
}

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) { // Queries Chrome for the active tab in the current window. When it is found, the function is triggered 
        myLeads.push(tabs[0].url); // adds first item of tabs array to myLeads array
        localStorage.setItem("myLeads", JSON.stringify(myLeads)); // stores myLeads array in local storage
        render(myLeads); // Calls functiont hat renders out leads
    })
})

function render(leads) {
    let listItems = ""; // Creates an empty string for list items
    for (i=0; i < leads.length; i++) { // Iterates through myLeads array
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li> 
        ` 
    } // Adds array items to string with HTML tags
    ulEl.innerHTML = listItems; // Changes HTML content of ulEl to have the list
}

deleteBtn.addEventListener("dblclick", function() { // If delete button is double clicked, 
    localStorage.clear(); // clear local storage
    myLeads = []; // set myLeads to an empty array
    render(myLeads); // clear the DOM by rendering leads with the empty array
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value); // Adds input value to myLeads array
    inputEl.value = ""; // Clears the input field
    localStorage.setItem("myLeads", JSON.stringify(myLeads)); // Stores the myLeads array in local storage
    render(myLeads); // Calls function that renders out leads
})

