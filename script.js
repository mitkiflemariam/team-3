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
document.getElementById("add_btn").addEventListener("click", function () {
  displayQuestion();
});

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

function load_checkBox() {
  select.innerHTML = "<option>Select one</option>";
  store.forEach((element) => {
    let opt = document.createElement("option");
    opt.innerHTML = element["question"];
    opt.value = element["question"];
    select.appendChild(opt);
  });
}

// let click_count = 0;
// select.addEventListener("click", function (event) {
//   if (click_count == 0) {
//     click_count++;
//   } else if (click_count == 1) {
//     load_question(event);
//     click_count = 0;
//   }
// });

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
  choices.forEach((choice) => {
    let li = document.createElement("li");
    let lb = document.createElement("label");
    let chk = document.createElement("input");
    chk.setAttribute("type", "radio");
    chk.setAttribute("name", "que_radio");
    chk.setAttribute("value", choice);

    lb.textContent = choice;
    li.appendChild(chk);
    li.appendChild(lb);
    ol.appendChild(li);
  });

  print_item.appendChild(ol);
  let submit = document.createElement("button");
  submit.textContent = "submit";
  print_item.appendChild(submit);
  submit.onclick = function () {
    var ele = document.getElementsByName("que_radio");
    for (i = 0; i < ele.length; i++) {
      if (ele[i].checked) {
        if (ele[i].value === found_question["answer"]) {
          flashing_image("flashingImage");
          var audio = new Audio("audio/correct.mp3");
          audio.play();
          stop_flashing_image("flashingWrongImage");
        } else {
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
  // clearInterval(image.dataset.flashInterval);
  // image.style.filter = "none"; // Reset filter to default
  // delete image.dataset.flashInterval; // Clean up the stored interval ID
  image.style.display = "none";
}
