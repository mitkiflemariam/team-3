document.addEventListener("DOMContentLoaded", function () {
  load_checkBox();
});

let select = document.getElementById("select-question");

let question = document.getElementById("question");
let choice1 = document.getElementById("choice1");
let choice2 = document.getElementById("choice2");
let choice3 = document.getElementById("choice3");
let choice4 = document.getElementById("choice4");
let answer = document.getElementById("answer");

let item = document.querySelector(".display_question");
// let ol = document.querySelector(".options");
let ol = document.createElement("ol");
addBtn = document.getElementById("add_btn");

if (addBtn) {
  addBtn.addEventListener("click", function () {
    displayQuestion();
  });
} else {
  console.log("Button with id 'add_btn' not found");
}

let store = [
  {
    question: "what is your name",
    choice: ["mitiku", "yared", "tekle", "woldu"],
    answer: "mitiku",
  },
  {
    question: "what element used as a container",
    choice: ["li", "div", "display", "p"],
    answer: "div",
  },
];

// function load_checkBox() {
//   select.innerHTML = "<option>Select one</option>";
//   store.forEach((element) => {
//     let opt = document.createElement("option");
//     opt.innerHTML = element["question"];
//     opt.value = element["question"];
//     select.appendChild(opt);
//   });
// }
function load_checkBox() {
  const select = document.getElementById("select-question");
  if (!select) {
    console.log("Dropdown element not found");
    return;
  }

  console.log("Populating dropdown with options...");
  select.innerHTML = "<option>Select one</option>";

  store.forEach((element) => {
    const opt = document.createElement("option");
    opt.innerHTML = element["question"];
    opt.value = element["question"];
    select.appendChild(opt);
  });
}

// Clear existing options
select.innerHTML = "<option>Select one</option>";

// Populate dropdown with questions
store.forEach((element) => {
  const opt = document.createElement("option");
  opt.innerHTML = element["question"];
  opt.value = element["question"];
  select.appendChild(opt);
});

function highlightCorrectAnswer(correctAnswer) {
  let correctChoice = correctAnswer.closest("li");
  let allChoices = correctChoice.closest("ol").getElementsByTagName("li");
  for (let choice of allChoices) {
    choice.classList.remove("highlight");
  }
  correctChoice.classList.add("highlight");
}
function highlightWrongAnswer(wrongAnswer) {
  let wrongChoice = wrongAnswer.closest("li");
  wrongChoice.classList.add("highlight-wrong");
}

function find_by_question(question) {
  return store.find((element) => element["question"] == question);
}
const print_item = document.querySelector(".print-question");

function print_question(question, choices, answer, questionNumber = 1) {
  // Ensure choices is an array
  if (!Array.isArray(choices)) {
    console.error("Choices must be an array. Received:", choices);
    return;
  }

  const found_question = find_by_question(question);
  if (!found_question) {
    console.error("Question not found in the store:", question);
    return;
  }
  // console.log(found_question);
  const ol = document.createElement("ol");

  let que = document.createElement("h2");
  que.textContent = `Q${questionNumber}) ${question}`;
  print_item.appendChild(que);
  let correct_ans = false;
  let di = document.createElement("div");
  choices.forEach((choice) => {
    // let li = document.createElement("li");

    di.classList.add("div-radio");
    let lb = document.createElement("label");
    let chk = document.createElement("input");
    chk.setAttribute("type", "radio");
    chk.setAttribute("name", "que_radio");
    chk.setAttribute("value", choice);

    lb.textContent = choice;
    // li.appendChild(chk);
    // li.appendChild(lb);
    di.appendChild(chk);
    di.appendChild(lb);
    // ol.appendChild(li);
  });

  print_item.appendChild(di);
  let submit = document.createElement("button");
  submit.textContent = "submit";

  d = document.createElement("div");
  d.classList.add("div-button");
  d.appendChild(submit);
  print_item.appendChild(d);
  submit.onclick = function () {
    var ele = document.getElementsByName("que_radio");
    for (i = 0; i < ele.length; i++) {
      if (ele[i].checked) {
        if (ele[i].value === found_question["answer"]) {
          // highlightCorrectAnswer(ele[i]);
          flashing_image("flashingImage");
          var audio = new Audio("audio/correct.mp3");
          audio.play();
          stop_flashing_image("flashingWrongImage");
        } else {
          // highlightWrongAnswer(ele[i]);
          flashing_image("flashingWrongImage");
          var audio = new Audio("audio/wrong.mp3");
          audio.play();
          stop_flashing_image("flashingImage");
        }
      }
    }
  };
}

function load_question() {
  let selectedValue = select.options[select.selectedIndex].value;

  store.forEach((element, index) => {
    if (element["question"] === selectedValue) {
      print_question(
        selectedValue,
        element["choice"],
        element["answer"],
        index + 1
      );
      select[select.selectedIndex].remove();
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
  let ans = answer.value;
  // answer.textContent = ans;
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

  let ansElement = document.createElement("label");
  ansElement.textContent = `Answer: ${ans}`;

  item.appendChild(ol);
  item.appendChild(ansElement);
  // item.parentElement.insertBefore(item, ol);
  q = {
    question: val,
    choice: choices,
    answer: ans,
  };

  store.push(q);
  load_checkBox();
  // Clear input fields
  question.value = "";
  choice1.value = "";
  choice2.value = "";
  choice3.value = "";
  choice4.value = "";
  answer.value = "";
}

function flashing_image(selector) {
  const image = document.getElementById(selector);
  if (!image) {
    console.error(`Element with ID "${selector}" not found.`);
    return;
  }
  image.style.display = "block";
  let isRed = false;

  setInterval(() => {
    if (isRed) {
      image.style.filter = "none";
    } else {
      image.style.filter = "hue-rotate(0deg) saturate(1000%) brightness(50%)";
    }
    isRed = !isRed;
  }, 500); // Adjust the interval time as needed
}

function stop_flashing_image(selectorOrElement) {
  let image = document.getElementById(selectorOrElement);
  image.style.display = "none";
}

// var acc = document.getElementsByClassName("accordion");

var acc = document.getElementsByClassName("nav-link");
var i;
var count = 0;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;

    if (panel.style.display === "block") {
      panel.style.display = "none";
      count = count + 1;
    } else {
      panel.style.display = "block";
    }
    if (count) {
      this.classList.toggle("in-active");
      panel.style.display = "none";

      return;
    }
  });
}
