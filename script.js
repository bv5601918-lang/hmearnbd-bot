const PASSWORD = "MEHEDIVAI115";

const pass = document.getElementById("pass");
const loginBox = document.getElementById("loginBox");
const app = document.getElementById("app");

const timeBox = document.getElementById("timeBox");
const valueBox = document.getElementById("value");

let offset = 0;

/* LOGIN */
function login(){
    if(pass.value === PASSWORD){
        loginBox.style.display = "none";
        app.style.display = "block";
        start();
    }else{
        alert("Wrong Password");
    }
}

/* TIME */
function now(){
    return new Date(Date.now() + offset);
}

/* UPDATE */
function update(){

    let t = now();
    timeBox.innerText = t.toLocaleTimeString();

    let sec = t.getSeconds();

    if(sec % 30 === 0){
        valueBox.innerText = Math.random() > 0.5 ? "BIG" : "SMALL";
    }
}

/* 🔥 FIXED OPEN SITE (FULL WORKING METHOD) */
function openSite(){

    const url = "https://hgnice.bet/#/register?invitationCode=531211974484";

    // safest method (recommended)
    window.location.href = url;
}

/* START */
function start(){
    setInterval(update, 1000);
          }
