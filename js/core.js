let rolesArray;
let playernumber=1;
let time;
let audio;


async function startGame(){
    audio = new Audio('../sound/endgame.mp3');
    document.getElementById("inti").style.display = "none";
    document.getElementById("NewGame").style.display = "none";
    var players = document.getElementById("players").value;
    var spys = document.getElementById("spys").value;
    time = document.getElementById("time").value * 60;
    countrys = await getCountrys();
    var country = Math.floor(Math.random() * countrys.length);
    var i=0;
    const spyArray = [];
    while(i<spys){
        var id = Math.floor(Math.random() * players);
        if(!spyArray.includes(id)){
            spyArray[i]=id;
            i++
        }
    }
    rolesArray = [];
    i=0;
    while(i<players){
        if(spyArray.includes(i)){
            rolesArray[i]={
                "name": "Your are spy",
                "image": "../svg/spy.svg"
            }
        }
        else{
            rolesArray[i]=countrys[country];
        }
        i++;
    }
    i=1;
    HiddenRole();
}

async function getCountrys() {
    let url = '../json/countrys.json';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

function showRole(){
    document.getElementById("playernumber").innerHTML = playernumber;
    document.getElementById("role").innerHTML = rolesArray[playernumber-1].name;
    document.getElementById("image").src = rolesArray[playernumber-1].image;
    playernumber++;
    if(rolesArray.length<playernumber)
        document.getElementById("Game").setAttribute("onclick","initStartTime();");
    else
        document.getElementById("Game").setAttribute("onclick","HiddenRole();");
}

function HiddenRole(){
    document.getElementById("playernumber").innerHTML = playernumber;
    document.getElementById("role").innerHTML = "Click";
    document.getElementById("image").src = '../svg/qustion.svg';
    document.getElementById("Game").setAttribute("onclick","showRole();");
    document.getElementById("Game").style.display = "block";
}

function initStartTime(){
    document.getElementById("p").innerHTML = "";
    document.getElementById("role").innerHTML = "Click to start time";
    document.getElementById("image").src = '../svg/time.svg';
    document.getElementById("Game").setAttribute("onclick","startTime();");
    document.getElementById("Game").style.display = "block";
}
function startTime(){
    document.getElementById("image").src = '../svg/time.svg';
    document.getElementById("role").innerHTML = dateDecorator();
    document.getElementById("Game").setAttribute("onclick","");
    document.getElementById("inti").style.display = "block";
    setTimeout('updateTimer()', 1000);
}

function dateDecorator(){
    let min = Math.floor(time/60);
    let sec = time % 60;
    if(min<10 && sec<10)
        return '0'+min+':0'+sec;
    else if(min<10)
        return '0'+min+':'+sec;
    else if(sec<10)
        return min+':0'+sec;
    else
        return min+':'+sec;
}
function updateTimer() {
    time--;
    if(time<0){
        document.getElementById("role").innerHTML = "Spys WIN";
        document.getElementById("Game").setAttribute("onclick","initGame();");
        audio.play();
    }
    else{
        startTime();
    }
    
}
function initGame(){
    playernumber=1;
    time=0;
    rolesArray= null;
    audio.pause();
    audio = null;
    document.getElementById("Game").style.display = "none";
    document.getElementById("NewGame").style.display = "block";
    document.getElementById("p").innerHTML = "Player number <span id='playernumber'></span>";
}
