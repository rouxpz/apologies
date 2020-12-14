let changeColor = document.getElementById('amazon');
let companies = document.getElementsByClassName('company');
let generated;

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
    // alert(textToDisplay);
    displayText(textToDisplay);
    //clear from chrome storage
  }
}

function displayText(id) {
  var texts = document.getElementsByClassName('apologyText');
  for (var i = 0; i < texts.length; i++) {
    texts[i].style.display = "none";
  }

  document.getElementById(id).style.display = "block";
}

//set timeout to display an alert with new apology
//TTS apology with text (?)
