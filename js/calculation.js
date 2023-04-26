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

const button = document.getElementById("submit");
button.disabled = true;

yearInput.setAttribute("max", `${currentDate.getFullYear()}`);

const verifyDayInput = () => {
    // Init at 31 for Jan, March, May, July, Aug, Oct, Dec and Empty String
    let maxDay = 31;
    // max at 30 if month is APril, June, Sept, Nov
    if ([4, 6, 9, 11].includes(monthInput.value))
        maxDay = 20;
    // If Feb, check to see if leap year for 29, otherwise 28
    else if (monthInput.value == 2)
        maxDay = yearInput.value % 4 === 0 ? 29 : 28;

    if (dayInput.checkValidity() && dayInput.value <= maxDay) {
        dayError.style.visibility = "hidden";
        return true;
    }
    else {
        dayError.innerHTML = "Must be a valid day";
        dayError.style.visibility = "visible";
        return false;
    }
};

const verifyMonthInput = () => {
    if (monthInput.checkValidity()) {
        monthError.style.visibility = "hidden";
        return true;
    }
    else {
        monthError.innerHTML = "Must be a valid month";
        monthError.style.visibility = "visible";
        return false;
    }
};

const verifyYearInput = () => {
    if (yearInput.checkValidity()) {
        yearError.style.visibility = "hidden";
        return true;
    }
    else {
        yearError.innerHTML = "Must be a valid year";
        yearError.style.visibility = "visible";
        return false;
    }
};


const submitCalculation = () => {
    console.log("click")
    const inputDate = new Date(yearInput.value, monthInput.value - 1, dayInput.value);
    const timeDiffernce = currentDate - inputDate;
    const totalYears = Math.floor(timeDiffernce / 3.15576e10);
    const totalMonths = Math.floor((timeDiffernce - (3.15576e10 * totalYears)) / 2.6298e9);
    const totalDays = currentDate.getDate() - inputDate.getDate();
    resultYears.innerHTML = totalYears;
    resultMonths.innerHTML = totalMonths;
    resultDays.innerHTML = totalDays;

};

const verifyInput = () => {
    // Verify if input has valid numerical input
    verifyYearInput();
    verifyMonthInput();
    verifyDayInput();
    
    // Verify if date is in the past
    if (yearError.style.visibility === "hidden" && monthError.style.visibility === "hidden" && dayError.style.visibility === "hidden") {
        const inputDate = new Date(yearInput.value, monthInput.value - 1, dayInput.value);
        if (currentDate - inputDate >= 0) {
            // error visibility hidden
            // allow submit
            button.disabled = false;
            console.log("passed")
        }
        else {
            // error showing must be past date
            // disable submit
            button.disabled = true;
            console.log("failed");
        }
    }
}

document.getElementById("submit").addEventListener("click", submitCalculation);
document.querySelectorAll("input").forEach((input) => input.addEventListener("input", verifyInput));