var mineAmount = 0;
var url = "https://h3ppo.herokuapp.com";
//var url = "http://localhost:9190";

var refresh = async () => await start();
startMineBatch = async () => {
    var startAccount = H.id("startAccount").value, batch_no= H.id("mineBatchNo").value,bankCode = H.id("mineBank").value, direction = H.id("mineDirection").value,steps = H.id("mineSteps").value;
    var req = await fetch(`${url}/startMineBatch/${startAccount}/${bankCode}/${direction}/${steps}/${batch_no}`);
    req = await req.json();
    H.id("mineSess").innerHTML = "Mining Started";
}

lastMineUp = async () => {
    var req = await fetch(`${url}/lastMineUp`);
    req = await req.json();
    console.log(req)
    if (req.type == "success"){
        H.id("lastMineUp").innerHTML = `Acc_no : ${req.data.accountNumber} \n Bank Code:  ${req.data.bankCode}`;
    }
}

lastMineDown = async () => {
    var req = await fetch(`${url}/lastMineDown`);
    req = await req.json();
    if (req.type == "success"){
        H.id("lastMineDown").innerHTML = `Acc_no : ${req.data.accountNumber} \n Bank Code:  ${req.data.bankCode}`;
    }
}

getmineAmount = async () => {
    var req = await fetch(`${url}/mineAmount`);
    req = await req.json();
    if(req.type == "success"){
        setMineAmount(req.mineAmount);
    }
}
var start = async () => {
    lastMineUp()
    lastMineDown();
    getmineAmount();
}
const setMineAmount = async (x) => {
    mineAmount = await x;
    H.id("mineAmount").innerHTML = mineAmount;
    return mineAmount;
}

const updateMineAmount = async () => {
    mineAmount = Number(getMineAmount()) + 1;
    console.log(mineAmount);
    setMineAmount(mineAmount);
    H.id("mineAmount").innerHTML = mineAmount;
}
const pop = async (msg,name,acc) => {
    var exsistingPop = document.getElementsByTagName("pop");
    (exsistingPop.length > 0) ? exsistingPop[0].remove() : "";
    var p = document.createElement("pop");
    p.innerHTML = `<div class="h-card pop h-anim-rollin-left h-bg-pinkish h-shadow-pinkish" style="z-index:50;position:absolute;top:10px;right:3px;">
                        <p class="h-text-bold-white h-text-bold">${msg}</p>
                        <hr>
                        <p class="h-text h-text-white">${name ? name : ""}</p>
                        <p class="h-text h-text-white">${acc ? acc : ""}</p>
                    </div>`
    document.body.append(p);
    removePop();
}
const removePop = async () => {
    setTimeout(()=>{
        var exsistingPop = document.getElementsByTagName("pop");
        (exsistingPop.length > 0) ? exsistingPop[0].remove() : "";
    },2000)
}
H.id("mineForm").onsubmit = ((e)=>{
    e.preventDefault();
    console.log(e)
    startMineBatch();
})
openPing = () => {
    H.id("pingApp").classList.replace("h-hide","h-show");
}
closePing = () => {
    H.id("pingApp").classList.replace("h-show","h-hide");
}
var time = 0;
startPing = async () =>{
    
    var pingStart = (new Date().getTime()) /1000;
    var urls = H.id("pingUrl").value.split(" ").join("");
    console.log(urls);
    var pingTimes = H.id("pingTimes").value;
    var pingInterval = H.id("pingInterval").value;
    var pingEnd = H.id("pingEnd").value;
    urls = urls.split(";");
    if (pingEnd) {
        if (pingTimes|| pingInterval){
            var getT = 0;
            if (pingTimes) getT = (pingEnd/pingTimes) * 1000;
            else if (pingInterval) getT = pingInterval * 1000; 
            console.log("PINGER START");
            setInterval(() => {
                var now = (new Date().getTime())/1000;
                var diff = Number(Math.round(now - pingStart));
                var check = (diff <= Number(pingEnd));
                if(check === true){
                    ping(urls);
                }
                else clearInterval();
            }, getT);
        }
        else alert("Ping interval or times not specified");
    }
    else alert("ping end period not set");
    /*setInterval(() => {
        x++;
        if (x !== pingEnd){
            
        }
    }, 1000);*/
}
ping = async (urls) => {
    var logs = H.id("pingLogs");
    var logMsg = "";
    urls.forEach(async url => {
        //logMsg = `Pinged: ${url} \n`;
        try{
            var req = await fetch(url);
            req = req.json();
            logMsg = `Pinged ${url} : ${req} \n`;
        }
        catch(e){
            logMsg = `Error connecting to ${url} \n`;
        }
        logs.innerHTML += logMsg;
    })
}