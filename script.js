document.addEventListener("DOMContentLoaded", function () {
  load_checkBox();
});

let question = document.getElementById("question");
let choice1 = document.getElementById("choice1");
let choice2 = document.getElementById("choice2");
let choice3 = document.getElementById("choice3");
let choice4 = document.getElementById("choice4");

let item = document.querySelector(".display_question");
// let ol = document.querySelector(".options");
let ol = document.createElement("ol");
document.getElementById("add_btn").addEventListener("click", function () {
  displayQuestion();
});

let store = [
  {
    question: "what is your name",
    choice: ["mitiku", "yared", "tekle", "woldu"],
    answer: "Mitiku",
  },
  {
    question: "what element used as a container",
    choice: ["li", "div", "display", "p"],
    answer: "div",
  },
];

let select = document.getElementById("select-question");

function load_checkBox() {
  select.innerHTML = "";
  store.forEach((element) => {
    let opt = document.createElement("option");
    opt.innerHTML = element["question"];
    opt.value = element["question"];
    select.appendChild(opt);
  });
}

select.addEventListener("click", function (event) {
  load_question(event);
});

function print_question(question, choices, answer, questionNumber = 1) {
  console.log("Choices:", choices);

  // Ensure choices is an array
  if (!Array.isArray(choices)) {
    console.error("Choices must be an array. Received:", choices);
    return;
  }

  const item = document.querySelector(".print-question");
  const ol = document.createElement("ol");

  let que = document.createElement("h2");
  que.textContent = `Q${questionNumber}) ${question}`;
  item.appendChild(que);

  choices.forEach((choice) => {
    let li = document.createElement("li");
    let lb = document.createElement("label");
    let chk = document.createElement("input");
    chk.setAttribute("type", "radio");
    chk.setAttribute("name", `question_${questionNumber}`);
    lb.textContent = choice;
    li.appendChild(chk);
    li.appendChild(lb);
    ol.appendChild(li);
  });

  item.appendChild(ol);
}

function load_question(event) {
  let selectedValue = select.options[select.selectedIndex].value;

  store.forEach((element, index) => {
    if (element["question"] === selectedValue) {
      print_question(
        selectedValue,
        element["choice"],
        element["answer"],
        index + 1
      );
    }
  });
}

function displayQuestion() {
  item.innerHTML = "";
  ol.innerHTML = "";
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
  item.appendChild(ol);
  // item.parentElement.insertBefore(item, ol);
  q = {
    question: val,
    choice: choices,
    answer: "",
  };

  store.push(q);
  load_checkBox();
  // Clear input fields
  question.value = "";
  choice1.value = "";
  choice2.value = "";
  choice3.value = "";
  choice4.value = "";
}
