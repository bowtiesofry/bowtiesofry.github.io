// Script to calculate hours.

// Global List to track hours.
var hoursList = [];

// Global time tracker
var totalInMins = 0;

// Variable for counting hours table entries.
var hoursCount = 1;

// Add event listener to add button.
let addbtn = document.getElementById("addbtn");
addbtn.addEventListener("click", addhours);


function addhours() {
    // Store value of time worked from 'index.html'.
    let timeInput = document.getElementById("timeInput").value;

    // Current hours and mins worked.
    let hours = Number(timeInput.split(":")[0]);
    let mins = Number(timeInput.split(":")[1]);

    // Append to global list.
    hoursList.push(`${hours}h ${mins}\'`);

    // Update Total mins.
    totalInMins += (60*hours + mins);

    // Calculate Total Time.
    let totalMins = totalInMins % 60;
    let totalHrs = (totalInMins - totalMins) / 60;

    // Fill row with current hours worked.
    let tableRow = document.createElement("tr");
    tableRow.innerHTML = `<th scope='row'>${hoursCount}</th><td>${`${hours}h ${mins}\'`}</td>`;
    hoursCount++;
    let hoursTable = document.getElementById("hoursTable");
    hoursTable.appendChild(tableRow);

    // Populate total time element on the html document.
    let totalTimeEl = document.getElementById("totalTime");
    totalTime.innerHTML = `${totalHrs}h ${totalMins}\'`
}
