// 🔥 SUPABASE CONNECT
const SUPABASE_URL = "https://eljvjhuiogdjvcyxczug.supabase.co";
const SUPABASE_KEY = "YOUR_PUBLIC_KEY";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// =====================
// USER SYSTEM
// =====================

let currentUser;
let balance = 0;

// auto user create
async function initUser() {

  let telegram_id = localStorage.getItem("uid");

  if(!telegram_id){
    telegram_id = "U" + Date.now();
    localStorage.setItem("uid", telegram_id);
  }

  let { data } = await supabaseClient
    .from("users")
    .select("*")
    .eq("telegram_id", telegram_id)
    .single();

  if(!data){

    let refCode = "REF" + Math.floor(Math.random()*99999);

    await supabaseClient.from("users").insert([{
      telegram_id,
      username: "User",
      balance: 0,
      referral_code: refCode,
      referred_by: null,
      total_referrals: 0
    }]);

  }

  loadUser();
}

// load user
async function loadUser(){

  let uid = localStorage.getItem("uid");

  let { data } = await supabaseClient
    .from("users")
    .select("*")
    .eq("telegram_id", uid)
    .single();

  currentUser = data;
  balance = data.balance;

  document.getElementById("balanceText").innerText =
    "💰 Balance: ৳" + balance;
}

// =====================
// TASK SYSTEM
// =====================

async function submitTask(amount, taskName, inputId){

  let file = document.getElementById(inputId);

  if(!file.files.length){
    alert("Upload screenshot");
    return;
  }

  await supabaseClient.from("task_submissions").insert([{
    user_id: currentUser.id,
    task_name: taskName,
    screenshot_url: file.files[0].name,
    reward: amount,
    status: "pending"
  }]);

  alert("Submitted for approval");
}

// =====================
// ADS
// =====================

async function watchAd(){
  balance += 0.5;
  updateBalance();
}

// =====================
// UPDATE BALANCE
// =====================

async function updateBalance(){

  let uid = localStorage.getItem("uid");

  await supabaseClient
    .from("users")
    .update({ balance })
    .eq("telegram_id", uid);

  document.getElementById("balanceText").innerText =
    "💰 Balance: ৳" + balance;
}

// =====================
// REFERRAL
// =====================

function loadReferral(){

  document.getElementById("refCode").innerText =
    currentUser.referral_code;

  document.getElementById("refCount").innerText =
    currentUser.total_referrals;
}

function copyRef(){
  let link = window.location.href + "?ref=" + currentUser.referral_code;
  navigator.clipboard.writeText(link);
  alert("Copied!");
}

// =====================
// PAGE CONTROL
// =====================

function showPage(page){

  ["home","tasks","referral","admin"].forEach(p=>{
    let el = document.getElementById(p);
    if(el) el.style.display="none";
  });

  document.getElementById(page).style.display="block";

  if(page==="referral") loadReferral();
  if(page==="admin") loadAdmin();
}

// =====================
// ADMIN (SIMPLE)
// =====================

async function loadAdmin(){

  let { data } = await supabaseClient
    .from("task_submissions")
    .select("*")
    .eq("status","pending");

  let box = document.getElementById("adminList");
  box.innerHTML = "";

  data.forEach(t=>{

    let div = document.createElement("div");
    div.innerHTML = `
      <p>${t.task_name} - ৳${t.reward}</p>
      <button onclick="approve('${t.id}',${t.reward})">Approve</button>
    `;

    box.appendChild(div);
  });
}

// approve
async function approve(id, reward){

  await supabaseClient
    .from("task_submissions")
    .update({status:"approved"})
    .eq("id", id);

  balance += reward;
  updateBalance();

  alert("Approved");
}

// =====================
// START
// =====================

document.addEventListener("DOMContentLoaded",()=>{
  initUser();
  showPage("home");
});
