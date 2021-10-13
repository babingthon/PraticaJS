'use strict'

let newNumber = true;
let operator;
let lastNumber;
const mapKeyboard = {
    '0'         : 'key0',
    '1'         : 'key1',
    '2'         : 'key2',
    '3'         : 'key3',
    '4'         : 'key4',
    '5'         : 'key5',
    '6'         : 'key6',
    '7'         : 'key7',
    '8'         : 'key8',
    '9'         : 'key9',
    '+'         : 'operatorAdicao',
    '-'         : 'operatorSubtracao',
    '*'         : 'operatorMultiplicacao',
    '/'         : 'operatorDivisao',
    '='         : 'resul',
    'Enter'     : 'resul',
    'Backspace' : 'backSpace',
    'c'         : 'cleanDisplay',
    'Escape'    : 'cleanCalc',
    ','         : 'decimal'   
};

const display = document.getElementById('display');
const keys = document.querySelectorAll('[id*=key]').forEach(keys =>{
    keys.addEventListener('click', insertNumber);
});

const operators = document.querySelectorAll('[id*=operator]').forEach(operators =>{
    operators.addEventListener('click', selectOperator);
});

document.getElementById('resul').addEventListener('click', resultActive);
document.getElementById('cleanDisplay').addEventListener('click', cleanDisplay);
document.getElementById('cleanCalc').addEventListener('click', cleanCalc);
document.getElementById('backSpace').addEventListener('click', backSpace);
document.getElementById('inverte').addEventListener('click', inverte);
document.getElementById('decimal').addEventListener('click', insertDecimal);
document.addEventListener('keydown', mappingKeyboard);

function mappingKeyboard(e) {
    let key = e.key;
    if(allowKey(key)){
        document.getElementById(mapKeyboard[key]).click();
    }
};

function allowKey(key) {
    let keys = Object.keys(mapKeyboard);
    if(keys.indexOf(key) != -1){
        return true;
    }
    return false;
};

function insertDecimal() {
    if(!existsDecimal()){
        if(existsValue()){
            updateDisplay(',');
        } else{
            updateDisplay('0,');
        }
    }
};

function existsDecimal() {
    if(display.textContent.indexOf(',') !== -1) {
        return true;
    }

    return false;
};

function existsValue() {
    if(display.textContent.length > 0) {
        return true;
    }

    return false;
};

function inverte() {
    newNumber = true;
    updateDisplay(display.textContent * -1 );
};

function backSpace() {
    display.textContent = display.textContent.slice(0, -1);
};

function cleanCalc() {
    cleanDisplay();
    operator = undefined;
    newNumber = true;
    lastNumber = undefined;
};

function cleanDisplay() {
    display.textContent = '';
};

function resultActive() {
    calculator();
};

function insertNumber(e) {
    updateDisplay(e.target.textContent);
}

function requestingOperation() {
    if(operator !== undefined){
        return true;
    }
};

function calculator(){
    if(requestingOperation()) {
        let currentNumber = parseFloat(display.textContent.replace(',','.'));
        newNumber = true;
        const result = eval(`${lastNumber}${operator}${currentNumber}`);
        updateDisplay(result);

        /*switch (operator) {
            case '+':
                updateDisplay(lastNumber + currentNumber);
            break;
            case '-':
                updateDisplay(lastNumber - currentNumber);
            break;
            case '*':
                updateDisplay(lastNumber * currentNumber);
            break;
            case '/':
                updateDisplay(lastNumber / currentNumber);
            break;
            }*/
    }
};

function selectOperator(e){
    if(!newNumber) {
        newNumber = true;
        calculator();
        operator = e.target.textContent;
        lastNumber = parseFloat(display.textContent.replace(',','.'));
    
        console.log(lastNumber);
        console.log(operator);
    }
};

function updateDisplay(text) {
    if(newNumber){
        display.textContent = text.toLocaleString('BR');
        newNumber = false;
    } else {
        display.textContent += text.toLocaleString('BR');
    }
};