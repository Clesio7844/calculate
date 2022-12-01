//Object Value

const calculator= {
  displayValue: '0',
  firstOperator: 'null',
  waitingForSecondOperand: false,
  operator: null,
}

// Display

const updateDisplay =  () => {
    const display = document.querySelector('.screen')
    display.value = calculator.displayValue
}

updateDisplay()

// Handle Key Presses

const keys = document.querySelector('.keys');
keys.addEventListener('click', (event) => {
    const { target } = event;
    if(!target.matches('button')) {
        return;
    }

    if(target.classList.contains('operator')){
        handleOperator(target.value)
        updateDisplay();
        return;
    }

    if(target.classList.contains('decimal')){
        inputDecimal(target.value)
        updateDisplay()
        return
    }

    if(target.classList.contains('all-clear')){
        resetCalculator()
        updateDisplay()
        return
    }

    inputDigit(target.value)
    updateDisplay()
})

// Input Digital
const inputDigit = (digit) => {
    const { displayValue, waitingForSecondOperand } = calculator;

    if(waitingForSecondOperand === true){
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    }else{
        calculator.displayValue = displayValue === '0' ? digit: displayValue + digit
    }
}

// Input Decimal
const inputDecimal = (dot) => {
    if(calculator.waitingForSecondOperand === true){
        calculator.displayValue = '0.';
        calculator.waitingForSecondOperand = false
        return

    }

    if(!calculator.displayValue.includes(dot)){
     calculator.displayValue +=dot
    }
}

const handleOperator = (nextOperator) => {
    const {firstOperator, displayValue, operator} = calculator
   const inputValue = parseFloat(displayValue)

   if(operator && calculator.waitingForSecondOperand){
     calculator.operator = nextOperator;
     return
   }

   if(firstOperator == null && !isNaN(inputValue)){
    calculator.firstOperator = inputValue
   } else if(operator) {
    const result = calculate(firstOperator, inputValue, operator)

    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperator = result;
   }

   calculator.waitingForSecondOperand = true;
   calculator.operator = nextOperator
}


// calculator logic

const calculate = (firstOperand, secondOperand, operator) => {
  if(operator === '+'){
    return firstOperand + secondOperand
    
  }else if(operator === '-'){
    return firstOperand - secondOperand  
  }else if(operator === '*'){
    return firstOperand * secondOperand
  }else if(operator === '/'){
    return firstOperand / secondOperand
  }
  return secondOperand
}

const resetCalculator = () => {
  calculator.displayValue = '0';
  calculator.firstOperator = 'null';
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}