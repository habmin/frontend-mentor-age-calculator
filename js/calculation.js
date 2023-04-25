const currentDate = new Date();

const yearInput = document.getElementById("year");
const monthInput = document.getElementById("month");
const dayInput = document.getElementById("day");

const yearError = document.getElementById("year-error");
const monthError = document.getElementById("month-error");
const dayError = document.getElementById("day-error");

const verifyDayInput = () => {

};

const verifyMonthInput = () => {

};

const verifyYearInput = () => {
    console.log(yearInput.checkValidity(), yearInput.value);
    console.log(yearInput.checkValidity() && yearInput.value !== "" && (yearInput.value < 1 || yearInput.value > currentDate.getFullYear()));
    // Valid States
    // 1. checkValidity and empty
    // 2. check Vallidity and in range
    // Invalid states
    // 1. check validity fails (non-number in input)
    
    // 2. check validity passes but input in not in range
    if (yearInput.checkValidity() && yearInput.value !== "" && (yearInput.value < 1 || yearInput.value > currentDate.getFullYear())) {
        yearError.innerHTML = "Must be in the past";
        yearError.style.visibility = "visible";
    }
    else if (yearInput.checkValidity()) {
        yearError.style.visibility = "hidden";
    }
    else if (!yearInput.checkValidity()) {
        yearError.innerHTML = "Not a valid number";
        yearError.style.visibility = "visible";
    }
};

const submitCalculation = () => {
    console.log("submit");
}

const trimLetters = (event) => {
    console.log(event.target.value, event.target.checkValidity());
}

document.getElementById("submit").addEventListener("click", submitCalculation);
yearInput.addEventListener("input", verifyYearInput);
