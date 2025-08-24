let player = {name:"", age:0, score:0};
let questions = [];
let current = 0;

function startGame() {
  const name = document.getElementById("nameInput").value.trim();
  const age = parseInt(document.getElementById("ageInput").value);
  if(!name || !age) { alert("Please enter your name and age"); return; }

  player.name = name; player.age = age;
  document.getElementById("playerName").innerText = `(${name})`;

  let level = age <= 12 ? "easy" : age <= 18 ? "medium" : "hard";
  questions = getRandomQuestions(level, 20);

  document.getElementById("startScreen").classList.add("hidden");
  document.getElementById("gameScreen").classList.remove("hidden");

  showQuestion();
}

function getRandomQuestions(level, count) {
  const pool = [...questionsBank[level]];
  return pool.sort(() => Math.random() - 0.5).slice(0, count);
}

function showQuestion() {
  if(current >= questions.length) return endGame();
  const q = questions[current];
  document.getElementById("questionText").innerText = q.q;
  const opts = document.getElementById("options");
  opts.innerHTML = "";
  q.options.sort(() => Math.random() - 0.5).forEach(opt => {
    const btn = document.createElement("div");
    btn.className = "option";
    btn.innerText = opt;
    btn.onclick = () => checkAnswer(opt);
    opts.appendChild(btn);
  });
  document.getElementById("progress").innerText = `Question ${current+1} of ${questions.length}`;
}

function checkAnswer(choice) {
  if(choice === questions[current].answer) player.score++;
  current++;
  showQuestion();
}

function endGame() {
  document.getElementById("gameScreen").classList.add("hidden");
  document.getElementById("resultScreen").classList.remove("hidden");
  document.getElementById("finalScore").innerText = `${player.name}, your score is ${player.score}/${questions.length}`;
}