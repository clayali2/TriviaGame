var myVar;
function startTimer() {
  myVar = setInterval(function(){myTimer()},1000);
  timelimit = maxtimelimit;
}
function myTimer() {
  if (timelimit > 0) {
    curmin=Math.floor(timelimit/60);
    cursec=timelimit%60;
    if (curmin!=0) { curtime=curmin+" minutes and "+cursec+" seconds left"; }
              else { curtime=cursec+" seconds left"; }
    $_('timeleft').innerHTML = curtime;
  } else {
    $_('timeleft').innerHTML = timelimit+' - Out of Time - no credit given for answer';
    clearInterval(myVar);
    startTimer();
    checkAnswer();
    rscore++
      }
  timelimit--;
  

}
//------------------------------------------------------------------------------------------------------


var pos = 0, posn, choice, correct = 0, rscore = 0;
var maxtimelimit = 5, 
timelimit = maxtimelimit;  


var questions = [
    [ "What is 20 - 5?", "7", "15", "11","16", "B" ],
    [ "What is 20 - 9?", "7", "13", "11","18","C" ],
    [ "What is 7 x 3?", "21", "24", "25","2", "A" ],
    [ "What is 8 / 2?", "10", "2", "4","7", "C" ],
    [ "What is 8 ^ 2?", "8", "2", "64","9", "C" ],
    [ "What is 8 mod 2?", "0", "1", "4","15", "A" ],
    [ "What is 6 + 4 + 2?", "12", "14", "16","19", "A" ],
    [ "What is 20 - 7?", "7", "13", "11","7", "B" ],
    [ "What is 5 x 5?", "21", "24", "25","9", "C" ],
    [ "What is 8 / 4?", "10", "2", "4","18", "B" ],
    [ "What is 8 X 8?", "10", "9", "4","64", "D" ],

];
var questionOrder = [];
function setQuestionOrder() {
  questionOrder.length = 0;
  for (var i=0; i<questions.length; i++) { questionOrder.push(i); }
  questionOrder.sort(randOrd);   
  pos = 0;  
  posn = questionOrder[pos];
}

function $_(IDS) { return document.getElementById(IDS); }
function randOrd() { return (Math.round(Math.random())-0.5); }
function renderResults(){
  var test = $_("test");
  test.innerHTML = "<h2>You got "+correct+" of "+questions.length+" questions correct</h2>";
  $_("test_status").innerHTML = "Test Completed";
  $_('timeleft').innerHTML = '';
  test.innerHTML += '<button onclick="location.reload()">Re-test</a> ';
  setQuestionOrder();
  correct = 0;
  clearInterval(myVar);
  return false;
}
function renderQuestion() {
  var test = $_("test");
  $_("test_status").innerHTML = "Question "+(pos+1)+" of "+questions.length;
  
  var question = questions[posn][0];
  var chA = questions[posn][1];
  var chB = questions[posn][2];
  var chC = questions[posn][3];
  var chD = questions[posn][4];

  test.innerHTML = "<h3>"+question+"</h3>";
  test.innerHTML += "<label><input  type='radio' name='choices' value='A'> "+chA+"</label>";
  test.innerHTML += "<label><input  type='radio' name='choices' value='B'> "+chB+"</label>";
  test.innerHTML += "<label><input  type='radio' name='choices' value='C'> "+chC+"</label>";
  test.innerHTML += "<label><input  type='radio' name='choices' value='D'> "+chD+"</label><br><br>";
  test.innerHTML += "<button onclick='checkAnswer()'>Submit Your Answer</button>";
  timelimit = maxtimelimit;
  clearInterval(myVar);
  startTimer();
}

function checkAnswer(){

  var choices = document.getElementsByName("choices");
  for (var i=0; i<choices.length; i++) {
    if (choices[i].checked) { choice = choices[i].value;
         }
         $_("cor").innerHTML =("Correct Answer: " + correct+" of "+questions.length);
  }
  
  
  rscore++;
  if (choice == questions[posn][5] && timelimit > 0) {
   correct++; }
  pos++; 
   posn = questionOrder[pos];
  if (pos < questions.length) { 
    renderQuestion();
     } else {
   renderResults(); 
   
}
}

window.onload = function() {
  setQuestionOrder();
  renderQuestion();
}
