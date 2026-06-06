const PASSWORD = "12345";

function login(){

    let p = document.getElementById("pass").value;

    if(p === PASSWORD){

        document.getElementById("login").style.display = "none";
        document.getElementById("terminal").style.display = "block";

        startHackEffect();

    } else {
        document.getElementById("msg").innerText = "ACCESS DENIED!";
    }
}

function startHackEffect(){

    let log = document.getElementById("log");
    let box = document.getElementById("box");

    let messages = [
        "Connecting to server...",
        "Bypassing firewall...",
        "Access granted...",
        "Injecting module...",
        "System unstable...",
        "Loading interface..."
    ];

    let i = 0;

    setInterval(()=>{

        // terminal text effect
        if(i < messages.length){
            log.innerHTML += messages[i] + "<br>";
            i++;
        }

        // size change effect
        let size = Math.floor(Math.random()*250)+80;
        box.style.width = size + "px";
        box.style.height = size + "px";

    }, 1500);
                }
