let balance = 0;

document.querySelector(".btn").addEventListener("click", function () {
    balance += 0.50;
    document.getElementById("balance").innerText = "৳" + balance.toFixed(2);
});
function showPage(page) {
    document.getElementById("home").style.display = "none";
    document.getElementById("tasks").style.display = "none";
    document.getElementById("packages").style.display = "none";
    document.getElementById("menu").style.display = "none";

    document.getElementById(page).style.display = "block";
}
