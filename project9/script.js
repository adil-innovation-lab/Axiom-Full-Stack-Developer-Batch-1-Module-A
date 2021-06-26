// Get DOM Elements
const balance = document.getElementById('balance');
const moneyCredit = document.getElementById('money-credit');
const moneyDebit = document.getElementById('money-debit');
const list = document.getElementById('list');
const form = document.getElementById('add-form');
const reason = document.getElementById('reason');
const amount = document.getElementById('amount');

// Temporary array of transactions - to be replaced with local storage
const Transactions = [
    // { id: 1, reason: 'Salary', amount: 5000 },
    // { id: 2, reason: 'Breakfast', amount: -20 },
    // { id: 3, reason: 'Lunch', amount: -30 },
    // { id: 4, reason: 'Dinner', amount: -60 },
];

// Get transaction data from storage
let transactions = Transactions;

// Function to display transactions in DOM - History section
function displayTransaction(transaction) {
    // Calculate if transaction is Credit or Debit
    const type = transaction.amount > 0 ? '+' : '-';
    // Create a list item for the transaction
    const transactionLI = document.createElement('li');
    // Determine class based on transaction type. If positive, then credit, otherwise debit
    transactionLI.classList.add(transaction.amount > 0 ? 'credit' : 'debit' );
    // Assign the inner HTML for the transaction li
    transactionLI.innerHTML = `
        ${transaction.reason} <span>${transaction.amount}</span>
        <button class="delete-btn" onclick="deleteTransaction(${transaction.id})" >X</button>
    `;
    // Add the li in the DOM under the transaction history list
    list.appendChild(transactionLI);
};

// Function to update all balances
function updateBalance() {
    // Create a new array with just the amounts from the transactions array
    const transactionAmounts = transactions.map( transaction => transaction.amount );
    // Calculate total balance value
    const totalBalance = transactionAmounts.reduce( (acc, amount) => ( acc += amount), 0 );
    // Calculate total credit balance value
    const creditBalance = transactionAmounts
                            .filter(amount => amount > 0)
                            .reduce( (acc, amount) => (acc += amount), 0 );
    // Calculate total debit balance value
    const debitBalance = transactionAmounts
                            .filter(amount => amount < 0)
                            .reduce( (acc, amount) => (acc += amount), 0 );
    // Update values in the DOM for overall balance, credit balance, and debit balance
    balance.innerText = `$${totalBalance}`;
    moneyCredit.innerText = `$${creditBalance}`;
    moneyDebit.innerText = `$${debitBalance}`;
};

// Function to create a random ID
function createID() {
    return Math.floor(Math.random() * 100000000000);
};

// Function to add a transaction from the form
function addTransaction(e) {
    // Stop the page reload
    e.preventDefault();
    // Check if form has valid data
    if ( reason.value.trim() === '' || amount.value.trim() === '' ) {
        // Display error message if form is not complete
        alert('Please provide a valid reason and transaction amount.')
    } else {
        // Create an object for the transaction containing id, 
        // text for the reason, and the transaction amount
        const transaction = {
            id: createID(),
            reason: reason.value,
            amount: +amount.value
        }
        // Push the new transaction into the transactions array
        transactions.push(transaction);
        // Display the new transaction in the DOM
        displayTransaction(transaction);
        // Update all balances
        updateBalance();
        // Clear form fields
        reason.value = '';
        amount.value = '';
    }
};

// Function to delete a transaction from the history
function deleteTransaction(id) {
    // Filter out the transaction with the provided id
    transactions = transactions.filter( transaction => transaction.id !== id );
    // Initialize the app again to update the DOM
    init();
};

// Function to Initialize the Application
function init() {
    // Clear all transaction history
    list.innerHTML = '';
    // Display all transactions in db in the DOM
    transactions.forEach(displayTransaction);
    // Update all balance values
    updateBalance();
};

// Event Listeners
// 1. Listen for form submit to add a transaction
form.addEventListener('submit', addTransaction);

// Initialize the Application
init();