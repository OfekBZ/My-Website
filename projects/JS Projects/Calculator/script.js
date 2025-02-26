// Select DOM elements
const numberButtons = document.querySelectorAll('.number-btn');
const operatorButtons = document.querySelectorAll('.operator');
const inputField = document.getElementById('inputField');
const equalsButton = document.getElementById('=');
const clearButton = document.getElementById('clear');
const ceButton = document.getElementById('ce');
const sqrtButton = document.getElementById('squareRoot');
const historyList = document.getElementById('historyList');

// Variables to track state
let currentExpression = '';
let isResultDisplayed = false;

// Update display
function updateDisplay(value) {
    inputField.value = value;
}

// Add calculation to history
function addToHistory(entry) {
    const li = document.createElement('li');
    li.textContent = entry;
    historyList.appendChild(li);
}

// Handle number button clicks
numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (isResultDisplayed) {
            currentExpression = '';
            isResultDisplayed = false;
        }
        currentExpression += button.textContent;
        updateDisplay(currentExpression);
    });
});

// Handle operator clicks
operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (button.id === 'squareRoot') {
            // Handle square root
            try {
                if (currentExpression.trim() === '') return;
                const value = parseFloat(currentExpression);
                if (value < 0) throw new Error('Invalid Input');
                const sqrtResult = Math.sqrt(value);
                addToHistory(`√(${value}) = ${sqrtResult}`);
                currentExpression = sqrtResult.toString();
                updateDisplay(currentExpression);
                isResultDisplayed = true;
            } catch (error) {
                updateDisplay('Error');
                currentExpression = '';
            }
            return;
        }

        const lastChar = currentExpression.slice(-1);
        if (['+', '-', '×', '/', '%'].includes(lastChar)) {
            currentExpression = currentExpression.slice(0, -1);
        }
        currentExpression += ` ${button.textContent} `;
        updateDisplay(currentExpression);
    });
});

// Handle equals (=) button
equalsButton.addEventListener('click', () => {
    try {
        const formattedExpression = currentExpression
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/%/g, '/100');

        const result = eval(formattedExpression);
        addToHistory(`${currentExpression} = ${result}`);
        currentExpression = result.toString();
        updateDisplay(currentExpression);
        isResultDisplayed = true;
    } catch (error) {
        updateDisplay('Error');
        currentExpression = '';
    }
});

// Handle clear (C) button
clearButton.addEventListener('click', () => {
    currentExpression = '';
    updateDisplay('');
});

// Handle CE (backspace) button
ceButton.addEventListener
