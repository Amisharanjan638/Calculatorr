let display = document.getElementById('display');
let currentInput = '';
let shouldResetDisplay = false;

function appendToDisplay(value) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
        display.classList.remove('error');
    }
    
    
    if (isOperator(value) && isOperator(currentInput.slice(-1))) {
        return;
    }
    
    
    if (value === '.') {
        let lastNumber = getLastNumber();
        if (lastNumber.includes('.')) {
            return;
        }
    }
    
    
    if (value === '×') {
        value = '*';
    }
    
    currentInput += value;
    display.value = currentInput.replace(/\*/g, '×');
}

function clearDisplay() {
    currentInput = '';
    display.value = '';
    display.classList.remove('error');
}

function deleteLast() {
    if (shouldResetDisplay) {
        clearDisplay();
        return;
    }
    
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput.replace(/\*/g, '×');
    display.classList.remove('error');
}

function calculate() {
    if (currentInput === '') {
        return;
    }
    
    try {
        
        let expression = currentInput.replace(/[+\-*/]$/, '');
        
        
        let result = eval(expression);
        
        
        if (!isFinite(result)) {
            throw new Error('Invalid calculation');
        }
        
        
        if (Number.isInteger(result)) {
            display.value = result.toString();
        } else {
            display.value = parseFloat(result.toFixed(10)).toString();
        }
        
        currentInput = display.value;
        shouldResetDisplay = true;
        
    } catch (error) {
        display.value = 'Error';
        display.classList.add('error');
        currentInput = '';
        shouldResetDisplay = true;
    }
}

function isOperator(char) {
    return ['+', '-', '*', '/', '×'].includes(char);
}

function getLastNumber() {
    let numbers = currentInput.split(/[+\-*/]/);
    return numbers[numbers.length - 1];
}


document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9' || key === '.') {
        appendToDisplay(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        let operator = key === '*' ? '×' : key;
        appendToDisplay(operator);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    } else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    }
});


display.addEventListener('keydown', function(event) {
    event.preventDefault();
});