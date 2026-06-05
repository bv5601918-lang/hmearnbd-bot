const SUPABASE_URL = "https://eljvjhuiogdjvcyxczug.supabase.co";
const SUPABASE_KEY = "PASTE_YOUR_ANON_KEY";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let user;
let balance = 0;

/* INIT USER */
async function initUser(){

  let uid = localStorage.getItem("uid");

  if(!uid){
    uid = "U"+Date.now();
    localStorage.setItem("uid",uid);
  }

  let { data } = await supabase
    .from("users")
    .select("*")
    .eq("telegram_id",uid)
    .single();

  if(!data){

    let ref = "REF"+Math.floor(Math.random()*99999);

    await supabase.from("users").insert([{
      telegram_id:uid,
      username:"User",
      balance:0,
      referral_code:ref,
      total_referrals:0
    }]);
  }

  loadUser();
}

/* LOAD USER */
async function loadUser(){

  let uid = localStorage.getItem("uid");

  let { data } = await supabase
    .from("users")
    .select("*")
    .eq("telegram_id",uid)
    .single();

  user = data;
  balance = data.balance;

  document.getElementById("balance").innerText =
    "💰 Balance: ৳"+balance;

  document.getElementById("refCode").innerText =
    data.referral_code;
}

/* TASK */
async function submitTask(amount,id){

  let file = document.getElementById(id);

  if(!file.files.length){
    alert("Screenshot দিন");
    return;
  }

  await supabase.from("task_submissions").insert([{
    user_id:user.id,
    task_name:"Task",
    screenshot_url:file.files[0].name,
    reward:amount,
    status:"pending"
  }]);

  alert("Submitted");
}

/* ADMIN */
async function loadAdmin(){

  let { data } = await supabase
    .from("task_submissions")
    .select("*")
    .eq("status","pending");

  let box = document.getElementById("adminList");
  box.innerHTML="";

  data.forEach(t=>{

    let div=document.createElement("div");
    div.innerHTML=`
      <p>${t.task_name} - ৳${t.reward}</p>
      <button onclick="approve('${t.id}',${t.reward})">Approve</button>
    `;

    box.appendChild(div);
  });
}

async function approve(id, reward){

  await supabase
    .from("task_submissions")
    .update({status:"approved"})
    .eq("id",id);

  balance += reward;

  document.getElementById("balance").innerText =
    "💰 Balance: ৳"+balance;

  alert("Approved");
}

/* PAGE SWITCH */
function show(page){

  ["home","tasks","referral","admin"].forEach(p=>{
    document.getElementById(p).style.display="none";
  });

  document.getElementById(page).style.display="block";

  if(page==="admin") loadAdmin();
}

/* START */
document.addEventListener("DOMContentLoaded",()=>{
  initUser();
  show("home");
});
