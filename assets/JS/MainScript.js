//Questions Object
var questions = {
    //example questions
    //create buttons based on these choices
    question1: {
        answer1: ["Hyper-Tonic Maximum Love", false],
        answer2: ["Huge Turtles Meet Luke", false],
        answer3: ["HyperText Markup Language", true],
        answer4: ["Help Tony Make Lasagna", false]
    },
    question2: {
        answer1: [".cool-guy", true],
        answer2: ["#cool-guy", false],
        answer3: ["class.cool-guy", false],
        answer4: ["cool-guy.class", false]
    },
    question3: {
        answer1: ["Sets position relative to parent", false],
        answer2: ["Nothing. It's the normal position", false],
        answer3: ["Sets position relative to its normal position", false],
        answer4: ["Sets position relative to the viewport", true]
    },
    question4: {
        answer1: ["Quickly assign flex direct and wrap", true],
        answer2: ["Quickly align items within the flex box", false],
        answer3: ["Quickly justifies all items to the center of the flex box", false],
        answer4: ["Quickly adds space between all flex items within the flex box", false]
    },
    question5: {
        answer1: ["It doesn't matter where you assign them", false],
        answer2: ["Within the selector its used", false],
        answer3: [" Directly above the selector where its being used", false],
        answer4: ["Within the :root psuedo class", true]
    }
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
var buttonHolderElement = document.querySelector("#button-holder");
var answerElement;

//button elements
var startbuttonElement = document.querySelector("#start-game");
var resetButtonElement = document.querySelector("#reset");

//gameplay variables
var timeLeft;
var highscoreArray = new Array(); //store in local storage using stringify(arrayName)
var questionNumber;
var currentQuestion = new Array();

//event listeners
startbuttonElement.addEventListener('click', InitializeGame);
resetButtonElement.addEventListener('click', ResetGame);

//sets the displays to show properly
startDisplayElement.setAttribute("style", "display: block");
mainDisplayElement.setAttribute("style", "display: none");
scoreDisplayElement.setAttribute("style", "display: none");

buttonHolderElement.addEventListener('click', function(event){
    var clickClass = event.target.getAttribute("class");

    if(clickClass === "answer-button"){
        CheckAnswer(event.target);
    }
});
//initializes the game and sets default values for variables
function InitializeGame(){
    //sets the display to hide the start display and show the main display
    startDisplayElement.setAttribute("style", "display: none");
    mainDisplayElement.setAttribute("style", "display: block");
    scoreDisplayElement.setAttribute("style", "display: none");

    //sets timeLeft to default
    timeLeft = 30;
    questionNumber = 1;
    SetTime();
    ConstructQuestion();
}
//sets the timer
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
//Builds the question view
function ConstructQuestion(){
    for(var i = 0; i < Object.keys(questions).length; i++){
        if(Object.keys(questions)[i] === 'question1' && questionNumber === 1){
            questionText = "Qustion 1: What does HTML stand for?";
            SetCurrentQuestion(questions.question1);
        }
        else if(Object.keys(questions)[i] === 'question2' && questionNumber === 2){
            questionText = "Qustion 2: With CSS, how do you select an element with class 'cool-guy'?";
            SetCurrentQuestion(questions.question2);
        }
        else if(Object.keys(questions)[i] === 'question3' && questionNumber === 3){
            questionText = "Question 3: What does position: absolute; do?";
            SetCurrentQuestion(questions.question3);
        }
        else if(Object.keys(questions)[i] === 'question4' && questionNumber === 4){
            questionText ="Question 4: What is the flex-flow shorthand?",
            SetCurrentQuestion(questions.question4);
        }
        else if(Object.keys(questions)[i] === 'question5' && questionNumber === 5){
            questionText = "Question 5: Where is the BEST place assign variables for CSS?";
            SetCurrentQuestion(questions.question5);
        }
        else if (questionNumber < 5){
            EndGame();
        }
    }
    
}
//creates the buttons and adds text and data to each
function SetCurrentQuestion(questionObject){
    questionDisplayElement.textContent = questionText;

    for(var i in questionObject){

        currentQuestion = currentQuestion.concat(Object.values(questionObject[i]));

        answerElement = document.createElement('button');
        answerElement.classList.add('answer-button');
        buttonHolderElement.appendChild(answerElement);

        
        for(var i = 0; i < currentQuestion.length; i++){ 
            if(i % 2 === 0){
                answerElement.textContent = currentQuestion[i];
            }
            if(i % 2 === 1){
                answerElement.setAttribute("data-correct", currentQuestion[i]);
            }
        }
    }
}
//checks if the button clicked is true or false
function CheckAnswer(buttonClicked){
    var isCorrect = buttonClicked.getAttribute('data-correct');

    if(isCorrect === 'true'){
        console.log(isCorrect);
    }
    if(isCorrect === 'false'){
        console.log(isCorrect);
    }
    questionNumber++;
    buttonHolderElement.textContent = '';
    ConstructQuestion();
}

//resets the displays
function ResetGame(){
    
    //sets the states of each display to default
    startDisplayElement.setAttribute("style", "display: block");
    mainDisplayElement.setAttribute("style", "display: none");
    scoreDisplayElement.setAttribute("style", "display: none");
}