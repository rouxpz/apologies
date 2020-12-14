let timer = Math.floor(Math.random() * 5) + 1;

chrome.runtime.onInstalled.addListener(function() {
  // alert("Alarm set for " + timer + " minutes");
  chrome.alarms.create("Start", {delayInMinutes:0});
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({})],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.alarms.onAlarm.addListener(function() {
  var toSaySorry = ["amazon", "google"];
  alert("You have a new apology waiting.");
  chrome.storage.sync.set({apologies:toSaySorry}, function() {
    console.log('Apologies from: ' + toSaySorry[0] + " and " + toSaySorry[1]);
  });
});
