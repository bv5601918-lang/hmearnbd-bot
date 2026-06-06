const PASSWORD = "MEHEDIVAI115";

/* IMPORTANT: wait until page loads */
window.onload = function(){

    const pass = document.getElementById("pass");
    const loginBox = document.getElementById("loginBox");
    const app = document.getElementById("app");

    const timeBox = document.getElementById("timeBox");
    const valueBox = document.getElementById("value");

    function login(){
        console.log("LOGIN CLICKED"); // debug check

        if(pass.value === PASSWORD){
            loginBox.style.display = "none";
            app.style.display = "block";
            start();
        }else{
            alert("Wrong Password");
        }
    }

    function now(){
        return new Date();
    }

    function update(){
        let t = now();
        timeBox.innerText = t.toLocaleTimeString();

        let sec = t.getSeconds();

        if(sec % 30 === 0){
            valueBox.innerText = Math.random() > 0.5 ? "BIG" : "SMALL";
        }
    }

    function openSite(){
        window.location.href =
        "https://hgnice.bet/#/register?invitationCode=531211974484";
    }

    function start(){
        setInterval(update, 1000);
    }

    // expose functions globally (IMPORTANT FIX)
    window.login = login;
    window.openSite = openSite;
}
