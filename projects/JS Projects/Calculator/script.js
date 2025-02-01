
const numberButtons = document.querySelectorAll('.number-btn');
const operatorButtons = document.querySelectorAll('.operator');
const inputField = document.getElementById('inputField');
const equalsButton = document.getElementById('=');
const clearButton = document.getElementById('clear');
const ceButton = document.getElementById('ce');
const historyList = document.getElementById('historyList');


let currentExpression = ''; 
let isResultDisplayed = false; 


function updateDisplay(value) {
    inputField.value = value;
}


function addToHistory(entry) {
    const li = document.createElement('li');
    li.textContent = entry;
    historyList.appendChild(li);
}


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


operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (isResultDisplayed) {
            isResultDisplayed = false;
        }

        const lastChar = currentExpression.slice(-1);
        if (['+', '-', '×', '/', '%'].includes(lastChar)) {
            
            currentExpression = currentExpression.slice(0, -1);
        }
        currentExpression += ` ${button.textContent} `; 
        updateDisplay(currentExpression); 
    });
});


equalsButton.addEventListener('click', () => {
    try {
        
        const formattedExpression = currentExpression
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/√/g, 'Math.sqrt')
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


clearButton.addEventListener('click', () => {
    currentExpression = ''; 
    updateDisplay(''); 
});


ceButton.addEventListener('click', () => {
    if (isResultDisplayed) {
        currentExpression = ''; 
        isResultDisplayed = false;
    } else {
        currentExpression = currentExpression.trim().slice(0, -1); 
    }
    updateDisplay(currentExpression); 
});
