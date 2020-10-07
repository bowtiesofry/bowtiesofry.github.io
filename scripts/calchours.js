// Script to calculate hours //

// Global Array to track hours for the table. Initialised to contain a blank
// first member. Row entry IDs will start from 1.
let hoursList = [""];

// Global object to track total time.
let totTime = {
    hours: 0,
    mins: 0,
    secs: 0,

    // Methods to update the member values.
    updateHours: function(hours) {
        let sumHours = this.hours + hours;
        if (sumHours >= 0) {
            this.hours = sumHours;
        } else {
            console.log("Error: Total Hours worked below zero.");
            return -1;
        }
    },
    updateMins: function(mins) {
        // Initialise tmp variable to store sum stored total mins and usr mins.
        let sumMins = this.mins + mins;

        // If the variable is > 60.
        if (sumMins >= 60) {
            // Update Hours
            this.hours++;
            // Update temp variable.
            sumMins -= 60;
            // Update mins
            this.mins = sumMins;
        } else if (sumMins < 0) {
            // Take an hour
            this.hours--;

            sumMins += 60;
            this.mins = sumMins;
        } else {
            this.mins = sumMins;
        }
    },
    updateSecs: function(secs) {
        // Initialise temp variable
        let sumSecs = this.secs + secs;

        // If the usr seconds + total seconds is > 60.
        if (sumSecs >= 60) {
            // Update minutes.
            this.mins++;
            // Update sumSecs.
            sumSecs -= 60;
            // Update seconds.
            this.secs = sumSecs;
        // If sumSecs is negative
        } else if (sumSecs < 0){
            // Take a minute.
            this.mins--;

            sumSecs += 60;
            this.secs = sumSecs;
        } else {
            this.secs = sumSecs;
        }
    }
};

// Variable used to assign row entry IDs.
let hoursCounter = 1;

// Add event listener to add button.
let addbtn = document.getElementById("addbtn");
addbtn.addEventListener("click", addhours);

// Populate total time element on the html document.
function updateTotTimeElement() {
    const totalTimeEl = document.getElementById("totalTime");
    totalTime.innerHTML = `${totTime.hours}h ${totTime.mins}\' ${totTime.secs}\"`
}

// Add hours worked to the hours list table.
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

    // Create tr element for new hours worked row.
    const tr = document.createElement("tr");
    tr.id = (`hours-${hoursCounter}`);

    // Create inner elements of tr.
    const th = document.createElement("th");
    const th_text = document.createTextNode(`${hoursCounter}`);
    th.appendChild(th_text);

    const td = document.createElement("td");
    const td_text = document.createTextNode(`${usrTime.hours}h ${usrTime.mins}\' ${usrTime.secs}\"`);
    td.appendChild(td_text);


    const tdRemoveBtn = document.createElement("td");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.id = `removeBtn-${hoursCounter}`;
    btn.setAttribute("class", "removeBtn btn btn-outline-light btn-sm");
    const btn_text = document.createTextNode("Remove");
    btn.appendChild(btn_text);
    tdRemoveBtn.appendChild(btn);

    // Add event listener to remover buttons on each added row.
    btn.addEventListener("click", removeHours);

    // Add inner elements to the tr row element.
    tr.appendChild(th);
    tr.appendChild(td);
    tr.appendChild(tdRemoveBtn);

    tr.classList.add("hoursrow");

    // Add the created row to table.
    const hoursTableBody = document.getElementById("hoursTableBody");
    hoursTableBody.appendChild(tr);

    // Call function to update total time on the document.
    updateTotTimeElement();

    // Reset values of input elements.
    hoursEl.value = "0";
    minsEl.value = "0";
    secsEl.value = "0";

    // Update hours counter for table list.
    hoursCounter++;
}

// Remove row of hours when it's remove button is clicked
function removeHours(ev) {

    // Declare hours to be deleted object
    let toBeDeletedTime = {
        hours: 0,
        mins: 0,
        secs: 0
    };

    // Stops it clicking again if it's a but
    ev.preventDefault();

    // Set current element to the button that fired the event.
    let currentEl = ev.target;

    // Set class to search the caller element's parents for.
    let classNameToBeFound = "hoursrow";

    // Variable to check if the class has been found in the DOM above the button.
    let isClassFound = false;

    // While the current element does not have a class = 'hoursrow'
    while (!isClassFound) {

        // If current element is the html tag - break out of while.
        if (currentEl.tagName.toUpperCase() === 'HTML') {
            break;
        }

        // Get current element's classes and put it into an array.
        let classNameArray = currentEl.classList;

        // Cycle through class names of the element
        for (let i = 0; i < classNameArray.length; i++) {
            // If class is equal to the class we're looking for
            if (classNameArray[i] === classNameToBeFound) {
                isClassFound = true;
                break;
            }
        }

        if (isClassFound) {
            break;
        } else {
            // Else keep searching the dom.
            currentEl = currentEl.parentElement;
        }
    }

    // Declare and initialise row to be deleted to current element.
    let rowToBeDeletedEL = currentEl;

    // Get row id   number from ID (Get the number after the -).
    let row_id = rowToBeDeletedEL.id.split("-")[1];

    // Store time to be removed
    let timeToBeRemoved = hoursList[row_id];

    // Split hours to be deleted string by space and remove the unit (e.g. h)
    toBeDeletedTime.hours = timeToBeRemoved.split(" ")[0].slice(0,-1);
    toBeDeletedTime.mins = timeToBeRemoved.split(" ")[1].slice(0,-1);
    toBeDeletedTime.secs = timeToBeRemoved.split(" ")[2].slice(0,-1);

    // Make entry for hours list blank at that ID.
    hoursList[row_id] = "";

    // Recalculate total hours. (Note minus signs)
    totTime.updateHours(-toBeDeletedTime.hours);
    totTime.updateMins(-toBeDeletedTime.mins);
    totTime.updateSecs(-toBeDeletedTime.secs);

    // Call function to update total time on the document.
    updateTotTimeElement();

    // Delete row.
    rowToBeDeletedEL.remove();
}
