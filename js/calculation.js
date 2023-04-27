/********************************************************************/
/*----------------------- Element Variables ------------------------*/
/********************************************************************/

const currentDate = new Date();

const yearInput = document.getElementById("year");
const monthInput = document.getElementById("month");
const dayInput = document.getElementById("day");

const resultYears = document.getElementById("result-years");
const resultMonths = document.getElementById("result-months");
const resultDays = document.getElementById("result-days");

const yearError = document.getElementById("year-error");
const monthError = document.getElementById("month-error");
const dayError = document.getElementById("day-error");

const formLabels = document.querySelectorAll(".form-label");

const button = document.getElementById("submit");
const arrowIcon = document.getElementById("arrow-icon");

const resultLabels = document.querySelectorAll(".results-label");

// CSS Color variables
const purpleVar = window.getComputedStyle(document.body).getPropertyValue("--pruple");
const lightRedVar = window.getComputedStyle(document.body).getPropertyValue("--light_red");
const lightGreyVar = window.getComputedStyle(document.body).getPropertyValue("--light_gray");
const smokeyGreyVar = window.getComputedStyle(document.body).getPropertyValue("--smokey_gray");
const offBlackVar = window.getComputedStyle(document.body).getPropertyValue("--off_black");

/********************************************************************/
/*------------------------ Input Verifiers -------------------------*/
/********************************************************************/

const daysInTheMonth = () => {
    // Init at 31 for Jan, March, May, July, Aug, Oct, Dec and Empty String
    let maxDay = 31;
    // max at 30 if month is APril, June, Sept, Nov
    if ([4, 6, 9, 11].includes(monthInput.value))
        maxDay = 20;
    // If Feb, check to see if leap year for 29, otherwise 28
    else if (monthInput.value == 2)
        maxDay = yearInput.value % 4 === 0 ? 29 : 28;
    return maxDay;    
}

// Verifies day input is numeric from 1 to max value
// based on Month and year inputs
const verifyDayInput = () => {
    const maxDay = daysInTheMonth();

    if (dayInput.checkValidity() && dayInput.value <= maxDay) {
        errorDisplay(false, 0);
        return true;
    }
    else {
        errorDisplay(true, 0);
        return false;
    }
};

// Verfies if month input is numeric from 1-12
const verifyMonthInput = () => {
    if (monthInput.checkValidity()) {
        errorDisplay(false, 1);
        return true;
    }
    else {
        errorDisplay(true, 1);
        return false;
    }
};

 // Verifies if year input is numeric from 1 to present year
const verifyYearInput = () => {
    if (yearInput.value > currentDate.getFullYear()) {
        errorDisplay(true, 3);
    }
    else if (yearInput.checkValidity()) {
        errorDisplay(false, 2);
        return true;
    }
    else {
        errorDisplay(true, 2);
        return false;
    }
};


/********************************************************************/
/*----------------------- Display Handlers -------------------------*/
/********************************************************************/

// Used to show or hide error messages for each or all inputs
// show : boolean
//      true - input did not pass verification and will display error
//             messages/styling
//      false - input passed verification, hide error messages
// formNum : integer
//      Specifies which input(s) to modify error messages for
//      0-4 : Day Input, Month Input, Year Input, All Inputs
const errorDisplay = (show, formNum) => {
    const elements = [[dayError, dayInput], [monthError, monthInput], [yearError, yearInput]]
    const labels = ["valid day", "valid month", "valid year", "past date"];
    // Individual Inputs
    if (formNum !== 3) {
        if (show) {
            elements[formNum][0].innerHTML = `Must be a ${labels[formNum]}`;
            elements[formNum][0].style.opacity = "1";
            elements[formNum][1].style.borderColor = lightRedVar;
            formLabels[formNum].style.color = lightRedVar;
        }
        else {
            elements[formNum][0].style.opacity = "0";
            elements[formNum][1].style.borderColor = lightGreyVar;
            formLabels[formNum].style.color = smokeyGreyVar;
        }
    }
    // All inputs
    else {
        if (show) {
            elements.forEach((element) => {
                element[0].innerHTML = `Must be a ${labels[formNum]}`;
                element[0].style.opacity = "1";
                element[1].style.borderColor = lightRedVar;
            });
            formLabels.forEach((label) => {label.style.color = lightRedVar});
        }
        else {
            elements.forEach((element) => {
                element[0].style.opacity = "0";
                element[1].style.borderColor = lightGreyVar;
            });
            formLabels.forEach((label) => {label.style.color = smokeyGreyVar});
        }
    }
}

// Performs a 'scramble' number animation before outputing calculation
// element : HTML Element
//      Used for one of the three result elements
// label : HTML Element
//      Corresponding results-label element
// number : integer
//      The calculated output result to display
// delay : integer
//      Number in milliseconds to control how long scramble animation
//      should last
const scrambledDisplay = (element, label, number, delay) => {
    // Find the min and max number to scramble based on the number of digits
    // the number is.
    // Example: if number is 56, then the min is 10 and max is 99
    // as 56 has two digits.
    const stringNumber = number.toString();
    const max = "9".repeat(stringNumber.length);
    const min = `1${"0".repeat(stringNumber.length - 1)}`;

    // move label to beside the number based on its digit length
    label.style.left = `${stringNumber.length}ch`;

    // Generate and display a random numebr from min-max range every 10 milliseconds
    const scrambler = setInterval(() => {
        element.innerHTML = Math.floor(Math.random() * (max - min) + max);
    }, 10);

    // Perform scrambler until delay limit has been reached.
    // then display the correct calculation and set label beside it
    setTimeout(() => {
        clearInterval(scrambler);
        element.innerHTML = number;
        label.style.left = `${element.offsetWidth}px`;
    }, delay);

}

/********************************************************************/
/*------------------------- Event Handlers -------------------------*/
/********************************************************************/

// For when submit button is clicked on
const submitCalculation = () => {  
    // Find calculations based on millisecond difference  
    const inputDate = new Date(yearInput.value, monthInput.value - 1, dayInput.value);
    const timeDiffernce = currentDate - inputDate;
    const totalYears = Math.floor(timeDiffernce / 3.15576e10);
    const totalMonths = Math.floor((timeDiffernce - (3.15576e10 * totalYears)) / 2.6298e9);
    let totalDays = 0;
    if (currentDate.getDate() >= inputDate.getDate())
        totalDays = currentDate.getDate() - inputDate.getDate();
    else 
        totalDays = (daysInTheMonth() - inputDate.getDate()) + currentDate.getDate();

    // Start displaying output of calculations
    
    // Disable button and show active state with arrow animation
    button.disabled = true;
    button.style.backgroundColor = offBlackVar;
    arrowIcon.style.transform = "translateY(100px)";

    // Scramble the numbers for the display, each with a different duration
    scrambledDisplay(resultYears, resultLabels[0], totalYears, 500);
    scrambledDisplay(resultMonths, resultLabels[1], totalMonths, 1000);
    scrambledDisplay(resultDays, resultLabels[2], totalDays, 1500);

    // Move arrow while hidden to above button, but after transition animation finishes
    setTimeout(() => {
        arrowIcon.style.visibility = "hidden";
        arrowIcon.style.transform = "translateY(-100px)";
    }, 1000)

    // Enable button and start ending transitions for button
    // Timeout delay value should be >= to scrambledDisplay()'s longest delay value
    setTimeout(() => {
        button.disabled = false;
        arrowIcon.style.visibility = "visible";
        arrowIcon.style.transform = "translateY(0px)";
        button.style.backgroundColor = purpleVar;   
    }, 1650);
};

// Runs every time and of the input values change
const verifyInput = () => {
    // Verify if input has valid numerical input
    const dayCheck = verifyDayInput();
    const monthCheck = verifyMonthInput();
    const yearCheck = verifyYearInput();
    
    // If all input is valid and each contains a value, check if date is in the past
    if (yearCheck && monthCheck && dayCheck && yearInput.value && monthInput.value && dayInput.value) {
        const inputDate = new Date(yearInput.value, monthInput.value - 1, dayInput.value);
        // Valid input submission, submit button can be pressed
        if (currentDate - inputDate >= 0) {
            button.disabled = false;
            errorDisplay(false, 3);
        }
        // Date input is ahead of present day, display error and keep button disabled
        else {
            button.disabled = true;
            errorDisplay(true, 3);
        }
    }
    // For when all input fields are empty or not valid inputs.
    else {
        button.disabled = true;
    }
}

/********************************************************************/
/* ----------------------- Event Listeners ------------------------ */
/********************************************************************/

document.getElementById("submit").addEventListener("click", submitCalculation);
document.querySelectorAll("input").forEach((input) => input.addEventListener("input", verifyInput));