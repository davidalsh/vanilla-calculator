class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.currentOperandTextElement = currentOperandTextElement;
    this.previousOperandTextElement = previousOperandTextElement;
    this.reset();
  }

  reset() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    if (this.currentOperand) {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
      this.updateDisplay();
    }
  }

  appendNumber(number) {
    if (number === "0" && this.currentOperand === "0") return;
    if (number === "." && this.currentOperand.includes(".")) return;
    if (this.previousOperand && !this.operation) this.previousOperand = "";
    this.currentOperand += number;
    this.updateDisplay();
  }

  setOperation(operation) {
    if (this.currentOperand) {
      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = "";
      this.updateDisplay();
    } else if (this.previousOperand) {
      this.operation = operation;
      this.updateDisplay();
    }
  }

  compute() {
    if (this.previousOperand && this.currentOperand) {
      let result;
      const prevValue = parseFloat(this.previousOperand);
      const currValue = parseFloat(this.currentOperand);
      switch (this.operation) {
        case "+":
          result = prevValue + currValue;
          break;
        case "-":
          result = prevValue - currValue;
          break;
        case "*":
          result = prevValue * currValue;
          break;
        case "÷":
          result = prevValue / currValue;
          break;
        default:
          return;
      }
      this.previousOperand = result;
      this.currentOperand = "";
      this.operation = undefined;
      this.updateDisplay();
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand;
    this.previousOperandTextElement.innerText = this.operation
      ? `${this.previousOperand} ${this.operation}`
      : this.previousOperand;
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const clearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.setOperation(button.innerText);
  });
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
});

clearButton.addEventListener("click", () => {
  calculator.reset();
  calculator.updateDisplay();
});
