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

const purpleVar = window.getComputedStyle(document.body).getPropertyValue("--pruple");
const lightRedVar = window.getComputedStyle(document.body).getPropertyValue("--light_red");
const lightGreyVar = window.getComputedStyle(document.body).getPropertyValue("--light_gray");
const smokeyGreyVar = window.getComputedStyle(document.body).getPropertyValue("--smokey_gray");
const offBlackVar = window.getComputedStyle(document.body).getPropertyValue("--off_black");

const errorDisplay = (show, formNum) => {
    const elements = [[dayError, dayInput], [monthError, monthInput], [yearError, yearInput]]
    const labels = ["valid day", "valid month", "valid year", "past date"];
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
        errorDisplay(false, 0);
        return true;
    }
    else {
        errorDisplay(true, 0);
        return false;
    }
};

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


const scrambledDisplay = (element, label, number, delay) => {
    const stringNumber = number.toString()
    label.style.left = `${stringNumber.length}ch`;
    const max = "9".repeat(stringNumber.length);
    const min = `1${"0".repeat(stringNumber.length - 1)}`;
    const scrambler = setInterval(() => {
        element.innerHTML = Math.floor(Math.random() * (max - min) + max);
    }, 10);
    setTimeout(() => {
        clearInterval(scrambler);
        element.innerHTML = number;
        label.style.left = `${element.offsetWidth}px`;
    }, delay);

}

const submitCalculation = async () => {    
    const inputDate = new Date(yearInput.value, monthInput.value - 1, dayInput.value);
    const timeDiffernce = currentDate - inputDate;
    const totalYears = Math.floor(timeDiffernce / 3.15576e10);
    const totalMonths = Math.floor((timeDiffernce - (3.15576e10 * totalYears)) / 2.6298e9);
    const totalDays = currentDate.getDate() - inputDate.getDate();
    
    button.disabled = true;
    button.style.backgroundColor = offBlackVar;
    arrowIcon.style.transform = "translateY(100px)";

    scrambledDisplay(resultYears, resultLabels[0], totalYears, 500);
    scrambledDisplay(resultMonths, resultLabels[1], totalMonths, 1000);
    scrambledDisplay(resultDays, resultLabels[2], totalDays, 1500);

    setTimeout(() => {
        arrowIcon.style.visibility = "hidden";
        arrowIcon.style.transform = "translateY(-100px)";
    }, 1000)

    setTimeout(() => {
        button.disabled = false;
        arrowIcon.style.visibility = "visible";
        arrowIcon.style.transform = "translateY(0px)";
        button.style.backgroundColor = purpleVar;   
    }, 1650);

};

const verifyInput = () => {
    // Verify if input has valid numerical input
    const dayCheck = verifyDayInput();
    const monthCheck = verifyMonthInput();
    const yearCheck = verifyYearInput();
    
    // Verify if date is in the past
    if (yearCheck && monthCheck && dayCheck && yearInput.value && monthInput.value && dayInput.value) {
        const inputDate = new Date(yearInput.value, monthInput.value - 1, dayInput.value);
        if (currentDate - inputDate >= 0) {
            button.disabled = false;
            errorDisplay(false, 3);
        }
        else {
            button.disabled = true;
            errorDisplay(true, 3);
        }
    }
    else {
        button.disabled = true;
    }
}

document.getElementById("submit").addEventListener("click", submitCalculation);
document.querySelectorAll("input").forEach((input) => input.addEventListener("input", verifyInput));