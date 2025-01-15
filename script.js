let question = document.getElementById("question");
let choice1 = document.getElementById("choice1");
let choice2 = document.getElementById("choice2");
let choice3 = document.getElementById("choice3");
let choice4 = document.getElementById("choice4");

document.getElementById("add_btn").addEventListener("click", function () {
  displayQuestion();
});

function displayQuestion() {
  let val = question.value;
  if (val) {
    console.log(question.value);
  }
}
