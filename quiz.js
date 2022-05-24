let questions = [
    new Question("We can define a function having no name in JavaScript-?", 
    ["When the function is predefined", "When the function is defined as a looping statement",
    "When the function is defined using function expression syntax",
    "All of the above"], "When the function is defined using function expression syntax"), 
    new Question("Which of the following object method can be used to get a new function from a existing one-?", 
    ["Call()", "Apply()", "Bind()", "None of the above"], "Bind()"),
    new Question("Which is the property that represents the content displayed in the page in a window?", 
    ["frame", "document", "window", "content"], "document"),
    new Question("The strictly equality operator do comparison between two object by- ? ", 
    ["References of those objects are compared", "The contents of those objects are compared", "Both A and B", 
    "None of the above"], "References of those objects are compared"),
    new Question("Which of these is NOT a valid comment in JavaScript? ", 
    ["/ commented text", "/*commented text*/", "/*commented text*/", "# commented text"], "# commented text"),
    new Question("Which of the following keywords can be used to get all the parameters passed to a function during its call? ", 
    ["arguments[]", "arguments", "agr", "None of the above"], "arguments"),
    new Question("For a given array,which is the correct option to get the length of array arr-? ", 
    ["arr.len()", "len(arr)", "arr.length","None of the above"], "arr.length"),
    new Question("Which of the following methods can not be used on a array object in JavaScript-? ", 
    ["sort()", "reverse()", "indexOf()", "length()"], "length()"),
    new Question("Strings in Javascript are-? ", 
    ["Immutable", "Mutable", "Both", "None of the above"], "Immutable"),
    new Question("The value return by the getElementByClassName is-? ", 
    ["The reference to single element with that className", "An array of object of DOM nodes having the given class name", 
     "The reference to the head tag in the html file.", "None of the above"],
     "An array of object of DOM nodes having the given class name"),
    

]

function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.index = 0;
}

Quiz.prototype.getQuestionByIndex = function () {
    return this.questions[this.index];
};

Quiz.prototype.checkForCorrectAnswer = function (answer) {
    if (this.getQuestionByIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.index++;
};

Quiz.prototype.isQuizEnded = function () {
    return this.index === this.questions.length;
};

function Question(question, options, answer) {
    this.text = question;
    this.options = options;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(options) {
    return this.answer === options;
};

function loadQuestions() {
    if (quiz.isQuizEnded()) {
        showFinalScore();
    }
    else {
        let currentQuestion = quiz.getQuestionByIndex();

        let element = document.getElementById("question");
        element.innerHTML = currentQuestion.text;

        let option = currentQuestion.options;
        for( let i = 0; i < option.length; i++) {
            let eachOptionElemnt = document.getElementById("choice" + i);
            eachOptionElemnt.innerHTML = option[i];
            let eachButtonElement = document.getElementById("btn" + i);
            eachButtonElement.onclick = function() {
                document.getElementById("btn" + i).style.backgroundColor = "green";
                quiz.checkForCorrectAnswer(option[i]);
                let nextButton = document.getElementById("next");
                nextButton.onclick = function() {
                    document.getElementById("btn" + i).style.backgroundColor = "#01BBFF";
                    loadQuestions();
                };
            }
            showProgress();
            let submitButton = document.getElementById("submit");
            submitButton.onclick = function() {
                showFinalScore();
            }
        }
    }
}
let quiz = new Quiz(questions);
loadQuestions();

function showFinalScore() {
    let percentageScore = (quiz.score / questions.length) * 100;
    let quizCompletion = `<h1>Score</h1>
    <h2 id='score'> Your Score is : ${quiz.score} </h2>
    <h3>And Your percentage is : ${percentageScore}%  </h3> `;
    let quizCanvas = document.getElementById("quiz");
    quizCanvas.innerHTML = quizCompletion;
}

function showProgress() {
    let questionNo = quiz.index + 1;
    let element = document.getElementById("progress");
    element.innerHTML = `Question ${questionNo} of ${quiz.questions.length}`;
    if(questionNo === quiz.questions.length) {
            document.getElementById("next").disabled  = true

    }
}