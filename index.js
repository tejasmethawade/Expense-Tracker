
// const inflow = document.getElementById("income");
// const outflow = document.getElementById("expense");
const balance = document.getElementById("balance");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// Get transactions from local storage
const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

// Add transaction
const addTransaction=(e)=> {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    document.getElementById("error_msg").innerHTML =
      "<span >*Error: Please enter description and amount!</span>";
    setTimeout(
      () => (document.getElementById("error_msg").innerHTML = ""),
      5000
    );
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

    updateLocalStorage();

    text.value = "";
    amount.value = "";
  }
}

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Transactions history
function addTransactionDOM(transaction) {
  // Get sign
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("div");

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");
  item.classList.add("item");

  item.innerHTML = `
  <div class="item-name">
    ${transaction.text}
  </div>
  <div class="item-value">
    ${sign}${Math.abs(
      transaction.amount
    )}                          
  </div>
  <div class="trash">
    <button class="delete-btn" onclick="removeTransaction(${
      transaction.id
    })"><i class="fa-solid fa-trash"></i></button>
  </div>
     
  `;

  list.appendChild(item);
}

// Update the balance, inflow and outflow
function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((bal, value) => (bal += value), 0).toFixed(2);

  balance.innerText = ` Total Balance =${total} Rs`;
}

// Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  updateLocalStorage();

  start();
}

// Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Start app
function start() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}

start();

form.addEventListener("submit", addTransaction);