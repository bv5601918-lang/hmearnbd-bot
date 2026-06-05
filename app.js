let balance = 0;

document.querySelector(".btn").addEventListener("click", function () {
    balance += 0.50;
    document.getElementById("balance").innerText = "৳" + balance.toFixed(2);
});
