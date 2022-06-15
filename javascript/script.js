function add(numOne, numTwo) {
  return numOne + numTwo;
}

function subtract(numOne, numTwo) {
  return numOne - numTwo;
}

function multiply(numOne, numTwo) {
  return numOne * numTwo;
}

function divide(numOne, numTwo) {
  return numOne / numTwo;
}

function operate(operator, numOne, numTwo) {
  if (operator === "+") {
    return add(numOne, numTwo);
  } else if (operator === "-") {
    return subtract(numOne, numTwo);
  } else if (operator === "*") {
    return multiply(numOne, numTwo);
  } else if (operator === "/") {
    if (numTwo===0){
      document.getElementById("displayPad").innerHTML= "You're an irritation";
      reset();
    }
    else{
      return divide(numOne, numTwo);
    }
  }
  else {
    return "Error";
  }
  return secondOperand;
}

const calculator = {
  displayValue: "0",
  firstOperand: null,
  secondOperand: false,
  operator: null,
};

function displayResults() {
  const display = (document.getElementById("displayPad").innerHTML =
    calculator.displayValue);
  if (display.length > 18) {
    return (document.getElementById("displayPad").innerHTML =
      "No. is too large");
  }
  return display;
}

displayResults();

const keys = document.querySelector("#calculator");
keys.addEventListener("click", (event) => {
  const { target } = event;

  if (!target.matches("button")) {
    return;
  }

  if (target.classList.contains("operatorsButtons")) {
    chooseOperator(target.value);
    displayResults();
    return;
  }  

  if (target.classList.contains("clearButton")) {
    reset();
    displayResults();
    return;
  }

  if (target.classList.contains("decimalButton")) {
    addDecimalPoint(target.value);
    displayResults();
    return;
  }

  if (target.classList.contains("backspaceButton")) {
    backspace();
    displayResults();
    return;
  }

  inputNumbers(target.value);
  displayResults();
});

function inputNumbers(number) {
  const { displayValue, secondOperand } = calculator;

  if (secondOperand === true) {
    calculator.displayValue = number;
    calculator.secondOperand = false;
  } else {
    calculator.displayValue =
      displayValue === "0" ? number : displayValue + number;
  }

}

function chooseOperator(selectedOperator) {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  if(selectedOperator==="=" && firstOperand===null){
    reset();
    return;
  }

  if (operator && calculator.secondOperand) {
    calculator.operator = selectedOperator;
    return;
  }

  if (firstOperand === null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const newResult = operate(operator, firstOperand, inputValue);
    calculator.displayValue = `${parseFloat(newResult.toFixed(7))}`;
    calculator.firstOperand = newResult;
  }
  
  calculator.secondOperand = true;
  calculator.operator = selectedOperator;
}

function addDecimalPoint(decimalPoint) {
  if (calculator.secondOperand === true) {
    calculator.displayValue = ".";
    calculator.secondOperand = false;
    return;
  }

  if (!calculator.displayValue.includes(decimalPoint)) {
    calculator.displayValue += decimalPoint;
  }
}

function reset() {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.secondOperand = false;
  calculator.operator = null;
}

function backspace(){
  let backspace = calculator.displayValue.toString().slice(0,-1);
  calculator.displayValue=backspace;
}

document.addEventListener("keydown", (e) =>{
  if(e.key==="1"){
    inputNumbers("1");
    displayResults();
  }
  else if (e.key==="2"){
    inputNumbers("2");
    displayResults();
  }
  else if (e.key==="3"){
    inputNumbers("3");
    displayResults();
  }
  else if (e.key==="4"){
    inputNumbers("4");
    displayResults();
  }
  else if (e.key==="5"){
    inputNumbers("5");
    displayResults();
  }
  else if (e.key==="6"){
    inputNumbers("6");
    displayResults();
  }
  else if (e.key==="7"){
    inputNumbers("7");
    displayResults();
  }
  else if (e.key==="8"){
    inputNumbers("8");
    displayResults();
  }
  else if (e.key==="9"){
    inputNumbers("9");
    displayResults();
  }
  else if (e.key==="0"){
    inputNumbers("0");
    displayResults();
  }
  else if (e.key==="="){
    chooseOperator("+");
  }
  else if (e.key==="-"){
    chooseOperator("-");
  }
  else if (e.key.toLowerCase()==="m" && e.shiftKey){
    chooseOperator("*");
  }
  else if (e.key==="/"){
    chooseOperator("/");
  }
  else if(e.key==="."){
    addDecimalPoint(".");
  }
  else if(e.key==="Backspace"){
    backspace();
    displayResults();
  }
  else if(e.key==="Delete"){
    reset();
    displayResults();
  }
  else if(e.key==="Enter"){
    chooseOperator("=");
    displayResults();
  }
})
