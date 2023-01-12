// ************** display real time *************

let hours = document.getElementById('hours');
let minutes = document.getElementById('minutes');
let seconds = document.getElementById('seconds');
let ampm = document.getElementById('ampm');


// Function to display the time:
setInterval(()=>{
    let date = new Date();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    let am = hh >= 12 ? 'PM' : 'AM';

//convert 24hr clock into 12hr clock
    if(hh > 12){
       hh = hh - 12;
    }

// add zero before single digit number
    hh = (hh < 10) ? "0" + hh : hh;
    mm = (mm < 10) ? "0" + mm : mm;
    ss = (ss < 10) ? "0" + ss : ss;


    hours.innerHTML = hh;
    minutes.innerHTML = mm;
    seconds.innerHTML = ss;
    ampm.innerHTML = am;
    
},1000);

// ************** display real time-----END  *************




//audio to ring alarm
const audio = new Audio("laugh.mp3");

//Adding loop to continue alarm
audio.loop = true;

let arr = [];
let setHr = document.getElementById("hr");
let setMin = document.getElementById("min");
let setSec = document.getElementById("sec");
let setAMPM = document.getElementById("ampm1");
let incompleteAlarmsholder = document.getElementById("incomplete-alarms");



// Selected by the user :

let totalHrs = 12;
// Range from 1 to 12 hrs
for (let i = 1; i <= totalHrs; i++) {
    setHr.options[setHr.options.length] = new Option(i < 10 ? '0' + i : i);
}

let totalMins = 59
// Range of 00-59 minutes
for (let i = 0; i <= totalMins; i++) {
    setMin.options[setMin.options.length] = new Option(i < 10 ? '0' + i : i);
}

let totalSecs = 59
// Range of 00-59 seconds
for (let i = 0; i <= totalSecs; i++) {
    setSec.options[setSec.options.length] = new Option(i < 10 ? '0' + i : i);
}

let morningornoon = ["AM", "PM"]
// setting the AM, PM
for (let i = 0; i < morningornoon.length; i++) {
    setAMPM.options[setAMPM.options.length] = new Option(morningornoon[i]);
}


// Creating new Alarm time element in form of list:
let createNewTaskElement = function (alarmString) {
    let listItem = document.createElement("li");
    let label = document.createElement("label");
    let deleteButton = document.createElement("button");

    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";
    label.innerText = alarmString;

    listItem.appendChild(label);
    listItem.appendChild(deleteButton);
    return listItem;
}



// Clicking the alarm time button which triggers creating the alarm time element:

document.getElementById("setButton").addEventListener("click", function () {
    let selectedHr = setHr.options[setHr.selectedIndex].value;
    let selectedMin = setMin.options[setMin.selectedIndex].value;
    let selectedSec = setSec.options[setSec.selectedIndex].value;
    let selectedAMPM = setAMPM.options[setAMPM.selectedIndex].value;
    let len = arr.length + 1

    // Getting today's time
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    let alarmhr = parseInt(selectedHr)
    if (selectedAMPM == "PM") {
        alarmhr = 12 + alarmhr;
    }

    if (selectedAMPM == "AM" && alarmhr == 12) {
        alarmhr = 0;
    }
    if (alarmhr.toString.length == 1) {
        alarmhr = '0' + alarmhr;
    }
    let timeForAlarm = alarmhr + ":" + selectedMin + ":" + selectedSec
    var d = new Date(`${today} ${timeForAlarm}`);

    // Getting time in milliseconds 
    var milliseconds = d.getTime();

    // storing alarm time data in an array
    arr.push([selectedHr, selectedMin, selectedSec, selectedAMPM, milliseconds, len]);

    // milliseconds time is used for sorting the array and the first element in the array
    // will be the first alarm to get triggered
    arr = arr.sort((a, b) => a[4] - b[4]);
    let val = len.toString() + ") " + selectedHr + ":" + selectedMin + ":" + selectedSec + ":" + selectedAMPM;

    // creating the alarm list element which includes delete button
    let listItem = createNewTaskElement(val);
    incompleteAlarmsholder.appendChild(listItem);

    // This function is used for deleting an alarm element
    bindAlarmEvents(listItem);

    // function to check alarm time with real time
    setInterval(() => {
    let date = new Date();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    let am = hh >= 12 ? 'PM' : 'AM';

//convert 24hr clock into 12hr clock
    if(hh > 12){
       hh = hh - 12;
    }

// add zero before single digit number
    hh = (hh < 10) ? "0" + hh : hh;
    mm = (mm < 10) ? "0" + mm : mm;
    ss = (ss < 10) ? "0" + ss : ss;

        // When real time matches with alarm time, the alarm shows an alert and then starts ringing
        for(let i =0; i<arr.length;i++){
        if (arr.length != 0 && arr[i][0] == hh && arr[i][1] == mm && arr[i][2] == ss && arr[i][3] == am) {
            alert("Alarm is ringing");
            audio.play();
        }}
    }, 1000);
});


// When stop alarm button is clicked, alarm sound stops
document.getElementById("stopButton").addEventListener("click", function () {
    audio.pause();
})
let indexDel = 0;

// To delete  perticular alarm from the upcoming alarms:
let deleteAlarm = function () {
    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    let deleteButton = listItem.querySelector("button.delete");
    indexDel = parseInt(deleteButton.innerHTML[6]);
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][5] == indexDel) {
            arr.splice(i, 1);
        }
    }
    ul.removeChild(listItem);
}
let bindAlarmEvents = function (alarmListItem) {
    var deleteButton = alarmListItem.querySelector("button.delete");
    deleteButton.onclick = deleteAlarm;
}






































































