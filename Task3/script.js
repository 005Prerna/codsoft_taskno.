const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currInput = '';
let operator = '';
let operand1 = '';
let operand2 = '';
let resultDisplay = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        const id = button.id;

        if (id === 'clear') {
            clearCal();
            return;
        }

        if (id === 'equal') {
            if (currInput === '' || operand1 === '' || operator === '') return;
            operand2 = currInput;
            performCal();
            resultDisplay = true;
            return;
        }

        
        if ((value >= '0' && value <= '9') || value === '.') {
            if (resultDisplay) {
                currInput = value;
                resultDisplay = false;
            } else {
                currInput += value;
            }
            display.innerText = currInput;
            return;
        }

        
        if (value === '+' || value === '-' || value === '*' || value === '/') {
            if (operand1 && operator && currInput) {
                operand2 = currInput;
                performCal();
            } else if (currInput !== '') {
                operand1 = currInput;
            }
            operator = value;
            currInput = '';
        }
    });
});

function performCal() {
    const num1 = parseFloat(operand1);
    const num2 = parseFloat(operand2);
    let result = 0;

    if (operator === '+') result = num1 + num2;
    else if (operator === '-') result = num1 - num2;
    else if (operator === '*') result = num1 * num2;
    else if (operator === '/') result = num2 === 0 ? 'Error' : num1 / num2;

    display.innerText = result;
    operand1 = result.toString();
    currInput = '';
    operator = '';
}

function clearCal() {
    currInput = '';
    operand1 = '';
    operand2 = '';
    operator = '';
    resultDisplay = false;
    display.innerText = '0';
}
