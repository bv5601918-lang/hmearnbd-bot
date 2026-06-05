function showPage(page) {

    document.getElementById("home").style.display = "none";
    document.getElementById("tasks").style.display = "none";
    document.getElementById("packages").style.display = "none";
    document.getElementById("menu").style.display = "none";

    document.getElementById(page).style.display = "block";
}
