
var txt;
var txtIntention;
var prefix_key = "intention_";
var arrayIntentions = [];
var arrayKeys = [];

var storageID;
var intentionID;
var intentionName;

function load() {

  //localStorage.clear();

  createIntentionContainer();   

  retrieveFromLocalStorage();

  txt = document.getElementById("txtRegisterIntention");
  
  txt.addEventListener('keyup', function() {
    if(event.keyCode == 13){
          
          createIntentionContainer();          

          saveIntention(); 
          //window.close();
          txt.value = "";
          
    }
  }, false);
}

function saveIntention() {
  txtIntention = $("#txtRegisterIntention").val(); 
  
  if (txtIntention == "") {
    console.log("No intention");
    return;
  };
  
  storageID = Math.round(new Date() / 1000);

  localStorage.setItem(prefix_key + storageID, txtIntention);

  retrieveFromLocalStorage();
}

function retrieveFromLocalStorage() {
    console.log("inside Retrieve from LocalStorage");

    arrayIntentions = [];
    arrayKeys = [];

    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      var value;
      
      var keys = key.split('_');

      if (keys[0] == "intention") {
        value = localStorage.getItem(key);
        console.log(key + " is set to " + value);

        arrayIntentions.push(value);      
        arrayKeys.push(key);
      };    
    }

    handleIntentions();
    
}

function handleIntentions() {

  console.log("arrayLength -> " + arrayIntentions.length);

  $('.classDivIntention').remove();
  
  // check the existing intentions
  if (arrayIntentions.length > 0) {

    for (var i = 0; i < arrayIntentions.length; i++) {
      console.log("arrayIntentions_" + i + "->" + arrayIntentions[i]);

      intentionName = arrayIntentions[i];
      intentionID = "button_" + i;
      createDivIntention();      
    }
  } else if(document.getElementById("intentionsContainer")){
    document.getElementById("intentionsContainer").remove();  
  }
}

function createIntentionContainer() {
  if (document.getElementById("intentionsContainer") == null) {
    var div = document.createElement("div");
    var title = document.createElement("p");
    title.innerHTML = "Your Current Intentions";
    div.appendChild(title);
    div.className = "classIntentionContainer";
    div.id = "intentionsContainer";
    title.className = "classTitleIntention";
    div.style.marginTop = "5px";
    document.getElementById("bodyIntention").appendChild(div);
  };
}

function createDivIntention() {  

  var div = document.createElement("div");
  var showText;
  if(intentionName.length > 40)
    showText = intentionName.substring(0, 40) + "...";
  else
    showText = intentionName;
  var newContent = document.createTextNode(showText); 
  var btn = document.createElement("button");
  var img = document.createElement("img");
  img.src = 'trash_icon.png';
  img.style.width = "14px";
  img.style.height = "14px";

  btn.appendChild(img);
  btn.className = "classDeleteBtn";
  btn.id = intentionID; 
  btn.onclick = function(){deleteBtnFunction(btn.id)}; 

  newContent.className = "classIntentionName";
  div.className = "classDivIntention";
  div.style.paddingLeft = "10px";
  btn.style.marginRight = "30px";

  div.appendChild(newContent);
  div.appendChild(btn);

  if (div) {
    document.getElementById("intentionsContainer").appendChild(div);
  };
}

var deleteBtnFunction = function(clickedID)
{
    var div = document.getElementById(clickedID);
    div.parentNode.remove();

    deleteIntentionFromStorage(clickedID);
}

function deleteIntentionFromStorage(btnID) {
  var ids = btnID.split('_');
  var id = ids[1];
  localStorage.removeItem(arrayKeys[id]);
  retrieveFromLocalStorage();
}


document.addEventListener('DOMContentLoaded', load);
    