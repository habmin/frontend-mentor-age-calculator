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
    // if (monthInput.checkValidity() && monthInput.value !== "" && (monthInput.value < 1 || monthInput.value > 12)) {
    //     monthError.innerHTML = "Not a valid month";
    //     monthError.style.visibility = "visible";
    // }
    if (monthInput.checkValidity()) {
        monthError.style.visibility = "hidden";
    }
    else if (!monthInput.checkValidity()) {
        monthError.innerHTML = "Not a valid month";
        monthError.style.visibility = "visible";
    }
};

const verifyYearInput = () => {
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
monthInput.addEventListener("input", verifyMonthInput);
yearInput.addEventListener("input", verifyYearInput);
