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

//HTML Elements
var questionDisplayElement = document.querySelector("#question-display");
var questionsLeftElement = document.querySelector("#questions-left");
var timerElement = document.querySelector("#timer-display");
var displayScoreElement = document.querySelector("#score-show");
var startDisplayElement = document.querySelector("#start-display");
var mainDisplayElement = document.querySelector("#main-display");
var scoreDisplayElement = document.querySelector("#score-display");
var buttonHolderElement = document.querySelector("#button-holder");
var endScreenElement = document.querySelector("#score-input-display");
var incorrectElement = document.querySelector("#incorrect");
var correctElement = document.querySelector("#correct");
var initialInputElement = document.querySelector("#initial-input");
var initialTextElement = document.querySelector("#initial-text");
var highscoreElement = document.querySelector("#highscores");

var answerElement;

//button elements
var startbuttonElement = document.querySelector("#start-game");
var resetButtonElement = document.querySelector("#reset");
var endGameButton = document.querySelector("#end-game");
var submitButton = document.querySelector("#submit-button");

//gameplay variables
var timeLeft;
var highscoreArray = new Array(); //store in local storage using stringify(arrayName)
var questionNumber;
var currentQuestion = new Array();
var correct;
var incorrect;
var playerInitials;

//event listeners
startbuttonElement.addEventListener('click', InitializeGame);
/*resetButtonElement.addEventListener('click', ResetGame);
endGameButton.addEventListener('click', ShowEndGame);*/


//sets the displays to show properly
startDisplayElement.setAttribute("style", "display: block");
mainDisplayElement.setAttribute("style", "display: none");
scoreDisplayElement.setAttribute("style", "display: none");
endScreenElement.setAttribute("style", "display: none");

buttonHolderElement.addEventListener('click', function(event){
    var clickClass = event.target.getAttribute("class");

    if(clickClass === "answer-button"){
        CheckAnswer(event.target);
    }
});

submitButton.addEventListener('click', function(event){
    event.preventDefault();
    SubmitScores();
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
    correct = 0;
    incorrect = 0;

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
            EndGame();
        }
    },1000);
}
//Builds the question view
function ConstructQuestion(){
    for(var i = 0; i < Object.keys(questions).length; i++){
        if(Object.keys(questions)[i] === 'question1' && questionNumber === 1){
            console.log(questionNumber);
            questionText = "Qustion 1: What does HTML stand for?";
            SetCurrentQuestion(questions.question1);
        }
        else if(Object.keys(questions)[i] === 'question2' && questionNumber === 2){
            console.log(questionNumber);
            questionText = "Qustion 2: With CSS, how do you select an element with class 'cool-guy'?";
            SetCurrentQuestion(questions.question2);
        }
        else if(Object.keys(questions)[i] === 'question3' && questionNumber === 3){
            console.log(questionNumber);
            questionText = "Question 3: What does position: absolute; do?";
            SetCurrentQuestion(questions.question3);
        }
        else if(Object.keys(questions)[i] === 'question4' && questionNumber === 4){
            console.log(questionNumber);
            questionText ="Question 4: What is the flex-flow shorthand?",
            SetCurrentQuestion(questions.question4);
        }
        else if(Object.keys(questions)[i] === 'question5' && questionNumber === 5){
            console.log(questionNumber);
            questionText = "Question 5: Where is the BEST place assign variables for CSS?";
            SetCurrentQuestion(questions.question5);
        }
        else if (questionNumber > 5){
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
        correct++;
    }
    if(isCorrect === 'false'){
        incorrect++;
    }
    questionNumber++;
    buttonHolderElement.textContent = '';
    ConstructQuestion();
}

//!finish endgame function to show score screen properly, and get user input for initials
function EndGame(){
    ShowEndGame();

    correctElement.textContent = correct;
    incorrectElement.textContent = incorrect;
}
function SubmitScores(){
    var userInitials = document.getElementById("initial-input").value;
    var finalScore = correct-incorrect;

    if(finalScore <= 0){
        finalScore = 0;
    }

    highscoreArray.push(userInitials);
    highscoreArray.push(finalScore);
    JSON.stringify(highscoreArray);
    localStorage.setItem('highscore', highscoreArray);

    ResetGame();
    //HighScoreDisplay();
}

/*function HighScoreDisplay(){
    startDisplayElement.setAttribute("style", "display: none");
    mainDisplayElement.setAttribute("style", "display: none");
    scoreDisplayElement.setAttribute("style", "display: block");
    endScreenElement.setAttribute("style", "display: none");

    highscoreArray = localStorage.getItem('highscore');
    JSON.parse(highscoreArray);

    for(var i = 0; i < highscoreArray.length; i ++){
        if(i%2===0){
            var initialElement = document.createElement('li');
            initialElement.setAttributeNS('class', 'game-text', 'id', 'initials');
            initialTextElement.appendChild(initialElement);
            initialElement.textContent = highscoreArray[i];
        }
        if(i%2 === 1){
            console.log(highscoreArray[i]);
        }
    }

}*/
//resets the displays
function ResetGame(){
    
    //sets the states of each display to default
    startDisplayElement.setAttribute("style", "display: block");
    mainDisplayElement.setAttribute("style", "display: none");
    scoreDisplayElement.setAttribute("style", "display: none");
    endScreenElement.setAttribute("style", "display: none");
}

function ShowEndGame(){
    startDisplayElement.setAttribute("style", "display: none");
    mainDisplayElement.setAttribute("style", "display: none");
    scoreDisplayElement.setAttribute("style", "display: none");
    endScreenElement.setAttribute("style", "display: block");
}