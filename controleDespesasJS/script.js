const transactionsUl = document.querySelector('#transactions');
const currentBalance = document.querySelector('#balance');
const moneyPlus = document.querySelector('#money-plus');
const moneyMinus = document.querySelector('#money-minus');
const form = document.querySelector('#form');
const inputTransactionName = document.querySelector('#text');
const inputTransactionAmount = document.querySelector('#amount');

const dummyTransactions = [
    { id: 1, name: 'Bolo de Cereja', amount: -20.00},
    { id: 2, name: 'Salário', amount: 300.00},
    { id: 3, name: 'Torta de Frango', amount: -10.00},
    { id: 4, name: 'Violão', amount: 150.00}
]

const addTransactionsIntoDOM = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+';
    const CCSClass = transaction.amount < 0 ? 'minus' : 'plus';
    const amountWithoutOperator = Math.abs(transaction.amount);
    const li = document.createElement('li');
    
    li.classList.add(CCSClass);
    li.innerHTML = `
    ${transaction.name} <span>${operator} R$ ${amountWithoutOperator.toFixed(2)}</span><button class="delete-btn">x</button>
    `
    transactionsUl.append(li);
}

const updateBalanceAmounts = () => {
 const transactionsAmounts = dummyTransactions.map(transaction => transaction.amount);
 const total = transactionsAmounts.reduce( (accumulator, transaction) => accumulator + transaction, 0).toFixed(2);
 const amountPositive = transactionsAmounts.filter((item) => item > 0).reduce((accumulator, transaction) => accumulator + transaction, 0).toFixed(2);
 const amountNegative = Math.abs(transactionsAmounts.filter((item) => item < 0).reduce((accumulator, transaction) => accumulator + transaction, 0)).toFixed(2);

 currentBalance.innerHTML =`R$ ${total}`;
 moneyPlus.textContent = `R$ ${amountPositive}`;
 moneyMinus.textContent  = `R$ ${amountNegative}`;
};

updateBalanceAmounts();

const init = () => {
    dummyTransactions.forEach(addTransactionsIntoDOM);
}

init();

form.addEventListener('submit', event => {
    event.preventDefault();

    const transactionName = inputTransactionName.value.trim();
    const transactionsAmount = inputTransactionAmount.value.trim();

    if(transactionName === '' || transactionsAmount === '') {
        alert('Por favor, preencha tanto o nome quanto o valor da transação');
        return;
    }




});