let question = document.getElementById("question");
let choice1 = document.getElementById("choice1");
let choice2 = document.getElementById("choice2");
let choice3 = document.getElementById("choice3");
let choice4 = document.getElementById("choice4");

let item = document.querySelector(".display_question");
let ol = document.querySelector(".options");
// let li = document.createElement("li");
// let chk = document.createElement("INPUT");
// chk.setAttribute("type", "checkbox");

// let lb = document.createElement("label");

document.getElementById("add_btn").addEventListener("click", function () {
  displayQuestion();
});

function displayQuestion() {
  let que = document.createElement("h2");
  let val = question.value;

  que.textContent = "Q1)  " + val;
  item.appendChild(que);

  choices = [choice1.value, choice2.value, choice3.value, choice4.value];

  choices.forEach((element) => {
    let li = document.createElement("li");
    let lb = document.createElement("label");
    let chk = document.createElement("INPUT");
    chk.setAttribute("type", "checkbox");

    lb.textContent = element;

    li.appendChild(chk);

    li.appendChild(lb);
    ol.appendChild(li);
  });

  item.parentElement.insertBefore(item, ol);

  // Clear input fields
  question.value = "";
  choice1.value = "";
  choice2.value = "";
  choice3.value = "";
}
