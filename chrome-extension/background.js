let timer = Math.floor(Math.random() * 5) + 1;
var totalCompanies = ["amazon", "facebook", "google"];
var toSaySorry = ["amazon", "google"];

chrome.runtime.onInstalled.addListener(function() {
  console.log("Alarm set for " + timer + " minutes");
  chrome.alarms.create("Start", {delayInMinutes:timer});
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({})],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.msg == 'reload apologies') {
    toSaySorry = [];
    for (var i = 0; i < request.companiesNumber; i++) {
      //select company randomly and add to toSaySorry
      var indexToSelect = Math.floor(Math.random() * totalCompanies.length);
      if (toSaySorry.indexOf(totalCompanies[indexToSelect]) == -1) {
        toSaySorry.push(totalCompanies[indexToSelect]);
      }
    }
  }
  var newTimer =  Math.floor(Math.random() * 2) + 1;
  chrome.alarms.create("Second", {delayInMinutes: newTimer});
  console.log(toSaySorry);
  console.log("New alarm launched for " + newTimer + " minutes");
});

chrome.alarms.onAlarm.addListener(function() {
  alert("You have a new apology waiting.");
  chrome.storage.sync.set({apologies:toSaySorry}, function() {
    console.log('new apologies available');
  });
});
