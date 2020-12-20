let companies = document.getElementsByClassName('company');
let companyNames = ['amazon', 'facebook', 'google'];
let generated;
var msg = '';
var voices = window.speechSynthesis.getVoices();
console.log(voices);

var selectedVoices = [0, 10, 40];

chrome.storage.sync.get('apologies', function(data) {
  msg = '';
  for (var i = 0; i < companies.length; i++) {
    companies[i].style.display = "none";
  }
  generated = data.apologies;
  // alert("Apologies waiting from: " + generated[0] + " and " + generated[1]);
  for (var i = 0; i < generated.length; i++) {
    document.getElementById(generated[i]).style.display = "block";
    document.getElementsByClassName('group1')[0].style.marginLeft = "0px";
  }
});

for (var i = 0; i < companies.length; i++) {
  companies[i].onclick = function() {
    if (msg == '') {
      msg = 'reload apologies';
      chrome.runtime.sendMessage({
        msg: msg,
        timer: Math.floor(Math.random() * 5),
        companiesNumber: Math.floor(Math.random() * 3) + 1
      });
    }
    var textToDisplay = this.id + "Text";
    var ind = companyNames.indexOf(this.id);
    document.getElementsByClassName('group1')[0].style.marginLeft = "10px";
    displayText(textToDisplay, selectedVoices[ind]);
    //clear from chrome storage
  }
}

function displayText(id, v) {
  var texts = document.getElementsByClassName('apologyText');
  for (var i = 0; i < texts.length; i++) {
    texts[i].style.display = "none";
  }

  var name = id.split('Text');
  var nameToPrint = name[0].charAt(0).toUpperCase() + name[0].slice(1);
  // console.log(nameToPrint);
  document.getElementById('signature').innerHTML = '<br>Love, ' + nameToPrint;
  document.getElementById(id).style.display = "block";
  var msg = new SpeechSynthesisUtterance(document.getElementById(id).innerHTML);
  voices = window.speechSynthesis.getVoices();
  console.log(voices[v]);
  msg.voice = voices[v];
  window.speechSynthesis.speak(msg);
}

//set timeout to display an alert with new apology
//TTS apology with text (?)
