var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];

function nextSequence() {
  userClickedPattern = [];

  level++; //everytime nextsequence is called update its value by one,

  $("#level-title").text("level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

// check which button is pressed

$(".btn").click(function () {
  var userChosenColour = this.getAttribute("id");
  userClickedPattern.push(userChosenColour);
  // console.log(userClickedPattern);

  playSound(userChosenColour);

  animatepress(userChosenColour); //for adding animation

  checkAnswer(userClickedPattern.length - 1);
});

// function to play Sound
function playSound(name1) {
  var audio = new Audio("sounds/" + name1 + ".mp3");
  audio.play();
}

// adding animations
function animatepress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    //timeout
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//detecting keypress

var started = false;
var level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("level " + level);
    nextSequence();

    started = true;
  }
});

function checkAnswer(currentLevel) {
  //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {
      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    console.log("wrong");
    $("body").addClass("game-over");

    setTimeout(function () {
      //timeout
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startover();
  }
}


function startover() {
  level = 0;
  gamePattern = [];
  started = false;
}