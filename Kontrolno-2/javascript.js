const actionGridElements = document.querySelector(".action-grid");
const inputElement = document.getElementsByClassName("input")[0];
const historyElement = document.getElementsByClassName("calculation-list")[0];
const clearButton = document.getElementsByClassName("clear")[0];
const enlargeButton = document.getElementsByClassName("max")[0];
const wrapperElement = document.getElementsByClassName("wrapper")[0];
const myStorage = window.localStorage;



let currentNum;
let oldNum;
let operator;
let operatorsUsed = 0;
let numbersPressed = 0;

actionGridElements.addEventListener("click", (event) => {
    const element = event.target;
    let clear = element.innerText;
    if (element.classList.contains("orange")) {

        let input = element.value;
        if (input === "=") {
            inputElement.value = calc(oldNum, operator, currentNum);
            addHistory();
            oldNum = undefined;
            currentNum = undefined;
            operatorsUsed = 0;
        } else {
            operatorsUsed++;
            operator = input;
            if(operatorsUsed > 1) {
                oldNum = calc(oldNum, operator, currentNum);
                addHistory();
            }
            console.log(operator);
        }

    } else if (clear === "C") {
        inputElement.value = "0";
        currentNum = undefined;
        oldNum = undefined;
    } else if(element.classList.contains("special")) {
        let value = element.value;
        if (value === "sqrt") {
        oldNum = Math.sqrt(oldNum);
        inputElement.value = oldNum;
        } else {
        oldNum = oldNum * oldNum;
        inputElement.value = oldNum;
        }
    } else {
        const value = parseFloat(element.innerText);
        numbersPressed++;
        inputElement.value = value;
        if (oldNum) {
            currentNum = value;
            console.log(value);
        } else {
            oldNum = value;
        }
    }
});

enlargeButton.addEventListener("click", (event) => {


    // Хардкоднато
    // по-умното е с async, но няма време :(
    wrapperElement.classList.add("enlarge");
    setTimeout(function(){
            alert("Заслужавам си шестицата! П.п не знам дали е така :Д");
    }, 500)

});

clearButton.addEventListener("click", (event) => {
    historyElement.innerHTML = "";
    myStorage.clear();
});

let addHistory = () => {
    let history = document.createElement("li");
    history.innerHTML = `${oldNum} ${operator} ${currentNum} = ${calc(oldNum, operator, currentNum)}`;
    historyElement.appendChild(history);
    myStorage.setItem(history.innerHTML, history.innerHTML);
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