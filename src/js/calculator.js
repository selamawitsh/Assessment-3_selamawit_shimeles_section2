const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const equalsButton = document.getElementById("equals");
const clearButton = document.getElementById("clear");

let currentInput = ""; 
let previousInput = ""; 
let operator = null;

const updateDisplay = (value) => {
    display.value = value;
};

const handleButtonClick = (e) => {
    const value = e.target.getAttribute("data-value");

    if (!isNaN(value) || value === ".") {
        currentInput += value;
        updateDisplay(previousInput + (operator || "") + currentInput); 
    } else if (["+", "-", "*", "/"].includes(value)) {
        if (currentInput === "" && previousInput === "") return; 

        if (currentInput !== "" && previousInput !== "") {
            calculate(); 
        }

        operator = value;
        previousInput = currentInput || previousInput
        currentInput = "";
        updateDisplay(previousInput + operator); 
    }
};


const calculate = () => {
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(curr)) return;

    let result;
    switch (operator) {
        case "+":
            result = prev + curr;
            break;
        case "-":
            result = prev - curr;
            break;
        case "*":
            result = prev * curr;
            break;
        case "/":
            result = curr === 0 ? "Error" : prev / curr;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = null; 
    previousInput = result.toString(); 
    updateDisplay(currentInput);
};


buttons.forEach((button) => {
    button.addEventListener("click", handleButtonClick);
});

equalsButton.addEventListener("click", () => {
    if (operator && currentInput !== "") {
        calculate();
    }
});

clearButton.addEventListener("click", () => {
    currentInput = "";
    previousInput = "";
    operator = null;
    updateDisplay("");
});
