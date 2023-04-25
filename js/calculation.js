const currentDate = new Date();

const yearInput = document.getElementById("year");
const monthInput = document.getElementById("month");
const dayInput = document.getElementById("day");

const yearError = document.getElementById("year-error");
const monthError = document.getElementById("month-error");
const dayError = document.getElementById("day-error");

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
    else if (!monthInput.checkValidity()) {
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
    else if (!yearInput.checkValidity()) {
        yearError.innerHTML = "Must be a valid year";
        yearError.style.visibility = "visible";
        return false;
    }
};


const submitCalculation = () => {
    console.log("submit");
};

const verifyInput = (event) => {
    // Verify if input has valid numerical input
    verifyYearInput();
    verifyMonthInput();
    verifyDayInput();

    // Verify if date is in the past
    const inputDate = new Date(yearInput.value, monthInput.value - 1, dayInput.value);
    const timeDiffernce = currentDate - inputDate;
    if (timeDiffernce >= 0) {
        console.log("passed")
    }
    else {
        console.log("failed");
    }
    console.log("seconds", timeDiffernce / 1000);
    const totalYears = Math.floor(timeDiffernce / 3.15576e10);
    const totalMonths = Math.floor((timeDiffernce - (3.15576e10 * totalYears)) / 2.6298e9);
    const totalDays = currentDate.getDate() - inputDate.getDate();
    console.log("year", totalYears);
    console.log("month", totalMonths);
    console.log("day", totalDays);
};

document.getElementById("submit").addEventListener("click", submitCalculation);
document.querySelectorAll("input").forEach((input) => input.addEventListener("input", verifyInput));