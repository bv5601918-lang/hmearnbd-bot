let balance = 0;

// PAGE SWITCH
function showPage(page) {
  document.getElementById("home").style.display = "none";
  document.getElementById("tasks").style.display = "none";
  document.getElementById("packages").style.display = "none";
  document.getElementById("menu").style.display = "none";

  document.getElementById(page).style.display = "block";
}

// ADS SYSTEM
function watchAd() {
  balance += 0.50;

  document.getElementById("balanceText").innerText =
    "💰 Balance: ৳" + balance.toFixed(2);

  alert("🎉 Earned ৳0.50");
}

// TASK SUBMIT SYSTEM
function submitTask(amount) {
  balance += amount;

  document.getElementById("balanceText").innerText =
    "💰 Balance: ৳" + balance.toFixed(2);

  alert("✅ Task Submitted +৳" + amount);
}
