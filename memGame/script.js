// global constants
var clueHoldTime = 800; //how long to hold each clue's light/sound
var cluePauseTime = 333; //how long to pause in between clues
var nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence
var speed = false;

//Global Variables
var pattern = new Array(8);
var progress = 0;
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.3;  //must be between 0.0 and 1.0
var guessCounter = 0;

function startGame() {
  //initialize game variables
  progress = 0;
  gamePlaying = true;
  clueHoldTime = 800; //how long to hold each clue's light/sound
  cluePauseTime = 333; //how long to pause in between clues
  nextClueWaitTime = 1000;
  // swap the Start and Stop buttons
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  createPattern();
  playClueSequence();
}

function stopGame() {
  gamePlaying = false;
  speed = false;
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
  document.getElementById("speedUp").classList.remove("hidden");
}

function loseGame() {
  stopGame();
  alert("Game Over. You lost.");
}

function winGame() {
  stopGame();
  alert("Game Over. You won!.");
}

function guess(btn) {
  console.log("user guessed: " + btn);
  if (!gamePlaying) {
    return;
  }

  if (btn == pattern[guessCounter]) {
    if (progress == guessCounter) {
      if (progress == pattern.length - 1) {
        winGame();
      }
      else {
        progress++;
        playClueSequence();
      }
    }
    else {
      guessCounter++;
      console.log(guessCounter)
    }
  }
  else {
    loseGame();
  }
}

function lightButton(btn) {
  document.getElementById("button" + btn).classList.add("lit")
}

function clearButton(btn) {
  document.getElementById("button" + btn).classList.remove("lit")
}

function playSingleClue(btn) {
  if (gamePlaying) {
    lightButton(btn);
    playTone(btn, clueHoldTime);
    setTimeout(clearButton, clueHoldTime, btn);
  }
}

function createPattern() {
  for (let i = 0; i <= 7; i++) {
    pattern[i] = getRandomInt(4) + 1;
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function playClueSequence() {
  if (speed) {
    clueHoldTime -= 100;
    cluePauseTime -= 50;
    if (clueHoldTime <= 300) {
      speed = false;
    }
  }
  guessCounter = 0;
  let delay = nextClueWaitTime; //set delay to initial wait time
  for (let i = 0; i <= progress; i++) { // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
    setTimeout(playSingleClue, delay, pattern[i]) // set a timeout to play that clue
    delay += clueHoldTime
    delay += cluePauseTime;
  }
}

function speedUp() {
  speed = true;
  document.getElementById("speedUp").classList.add("hidden");
  startGame();
}


// Sound Synthesis Functions
const freqMap = {
  1: 261.6,
  2: 329.6,
  3: 392,
  4: 457.2
}

function playTone(btn, len) {
  o.frequency.value = freqMap[btn]
  g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025)
  tonePlaying = true
  setTimeout(function () {
    stopTone()
  }, len)
}

function startTone(btn) {
  if (!tonePlaying) {
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025)
    tonePlaying = true
  }
}

function stopTone() {
  g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025)
  tonePlaying = false
}

//Page Initialization
// Init Sound Synthesizer
var context = new AudioContext()
var o = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0, context.currentTime)
o.connect(g)
o.start(0)