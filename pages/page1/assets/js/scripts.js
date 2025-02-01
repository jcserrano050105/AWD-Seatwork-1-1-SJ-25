let startingBalance = 5000;
let username = '';
let balance = startingBalance;
let transactions = [];

document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username && password) {
        document.getElementById("login-section").style.display = "none";
        document.getElementById("dashboard").style.display = "block";
        document.getElementById("user-name").innerText = username;

        // Load user-specific data (balance and transactions)
        loadUserData();
        updateBalance();
        updateHistory();
    }
});

function loadUserData() {
    // Get the user's balance and transaction history from localStorage
    let userBalance = localStorage.getItem(`balance_${username}`);
    let userTransactions = JSON.parse(localStorage.getItem(`transactions_${username}`));

    // If no balance found for the user, initialize it with the starting balance
    if (userBalance !== null) {
        balance = parseFloat(userBalance);
    } else {
        balance = startingBalance;
    }

    // If no transaction history found, initialize it as an empty array
    if (userTransactions !== null) {
        transactions = userTransactions;
    } else {
        transactions = [];
    }
}

function showSection(section) {
    document.getElementById("deposit-box").style.display = "none";
    document.getElementById("withdraw-box").style.display = "none";
    document.getElementById("history-box").style.display = "none";
    document.getElementById(section + "-box").style.display = "block";
}

function depositMoney() {
    let amount = parseFloat(document.getElementById("deposit-amount").value);
    if (amount > 0) {
        balance += amount;
        transactions.push(`Deposited: ₱${amount.toFixed(2)}`);
        updateBalance();
        updateHistory();
        saveUserData();
        alert(`Deposit successful! Your new balance is ₱${balance.toFixed(2)}`);
    } else {
        alert("Enter a valid amount.");
    }
}

function withdrawMoney() {
    let amount = parseFloat(document.getElementById("withdraw-amount").value);
    if (amount > 0 && amount <= balance) {
        balance -= amount;
        transactions.push(`Withdrew: ₱${amount.toFixed(2)}`);
        updateBalance();
        updateHistory();
        saveUserData();
        alert(`Withdrawal successful! Your new balance is ₱${balance.toFixed(2)}`);
    } else if (amount > balance) {
        alert("Insufficient balance!");
    } else {
        alert("Enter a valid amount.");
    }
}

function updateBalance() {
    document.getElementById("balance-amount").innerText = `₱${balance.toFixed(2)}`; 
}

function updateHistory() {
    let list = document.getElementById("transaction-list");
    list.innerHTML = "";
    transactions.forEach((tx) => {
        let li = document.createElement("li");
        li.textContent = tx;
        list.appendChild(li);
    });
}

function saveUserData() {
    // Save the user's balance and transaction history to localStorage
    localStorage.setItem(`balance_${username}`, balance);
    localStorage.setItem(`transactions_${username}`, JSON.stringify(transactions));
}

function exit() {
    // Clear user-specific data and go back to the login screen
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("login-section").style.display = "block";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";


}
