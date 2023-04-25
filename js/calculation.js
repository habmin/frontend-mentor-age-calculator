const currentDate = new Date();
const yearInput = document.getElementById("year");

const verifyDayInput = () => {

};

const verifyMonthInput = () => {

};

const verifyYearInput = () => {
    if (yearInput.value == "")
        console.log("Empty");
    else if (!yearInput.checkValidity())
        console.log("Not a valid number");
    else if (yearInput.value < 1 || yearInput.value > currentDate.getFullYear())
        console.log("Must be in the past");
};

const submitCalculation = () => {
    console.log("submit");
}

const trimLetters = (event) => {
    console.log(event.target.value, event.target.checkValidity());
}

document.getElementById("submit").addEventListener("click", submitCalculation);
yearInput.addEventListener("input", verifyYearInput);
