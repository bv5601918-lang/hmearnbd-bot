function show(page){

  let pages=[
    "home",
    "tasks",
    "packages",
    "menu",
    "deposit",
    "withdraw",
    "referral"
  ];

  pages.forEach(p=>{
    let el=document.getElementById(p);
    if(el) el.style.display="none";
  });

  document.getElementById(page).style.display="block";
}

document.addEventListener("DOMContentLoaded",()=>{
  show("home");
});
