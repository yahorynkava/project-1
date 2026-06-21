const tabs = [...document.querySelectorAll(".tab")];
const equations = document.querySelector("#equations");
const tableNumber = document.querySelector("#table-number");
const question = document.querySelector("#question");
const quizForm = document.querySelector("#quiz-form");
const answer = document.querySelector("#answer");
const feedback = document.querySelector("#feedback");

let currentTable = 10;
let currentMultiplier = 7;

function newQuestion() {
  currentMultiplier = Math.floor(Math.random() * 12) + 1;
  question.textContent = `${currentTable} × ${currentMultiplier}`;
  answer.value = "";
  feedback.textContent = "";
  feedback.classList.remove("wrong");
}

function renderTable(number) {
  currentTable = number;
  tableNumber.textContent = number;
  equations.innerHTML = Array.from({ length: 12 }, (_, index) => {
    const multiplier = index + 1;
    return `<p class="equation">${number} × ${multiplier} = <b>${number * multiplier}</b></p>`;
  }).join("");
  newQuestion();
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });
    renderTable(Number(tab.dataset.table));
    document.querySelector(".page-right").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

quizForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const correctAnswer = currentTable * currentMultiplier;
  const guess = Number(answer.value.trim());

  if (answer.value.trim() !== "" && guess === correctAnswer) {
    feedback.textContent = "Brilliant! You got it!";
    feedback.classList.remove("wrong");
    window.setTimeout(newQuestion, 900);
  } else {
    feedback.textContent = "Almost! Look at the table and try once more.";
    feedback.classList.add("wrong");
    answer.select();
  }
});

renderTable(currentTable);
