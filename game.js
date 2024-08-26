var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);

  let randomSequence = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColors[randomSequence];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  makeSound(randomChosenColour);
}

function makeSound(key) {
  let audio;
  switch (key) {
    case "red":
      audio = new Audio("sounds/red.mp3");
      break;
    case "blue":
      audio = new Audio("sounds/blue.mp3");
      break;
    case "green":
      audio = new Audio("sounds/green.mp3");
      break;
    case "yellow":
      audio = new Audio("sounds/yellow.mp3");
      break;
    case "wrong":
      audio = new Audio("sounds/wrong.mp3");
      break;
    default:
      return;
  }
  audio.currentTime = 0;
  audio.play();
}

function handleUserClicked(clickedColour) {
  userClickedPattern.push(clickedColour);
  makeSound(clickedColour);
  animatePressed(clickedColour);

  checkAnswer(userClickedPattern.length - 1);
}

function animatePressed(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

$(".btn").on("click", function () {
  let userChoosenColour = $(this).attr("id");
  handleUserClicked(userChoosenColour);
});

$(document).on("keypress", function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    makeSound("wrong");

    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}
