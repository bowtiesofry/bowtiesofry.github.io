// Script to calculate hours //

// Global List to track hours for the table.
var hoursList = [];

// Global object to track total time.
var totTime = {
    hours : 0,
    mins : 0,
    secs : 0,

    // Methods to update the member values.
    updateHours : function(hours) {
        this.hours += hours;
    },

    updateMins : function(mins) {
        // Initialise tmp variable to store sum stored total mins and usr mins.
        let sumMins = 0
        sumMins = this.mins + mins;

        // If the variable is > 60.
        if (sumMins >= 60) {
            // Update Hours
            this.hours++;
            // Update temp variable.
            sumMins -= 60;
            // Update mins
            this.mins = sumMins;
        } else {
            this.mins = sumMins;
        }
    },

    updateSecs : function(secs) {
        // Initialise temp variable
        let sumSecs = 0;
        sumSecs = this.secs + secs;

        // If the usr seconds + total seconds is > 60.
        if (sumSecs >= 60) {
            // Update minutes.
            this.mins++;
            // Update sumSecs.
            sumSecs -= 60;
            // Update seconds.
            this.secs = sumSecs;
        } else {
            this.secs = sumSecs;
        }
    }
};

// Variable for counting hours table entries.
var hoursCount = 1;

// Add event listener to add button.
let addbtn = document.getElementById("addbtn");
addbtn.addEventListener("click", addhours);

function addhours() {
    // Store elements in variables.
    let hoursEl = document.getElementById("hoursInput");
    let minsEl = document.getElementById("minsInput");
    let secsEl = document.getElementById("secsInput");

    // Create usrTime object to store user input.
    let usrTime = {
        hours : Number(hoursEl.value),
        mins : Number(minsEl.value),
        secs : Number(secsEl.value)
    };

    // If input is 00:00:00 or less - return.
    if (usrTime.hours <= 0 && usrTime.mins <= 0 && usrTime.secs <= 0) {
        console.log("Time must be a positive value");
        return -1;
    }

    // If inputed mins or seconds are more than 59 - return.
    if (usrTime.mins > 59 || usrTime.secs > 59) {
        console.log("Minutes and seconds must be less than 60.")
        return -1;
    }


    // Append to global list.
    hoursList.push(`${usrTime.hours}h ${usrTime.mins}\' ${usrTime.secs}\"`);

    // Update total time.
    totTime.updateSecs(usrTime.secs);
    totTime.updateMins(usrTime.mins);
    totTime.updateHours(usrTime.hours);

    // Fill row with current hours worked.
    let tableRow = document.createElement("tr");
    tableRow.innerHTML = `<th scope='row'>${hoursCount}</th><td>${`${usrTime.hours}h ${usrTime.mins}\' ${usrTime.secs}\"`}</td>`;
    hoursCount++;
    let hoursTable = document.getElementById("hoursTable");
    hoursTable.appendChild(tableRow);

    // Populate total time element on the html document.
    let totalTimeEl = document.getElementById("totalTime");
    totalTime.innerHTML = `${totTime.hours}h ${totTime.mins}\' ${totTime.secs}\"`

    // Reset values of input elements.
    hoursEl.value = "0";
    minsEl.value = "0";
    secsEl.value = "0";
}
