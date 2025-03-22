const themeImg = document.getElementById('theme-img');

const previousText = document.getElementById('previous-text');
const currentText = document.getElementById('current-text');
const resultText = document.getElementById('result-text');

let buttons = {};

document.querySelectorAll('.option').forEach(el => {
    buttons[el.id] = el;
});

let previousVal = '';
let currentVal = '0';
let resultVal = '0';

let freeBracketCount = 0;

previousText.textContent = previousVal;
currentText.textContent = currentVal;
resultText.textContent = resultVal;

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
}

function evaluate(value, freeOpenBracketCount) {
    let brackets = '';

    for (let i = 0; i < freeOpenBracketCount; i++) {
        brackets += ')';
    }

    const strRes = new Function(`return ${value.replace('^', '**') + brackets}`)();
    const fixedRes = Math.round(strRes * 1e8) / 1e8;
    return fixedRes === Infinity || fixedRes === -Infinity ? 'Error' : fixedRes;
}

function setPreviousVal(content) {
    previousVal = content;
    previousText.textContent = previousVal;
}

function setCurrentVal(content) {
    currentVal = content;
    currentText.textContent = currentVal;
}

function setResultVal(content) {
    resultVal = content;
    resultText.textContent = resultVal;
}

function addDigit(digit) {
    const digitExamples = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '00'];
    const operationExamples = ['+', '-', '*', '/', '^'];
    const lastChar = currentVal.charAt(currentVal.length - 1);

    if (!digitExamples.includes(digit)) {
        return false;
    }

    if (
        digit === '00' &&
        (
            (lastChar === '0' && !digitExamples.includes(currentVal.charAt(currentVal.length - 2))) ||
            !digitExamples.includes(lastChar)
        )
    ) {
        return false;
    }

    if (
        digit === '0' &&
        (lastChar === '0' && !digitExamples.includes(currentVal.charAt(currentVal.length - 2)))
    ) {
        return false;
    }

    if (currentVal === '0') {
        if (digit === '0' || digit === '00') {
            return false;
        }

        setCurrentVal(digit);
        setResultVal(evaluate(currentVal, freeBracketCount));
        return true;
    }

    if (
        !digitExamples.includes(lastChar) &&
        !operationExamples.includes(lastChar) &&
        lastChar !== '.' &&
        lastChar !== '('
    ) {
        return false;
    }

    setCurrentVal(currentVal + digit);
    setResultVal(evaluate(currentVal, freeBracketCount));
    return true;
}

function addOperator(operator) {
    const operatorExamples = ['+', '-', '*', '/', '^'];
    const digitExamples = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    const lastChar = currentVal.charAt(currentVal.length - 1);

    if (!operatorExamples.includes(operator)) {
        return false;
    }

    if (operator === '-') {
        if (currentVal === '0') {
            setCurrentVal(operator);
            return true;
        }

        if (lastChar === '(') {
            setCurrentVal(currentVal + operator);
            return true;
        }
    }

    if (
        !digitExamples.includes(lastChar) &&
        lastChar !== ')'
    ) {
        return false;
    }

    setCurrentVal(currentVal + operator);
    return true;
}

themeImg.addEventListener('click', () => {
    if (document.body.classList.contains('dark')) {
        document.body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
});

buttons['one'].addEventListener('click', () => {
    addDigit('1');
});

buttons['two'].addEventListener('click', () => {
    addDigit('2');
});

buttons['three'].addEventListener('click', () => {
    addDigit('3');
});

buttons['four'].addEventListener('click', () => {
    addDigit('4');
});

buttons['five'].addEventListener('click', () => {
    addDigit('5');
});

buttons['six'].addEventListener('click', () => {
    addDigit('6');
});

buttons['seven'].addEventListener('click', () => {
    addDigit('7');
});

buttons['eight'].addEventListener('click', () => {
    addDigit('8');
});

buttons['nine'].addEventListener('click', () => {
    addDigit('9');
});

buttons['zero'].addEventListener('click', () => {
    addDigit('0');
});

buttons['double-zero'].addEventListener('click', () => {
    addDigit('00');
});

buttons['dot'].addEventListener('click', () => {
    const digitExamples = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

    if (!digitExamples.includes(currentVal.charAt(currentVal.length - 1))) {
        return;
    }

    let dotFound = false;

    for (let i = currentVal.length - 1; i >= 0; i--) {
        if (currentVal[i] === '.') {
            dotFound = true;
        }

        if (!digitExamples.includes(currentVal[i])) {
            break;
        }
    }

    if (!dotFound) {
        setCurrentVal(currentVal + '.');
    }
});

buttons['add'].addEventListener('click', () => {
    addOperator('+');
});

buttons['subtract'].addEventListener('click', () => {
    addOperator('-');
});

buttons['multiply'].addEventListener('click', () => {
    addOperator('*');
});

buttons['divide'].addEventListener('click', () => {
    addOperator('/');
});

buttons['pow'].addEventListener('click', () => {
    addOperator('^')
});

buttons['percent'].addEventListener('click', () => {
    const digitExamples = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    const operatorExamples = ['+', '-', '*', '/', '^'];
    let lastChar = currentVal.charAt(currentVal.length - 1);

    if (!digitExamples.includes(lastChar)) {
        return;
    }

    let percent = '';
    let idx = -1;

    for (let i = currentVal.length - 1, j = 0; i >= 0; i--, j++) {
        if (!digitExamples.includes(currentVal[i]) && currentVal[i] !== '.') {
            idx = j;
            break;
        }
    }

    if (idx === -1) {
        const value = String(currentVal / 100);
        setCurrentVal(value);
        setResultVal(value);
        return;
    }

    percent = currentVal.slice(-idx);
    setCurrentVal(currentVal.slice(0, -idx));

    lastChar = currentVal.charAt(currentVal.length - 1);

    const value = evaluate(operatorExamples.includes(lastChar) ? currentVal.slice(0, -1) : currentVal, freeBracketCount) / 100 * Number(percent);

    setCurrentVal(currentVal + value);
    setResultVal(evaluate(currentVal, freeBracketCount));
});

buttons['left-bracket'].addEventListener('click', () => {
    const operatorExamples = ['+', '-', '*', '/', '^'];
    const lastChar = currentVal.charAt(currentVal.length - 1);

    if (
        !operatorExamples.includes(lastChar) &&
        currentVal !== '0'
    ) {
        return;
    }

    if (currentVal === '0') {
        setCurrentVal('(');
    }
    else {
        setCurrentVal(currentVal + '(');
    }

    freeBracketCount++;
});

buttons['right-bracket'].addEventListener('click', () => {
    const digitExamples = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    const lastChar = currentVal.charAt(currentVal.length - 1);

    if (!digitExamples.includes(lastChar)) {
        return;
    }

    if (freeBracketCount <= 0) {
        return;
    }

    setCurrentVal(currentVal + ')');
    freeBracketCount--;
});

buttons['delete'].addEventListener('click', () => {
    const digitExamples = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    const value = currentVal.slice(0, -1);
    const lastChar = currentVal.charAt(currentVal.length - 1)
    const lastCharOfValue = value.charAt(value.length - 1);

    if (lastChar === ')') {
        freeBracketCount++;
    }

    if (lastChar === '(') {
        freeBracketCount--;
    }

    if (
        digitExamples.includes(lastCharOfValue) ||
        lastCharOfValue === ')'
    ) {
        setResultVal(evaluate(value, freeBracketCount));
    }

    setCurrentVal(value === '' ? '0' : value);

    if (currentVal === '0') {
        setResultVal('0');
    }
});

buttons['c'].addEventListener('click', () => {
    setPreviousVal('');
    setCurrentVal('0');
});

buttons['ac'].addEventListener('click', () => {
    setPreviousVal('');
    setCurrentVal('0');
    setResultVal('0');
});

buttons['equal'].addEventListener('click', () => {
    const operatorExamples = ['+', '-', '*', '/', '^'];
    const lastChar = currentVal.charAt(currentVal.length - 1);

    if (!operatorExamples.includes(lastChar) && lastChar !== '.' && lastChar !== '(') {
        const res = evaluate(currentVal, freeBracketCount);
        setPreviousVal(`${currentVal}=${res}`);
        setCurrentVal(res);
        setResultVal(res);
    }
});
