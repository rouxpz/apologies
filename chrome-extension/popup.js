let companies = document.getElementsByClassName('company');
let companyNames = ['amazon', 'facebook', 'google'];
let generated;

var selectedVoices = [0, 10, 40];

chrome.storage.sync.get('apologies', function(data) {
  for (var i = 0; i < companies.length; i++) {
    companies[i].style.display = "none";
  }
  generated = data.apologies;
  // alert("Apologies waiting from: " + generated[0] + " and " + generated[1]);
  for (var i = 0; i < generated.length; i++) {
    document.getElementById(generated[i]).style.display = "block";
  }
});

for (var i = 0; i < companies.length; i++) {
  companies[i].onclick = function() {
    var textToDisplay = this.id + "Text";
    var ind = companyNames.indexOf(this.id);
    // console.log(selectedVoices[ind]);
    displayText(textToDisplay, selectedVoices[ind]);
    //clear from chrome storage
  }
}

function displayText(id, v) {
  var texts = document.getElementsByClassName('apologyText');
  for (var i = 0; i < texts.length; i++) {
    texts[i].style.display = "none";
  }

  document.getElementById(id).style.display = "block";
  var voices = window.speechSynthesis.getVoices();
  console.log(voices[v]);
  var msg = new SpeechSynthesisUtterance(document.getElementById(id).innerHTML);
  msg.voice = voices[v];
  window.speechSynthesis.speak(msg);
}

//set timeout to display an alert with new apology
//TTS apology with text (?)
