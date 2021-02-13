let companies = document.getElementsByClassName('company');
let companyNames = ['amazon', 'facebook', 'google', 'uber'];
let generated;
var msg;
var voices = window.speechSynthesis.getVoices();
// console.log(voices);
let readYet;

var selectedVoices = [0, 10, 40, 0];

chrome.storage.sync.get('apologies', function(data) {
  // msg = '';
  generated = data.apologies;
  // alert(generated[3]);
  readYet = generated[3];
  // alert(readYet);

  if (readYet == false) {
    document.getElementById(generated[1].toLowerCase()).style.display = "block";
    document.getElementsByClassName('group1')[0].style.marginLeft = "0px";
    document.getElementById("apologyText").innerHTML = generated[2];
    document.getElementById("noApologyText").style.display = "none";
  } else {
    for (var i = 0; i < companyNames.length; i++) {
      document.getElementById(companyNames[i]).style.display = "none";
    }
    // document.getElementById("apologyText").style.display = "none";
    // document.getElementById("noApologyText").style.display = "inline-block";
  }

});

for (var i = 0; i < companies.length; i++) {
  companies[i].onclick = function() {
    // alert(readYet);
    if (readYet == false) {
      // alert(readYet);
      msg = 'restart date check';
      chrome.runtime.sendMessage({
        msg: msg
      });
      var ind = companyNames.indexOf(this.id);
      document.getElementsByClassName('group1')[0].style.marginLeft = "15px";
      displayText(selectedVoices[ind]);
      document.getElementById("signature").innerHTML = "<br>Love, " + this.id.charAt(0).toUpperCase() + this.id.slice(1);
      // console.log(msg);
    }
    // var textToDisplay = this.id + "Text";
    //clear from chrome storage
  }
}

function displayText(v) {
  document.getElementById("apologyText").style.display = "block";
  var msg = new SpeechSynthesisUtterance(document.getElementById("apologyText").innerHTML);
  voices = window.speechSynthesis.getVoices();
  console.log(voices[v]);
  msg.voice = voices[v];
  window.speechSynthesis.speak(msg);
}

//set timeout to display an alert with new apology
//TTS apology with text (?)
