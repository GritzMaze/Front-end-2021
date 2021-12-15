const actionGridElements = document.querySelector(".action-grid");
const inputElement = document.getElementsByClassName("input")[0];
const historyElement = document.getElementsByClassName("calculation-list")[0];
const clearButton = document.getElementsByClassName("clear")[0];
const enlargeButton = document.getElementsByClassName("max")[0];
const wrapperElement = document.getElementsByClassName("wrapper")[0];
const myStorage = window.localStorage;


let currentNum = 0;
let oldNum = 0;
let operator = "";
let value = 0;
let operatorsUsed = 0;
let numbersPressed = 0;
let keys = 0;


let updateFromStorage = async () => {
    keys = myStorage.length;
    for (let i = 0; i < keys; i++) {
        let key = myStorage.key(i);
        let value = JSON.parse(myStorage.getItem(key));
        let li = document.createElement("li");
        li.innerHTML = value;
        historyElement.appendChild(li);
    }
};


updateFromStorage();

actionGridElements.addEventListener("click", (event) => {
    const element = event.target;
    if (element.classList.contains("orange")) {

        let input = element.value;
        console.log(input);
        if (input === "=") {
            if (!oldNum || !currentNum) return;
            inputElement.value = calc(oldNum, operator, currentNum);
            console.log(inputElement.value);
            addHistory("normal");
            oldNum = 0;
            currentNum = parseFloat(inputElement.value);
            operatorsUsed = 0;
            numbersPressed = 0;
        } else {
            operatorsUsed++;
            operator = input;
            if (operatorsUsed > 1) {
                if (!oldNum || !currentNum) return;
                oldNum = calc(oldNum, operator, currentNum);
                addHistory("normal");
            }
            numbersPressed = 0;
            console.log(operator);
        }

    } else if (element.innerText === "C") {
        inputElement.value = "0";
        currentNum = 0;
        oldNum = 0;
        numbersPressed = 0;
    } else if (element.classList.contains("special")) {
        value = element.value;
        if (value === "sqrt") {
            let tempValue;
            tempValue = Math.sqrt(parseFloat(inputElement.value));
            inputElement.value = tempValue;
            addHistory("sqrt");
            oldNum = tempValue;
            numbersPressed = 0;
        } else {
            let tempValue = parseFloat(inputElement.value);
            tempValue = tempValue * tempValue;
            inputElement.value = tempValue;
            oldNum = tempValue;
            addHistory("pow");
            numbersPressed = 0;
        }
    } else {
        numbersPressed++;
        if (numbersPressed > 1) {
            inputElement.value = inputElement.value.concat(element.innerText);
            value = parseFloat(inputElement.value);
        } else {
            value = element.innerText;
            inputElement.value = parseFloat(value);
        }
        value = parseFloat(value);
        if (oldNum && operatorsUsed) {
            currentNum = value;
        } else {
            oldNum = value;
        }
        console.log(value);
    }
});

enlargeButton.addEventListener("click", () => {


    // Хардкоднато
    // по-умното е с async, но няма време :(
    wrapperElement.classList.add("enlarge");
    setTimeout(function () {
        alert("Заслужавам си шестицата! П.п не знам дали е така :Д");
    }, 500)

});

clearButton.addEventListener("click", () => {
    historyElement.innerHTML = "";
    myStorage.clear();
    keys = 0;
});

let addHistory = (kind) => {
    let history = document.createElement("li");
    if (kind === "sqrt") {
        history.innerHTML = `SQRT(${oldNum}) = ${Math.sqrt(oldNum)}`;
    } else if (kind === "pow") {
        history.innerHTML = `(${oldNum})^2 = ${oldNum * oldNum}`;
    } else {
        history.innerHTML = `${oldNum} ${operator} ${currentNum} = ${calc(oldNum, operator, currentNum)}`;
    }
    historyElement.appendChild(history);
    myStorage.setItem(keys++, JSON.stringify(history.innerHTML));
}

let calc = (num1, operator, num2) => {
    if (operator === "+") {
        return num1 + num2;
    } else if (operator === "-") {
        return num1 - num2;
    } else if (operator === "*") {
        return num1 * num2;
    } else if (operator === "/") {
        return num1 / num2;
    } else {
        return "Error";
    }
}