

var selectedIntention;
var selectedBgImg;

var arrayListBgImg = [
  "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg",
  "7.jpg", "8.jpg", "9.jpg", "10.jpg", "11.jpg", "12.jpg", 
  "13.jpg", "14.jpg", "15.jpg", "16.jpg", "17.jpg", "18.jpg", 
  "19.jpg", "20.jpg", "21.jpg", "22.jpg", "23.jpg", "24.jpg"
];

var arrayIntentions = [];

var arraryStorageBgRandNum = [];
var arraryStorageIntentionNum = [];

var keyBgRandNum = "KeyBgRandom_";
var keyIntentionRandNum = "KeyIntentionRandNum_";

var arraryBgNumbers = [];
var arraryIntentionNumbers = [];

function load() {

  for (var i = 0; i < arrayListBgImg.length; i++) {
    arraryBgNumbers.push(i);
  };

  retrieveFromLocalStorage();
 
}

function retrieveFromLocalStorage() {
  
    arrayIntentions = [];
    arraryStorageBgRandNum = [];
    arraryStorageIntentionNum = [];

    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      var value;
      
      var keys = key.split('_');

      if (keys[0] == "intention") {
        value = localStorage.getItem(key);

        arrayIntentions.push(value);      

      };    

      if (keys[0] == "KeyBgRandom") {
        if (parseInt(keys[1]) < arraryBgNumbers.length) {
          value = localStorage.getItem(key);

          arraryStorageBgRandNum.push(value);
        }

      }
    }

    if (arraryStorageBgRandNum.length == arraryBgNumbers.length - 1) {
        for (var i = 0; i < arraryStorageBgRandNum.length; i++) {
          localStorage.removeItem(keyBgRandNum + i);
        };
    };

    // -----------------------------------------------------------
    for (var i = 0; i < arrayIntentions.length; i++) {
      arraryIntentionNumbers.push(i);
    };

    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      var value;
      
      var keys = key.split('_');
      if (keys[0] == "KeyIntentionRandNum") {
        if (parseInt(keys[1]) < arraryIntentionNumbers.length) {
          value = localStorage.getItem(key);

          arraryStorageIntentionNum.push(value);
        }

      }

    };

    if (arraryStorageIntentionNum.length == arraryIntentionNumbers.length - 1) {
        for (var i = 0; i < arraryStorageIntentionNum.length; i++) {
          localStorage.removeItem(keyIntentionRandNum + i);
        };
    };

    randomExtractBackgroundImage();
    randomExtractIntention();
    
}
 
function randomExtractIntention() { 

  if (arrayIntentions.length > 0) {

    for (var i = 0; i < arraryStorageIntentionNum.length; i++) {
      for (var j = 0; j < arraryIntentionNumbers.length; j++) {
        if(arraryIntentionNumbers[j] == arraryStorageIntentionNum[i])
        {
          arraryIntentionNumbers.splice(j, 1);
        }
      };     
    } 

    if (arraryIntentionNumbers.length <= 0) {
      for (var i = 0; i < arrayIntentions.length; i++) {
        arraryIntentionNumbers.push(i);
      };
    };

    var rand = Math.floor(Math.random() * arraryIntentionNumbers.length);
    var num = arraryIntentionNumbers[rand];

    localStorage.setItem(keyIntentionRandNum + arraryStorageIntentionNum.length, num);

    selectedIntention = arrayIntentions[num];

  } else {
    selectedIntention = "Here is where the <br> intension shows up.";
  }
  
  replaceDivIntention();
}

function replaceDivIntention() { 
  var div = document.getElementById("txtIntention");
  div.innerHTML = selectedIntention;
}

function randomExtractBackgroundImage() {

  for (var i = 0; i < arraryStorageBgRandNum.length; i++) {
    for (var j = 0; j < arraryBgNumbers.length; j++) {
      if(arraryBgNumbers[j] == arraryStorageBgRandNum[i])
      {
        arraryBgNumbers.splice(j, 1);
      }
    };     
  } 

  var rand = Math.floor(Math.random() * arraryBgNumbers.length);
  var num = arraryBgNumbers[rand];

  localStorage.setItem(keyBgRandNum + arraryStorageBgRandNum.length, num);

  selectedBgImg = arrayListBgImg[num];

  replaceBackgroudImage();
}

function replaceBackgroudImage() {
  
  document.body.style.backgroundImage = "url(images/" + selectedBgImg + ")";
}

document.addEventListener('DOMContentLoaded', load);
    