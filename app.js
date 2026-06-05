let balance = 0;

function showPage(page) {
  let pages = ["home","tasks","packages","menu"];

  pages.forEach(p => {
    document.getElementById(p).style.display = "none";
  });

  document.getElementById(page).style.display = "block";
}

function watchAd() {
  balance += 0.50;

  document.getElementById("balanceText").innerText =
    "💰 Balance: ৳" + balance.toFixed(2);

  alert("Earned ৳0.50");
}

function submitTaskWithImage(amount, inputId) {

  let file = document.getElementById(inputId);

  if (!file.files.length) {
    alert("❌ Screenshot upload করুন");
    return;
  }

  balance += amount;

  document.getElementById("balanceText").innerText =
    "💰 Balance: ৳" + balance.toFixed(2);

  alert("✅ Task Completed +৳" + amount);
}

document.addEventListener("DOMContentLoaded", function () {
  showPage("home");
});
