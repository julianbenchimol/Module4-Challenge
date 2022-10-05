//Questions Object
var questions = {
    //example questions
    //create buttons based on these choices
    question1: {
        text: "Qustion 1: What does HTML stand for?",
        answer1: ["Hyper-Tonic Maximum Love", false],
        answer2: ["Huge Turtles Meet Luke", false],
        answer3: ["HyperText Markup Language", true],
        answer4: ["Help Tony Make Lasagna", false]
    },
}
//var properties = Object.keys(questions).length;

//HTML Elements
var questionDisplayElement = document.querySelector("#question-display");
var questionsLeftElement = document.querySelector("#questions-left");
var timerElement = document.querySelector("#timer-display");
var displayScoreElement = document.querySelector("#score-show");
var startDisplayElement = document.querySelector("#start-display");
var mainDisplayElement = document.querySelector("#main-display");
var scoreDisplayElement = document.querySelector("#score-display");

var startbuttonElement = document.querySelector("#start-game");
var resetButtonElement = document.querySelector("#reset");

//gameplay variables
var timeLeft;
var highscoreArray = new Array(); //store in local storage using stringify(arrayName)

//event listeners
startbuttonElement.addEventListener('click', InitializeGame);
resetButtonElement.addEventListener('click', ResetGame);

function InitializeGame(){

    //sets the display to hide the start display and show the main display
    startDisplayElement.setAttribute("style", "display: none");
    mainDisplayElement.setAttribute("style", "display: block");
    scoreDisplayElement.setAttribute("style", "display: none");
    
    //sets variables to default
    timeLeft = 30;
    SetTime();
}

function SetTime(){
 
    var timerInterval = setInterval(function(){

        timeLeft--;
        timerElement.textContent = timeLeft + "s";

        if(timeLeft === 0){
            clearInterval(timerInterval);
            //EndGame();
        }
    },1000);
}

function ResetGame(){
    
    //sets the states of each display to default
    startDisplayElement.setAttribute("style", "display: block");
    mainDisplayElement.setAttribute("style", "display: none");
    scoreDisplayElement.setAttribute("style", "display: none");
}