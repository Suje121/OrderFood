let orderHistory = [];
let total = 0;
let walletBalance = 0;
function addToOrder(item, price) {
  orderHistory.push({ item, price });
  total += price;
  updateOrderList();
}
function updateOrderList() {
  const list = document.getElementById("orderList");
  list.innerHTML = "";
  orderHistory.forEach((order, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${order.item} - ₹${order.price}`;
    list.appendChild(li);
  });
  document.getElementById("totalPrice").textContent = total;
}
function payNow() {
  if (orderHistory.length === 0) {
    alert("Add some items to order first.");
    return;
  }
  const paymentMode = document.getElementById("paymentMode").value;
  let msg = "";
  if (paymentMode === "wallet") {
    if (walletBalance < total) {
      alert("Insufficient wallet balance.");
      return;
    } else {
      walletBalance -= total;
      document.getElementById("walletBalance").textContent = walletBalance;
      msg = "Order placed successfully using Wallet!";
    }
  } else {
    switch (paymentMode) {
      case "cod":
        msg = "Order placed successfully with Cash on Delivery!";
        break;
      case "upi":
        msg = "Order placed successfully using UPI!";
        break;
      case "card":
        msg = "Order placed successfully using Credit/Debit Card!";
        break;
    }
  }
  document.getElementById("paymentMsg").textContent = msg;
  alert(msg);
  orderHistory = [];
  total = 0;
  updateOrderList();
  setTimeout(() => {
    document.getElementById("paymentMsg").textContent = "";
  }, 4000);
}
function addMoney() {
  const amountInput = document.getElementById("walletAmount");
  const amount = parseInt(amountInput.value);
  if (isNaN(amount) || amount <= 0) {
    alert("Enter a valid amount to add.");
    return;
  }
  walletBalance += amount;
  document.getElementById("walletBalance").textContent = walletBalance;
  alert(`₹${amount} added to your wallet successfully!`);
  amountInput.value = "";
}
function submitReview(event) {
  event.preventDefault();
  const name = document.getElementById("username").value;
  const review = document.getElementById("reviewText").value;
  const reviewDiv = document.getElementById("reviews");
  const entry = document.createElement("p");
  entry.innerHTML = `<strong>${name}:</strong> ${review}`;
  reviewDiv.appendChild(entry);
  document.getElementById("username").value = "";
  document.getElementById("reviewText").value = "";
}
