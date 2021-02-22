let timer = Math.floor(Math.random() * 5) + 1;
var totalCompanies = [];
var dates = [];
var texts = [];
var toSaySorry = [];
let d;
let today;
let checkTimer;
let lastCheckedDate = '';

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var jsondata = JSON.parse(this.responseText);
    // console.log(jsondata.data[1].date);
    for (var i = 0; i < jsondata.data.length; i++) {
      dates.push(jsondata.data[i].date);
      totalCompanies.push(jsondata.data[i].company);
      texts.push(jsondata.data[i].text);
    }
  }
  // console.log(dates);
}

xmlhttp.open("GET", "data/apology-data.json", true);
xmlhttp.send();

chrome.runtime.onInstalled.addListener(function() {
  checkTimer = setInterval(checkDate, 120000);
  // console.log("Alarm set for " + timer + " minutes");
  // chrome.alarms.create("Start", {delayInMinutes:timer});
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({})],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.idle.onStateChanged.addListener(function(state) {
  if (state == 'active') {
    // console.log("last checked date: " + lastCheckedDate);
    clearInterval(checkTimer);
    checkTimer = setInterval(checkDate, 120000);
  }
})

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.msg == 'restart date check') {
    checkTimer = setInterval(checkDate, 120000);
    chrome.storage.sync.set({apologies:[toSaySorry[0], toSaySorry[1], toSaySorry[2], true]}, function() {
      console.log('no new apologies available');
      toSaySorry = [];
    });
  }
});

chrome.alarms.onAlarm.addListener(function() {
  alert("Today is February " + d.getDate() + ", 2021. You have a new apology waiting.");
  chrome.storage.sync.set({apologies:toSaySorry}, function() {
    // console.log('new apologies available');
  });
});

function checkDate() {
  d = new Date();
  today = (d.getMonth() + 1) + '/' + d.getDate();
  // console.log(today);
  // toSaySorry = [];
  if (dates.indexOf(today) != -1 && lastCheckedDate != today) {
    // console.log("today's date at " + dates.indexOf(today));

    //adding data to toSaySorry array
    var index = dates.indexOf(today);
    toSaySorry.push(dates[index]);
    toSaySorry.push(totalCompanies[index]);
    toSaySorry.push(texts[index]);
    toSaySorry.push(false);
    // console.log(toSaySorry);

    //setting timer to launch alert
    var newTimer =  Math.floor(Math.random() * 1080) + 1;
    chrome.alarms.create("Second", {delayInMinutes: newTimer});
    // console.log(toSaySorry);
    console.log("New alarm launched for " + newTimer + " minutes");

    lastCheckedDate = today;
    // console.log("last checked date: " + lastCheckedDate);
    clearInterval(checkTimer);
  } else if (dates.indexOf(today) != -1 && lastCheckedDate == today){
    console.log(toSaySorry);
  } else if (d.getDate() >= 27) {
    clearInterval(checkTimer);
    // console.log("project period over");
  } else if (d.getDate() < 22) {
    console.log("waiting for project to start!");
  }
}
