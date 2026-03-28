var turtles = shuffle([...rawTurtleData])

var currentTurtle = turtles[0].name;
document.getElementById('turtlePicture').src = turtles[0].image 

var currentIndex = 1;
var currentScore = 0;
var runningTotal = 0;

populateDataList()
document.getElementById("textInput").focus();
document.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      if (document.getElementById('textInput').value != "") {
        submitForm()
      }
        
    }
});

// -------------------

// taken from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function populateDataList() {
  var options = '';
  for (var i = 0; i < rawTurtleData.length; i++) {
    options += '<option value="' + rawTurtleData[i].name + '" />';
  }
  document.getElementById('suggestions').innerHTML = options;
}

function setNextTurtle() {
  currentTurtle = turtles[currentIndex].name;
  document.getElementById('turtlePicture').src = turtles[currentIndex].image 
  
  if (currentIndex < turtles.length-1) {
    currentIndex +=1
  } else {  
    let lastTurtle = turtles[currentIndex]
    turtles = shuffle([...rawTurtleData])
        
    while (turtles[0] == lastTurtle) {
      turtles = shuffle([...rawTurtleData])
    }
    
    currentIndex = 0
  }
}

function submitForm() {
  let guess = document.getElementById('textInput').value
  if (guess.toLowerCase() == currentTurtle.toLowerCase()) {
    alert('Correct!')
    currentScore +=1
  } else {
    alert(`Incorrect, correct answer was ${currentTurtle}`)
  }
  
  runningTotal +=1;
  document.getElementById('score').innerHTML = `Current Score: ${currentScore} / ${runningTotal}` 
  setNextTurtle()
  document.getElementById('textInput').value = ""
}

