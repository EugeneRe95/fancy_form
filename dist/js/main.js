const questions = [{
    question: 'Enter Your First Name'
  },
  {
    question: 'Enter Your Last Name'
  },
  {
    question: 'Enter Your Email',
    pattern: /\S+@\S+\.\S+/
  },
  {
    question: 'Create s Password',
    type: 'password'
  }
];

//Tranition Times
const shakeTime = 100;
const switchTime = 200; //Transition between questions
//Init Position at first question
let position = 0;

// Init DOM Elements
const formBox = document.querySelector('#form-box');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progress = document.querySelector('#progress-bar');

//events

document.addEventListener('DOMContentLoaded', getQuestion);

nextBtn.addEventListener('click', validate);

prevBtn.addEventListener("click", () => {

  position = position - 1;

  getQuestion();

});

inputField.addEventListener('keyup', e=>{
  if(e.keyCode==13){
    validate();
  }
})

//Functions

function getQuestion() {
  inputLabel.innerHTML = questions[position].question;
  inputField.type = questions[position].type || 'text';
  //Get answer
  inputField.value = questions[position].answer || '';
  //Focus on Element
  inputField.focus();

  //Set progress bar width
  progress.style.width = (position * 100) / questions.length + '%';

  //Add user icon or back arrow depending on question

  prevBtn.className = position ? 'fa fa-arrow-left' : 'fa fa-user';

  showQuestions();
}

//display questions
function showQuestions() {
  inputGroup.style.opacity = 1;
  inputProgress.style.transition = '';
  inputProgress.style.width = '100%';
}
//Hide question
function hideQuestion() {
  inputGroup.style.opacity = 0;
  inputLabel.style.marginLeft = 0;
  inputProgress.style.width = 0;
  inputProgress.style.transition = '';
  inputGroup.style.border = null;
}

//Transform to create shake motion
function transform(x, y) {
  formBox.style.transform = `translate(${x}px,${y}px)`;
}
//Validate field
function validate() {
  if (!inputField.value.match(questions[position].pattern || /.+/)) {
    inputFail();
  } else {
    inputPass();
  }
}
//Field input fail and pass
function inputFail() {
  formBox.className = 'error';
  //Repeat shake motion - Set i to number of shakes
  for (var i = 0; i < 6; i++) {
    setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
    setTimeout(transform, shakeTime * 6,0,0);
    inputField.focus();
  }
}

function inputPass() {
  formBox.className='';
  setTimeout(transform,shakeTime*0,0,10);
  setTimeout(transform,shakeTime*1,0,0);

  //Store Answers in array
  questions[position].answer=inputField.value;

  //Increment pos
  position++;
  if(questions[position]){
    hideQuestion();
    getQuestion();
  }else{
    hideQuestion();
    formBox.className='close';
    progress.style.width='100%';
    formComplete();
  }
}

//All fields completed
function formComplete(){
  const h1=document.createElement('h1');
  h1.classList.add('end');
  h1.appendChild(document.createTextNode(`Thanks ${questions[0].answer} You are registered and will get an email shortly`));
  setTimeout(()=>{
    formBox.parentElement.appendChild(h1);
    setTimeout(()=>h1.style.opacity=1,50);
  },1000);
}
