// quiz.js (FINAL VERSION – LIMIT 15 QUESTIONS)
(function(){
  // CONFIG
  const TIME_PER_QUESTION = 45; 
  const BASE_POINT = 10; 
  const BONUS_PER_SEC = 1;

  const params = new URLSearchParams(window.location.search);
  const category = params.get("category") || "grammar";

  // Load questions from localStorage (KEY FIXED)
  let store = JSON.parse(localStorage.getItem("questions") || "{}");
  let allQuestions = store[category] ? [...store[category]] : [];

  // LIMIT → random 15 questions only
  function shuffle(arr){
    return arr.sort(() => Math.random() - 0.5);
  }

  let quizData =
    allQuestions.length > 30
      ? shuffle(allQuestions).slice(0, 30)
      : allQuestions;

  // STATE
  let index = 0;
  let score = 0;
  let points = 0;
  let answers = [];
  let timer = null;
  let timeLeft = TIME_PER_QUESTION;
  let selectedAnswer = null;

  // ELEMENTS
  const titleEl = document.getElementById("quiz-title");
  const qEl = document.getElementById("question");
  const choicesEl = document.getElementById("choices");
  const fillInput = document.getElementById("fill-input");
  const nextBtn = document.getElementById("next-btn");
  const prevBtn = document.getElementById("prev-btn");
  const scoreEl = document.getElementById("score");
  const pointsEl = document.getElementById("points");
  const progressBar = document.getElementById("progress-bar");
  const timerText = document.getElementById("timer-text");
  const timerBar = document.getElementById("timer-bar");

  // INIT
  titleEl.innerText = `Category: ${category.toUpperCase()}`;

  function updateMeta(){
    scoreEl.innerText = score;
    pointsEl.innerText = points;
  }

  function startTimer(){
    clearInterval(timer);
    timeLeft = TIME_PER_QUESTION;
    timerText.innerText = `${timeLeft}s`;
    timerBar.style.width = "100%";

    timer = setInterval(()=> {
      timeLeft -= 1;
      if (timeLeft < 0) {
        clearInterval(timer);
        handleTimeout();
        return;
      }
      timerText.innerText = `${timeLeft}s`;
      const pct = (timeLeft / TIME_PER_QUESTION) * 100;
      timerBar.style.width = pct + "%";
    }, 1000);
  }

  function handleTimeout(){
    recordAnswer(null, true);
    flashChoice(null, false);
    setTimeout(()=> {
      goNext();
    }, 700);
  }

  function loadQuestion(){
    if (!quizData || quizData.length === 0) {
      qEl.innerText = "No questions found for this category.";
      choicesEl.innerHTML = "";
      nextBtn.disabled = true;
      return;
    }

      const quizBox = document.getElementById("quiz-box");
      quizBox.classList.remove("fade-in");
      quizBox.classList.add("fade-out");

      setTimeout(() => {
          quizBox.classList.remove("fade-out");
          quizBox.classList.add("fade-in");
      }, 160);

    const q = quizData[index];
    qEl.innerText = `${index + 1}. ${q.question}`;

    choicesEl.innerHTML = "";
    fillInput.style.display = "none";
    fillInput.value = "";

    selectedAnswer = null;

    if (q.type === "mc") {
      q.choices.forEach((c) => {
        const btn = document.createElement("button");
        btn.innerText = c;
        btn.className = "choice-btn";

        btn.addEventListener("click", () => {
          document.querySelectorAll("#choices button").forEach(el =>
            el.classList.remove("choice-selected")
          );
          btn.classList.add("choice-selected");
          selectedAnswer = c;
        });

        choicesEl.appendChild(btn);
      });
    } 
    else if (q.type === "fill") {
      fillInput.style.display = "block";
      fillInput.focus();
      fillInput.addEventListener("input", () => {
        selectedAnswer = fillInput.value.trim();
      });
    }

    updateProgress();
    startTimer();
  }

  function updateProgress(){
    const pct = (index / quizData.length) * 100;
    progressBar.style.width = pct + "%";
  }

  function recordAnswer(selected, timeout=false){
    const q = quizData[index];
    const correct = selected && selected.toString().toLowerCase() === String(q.answer).toLowerCase();

    answers.push({
      index,
      question: q.question,
      selected: selected,
      correct: !!correct,
      timeLeft: timeout ? 0 : Math.max(0, timeLeft)
    });

    if (correct) {
      score++;
      points += BASE_POINT;
      points += Math.floor(Math.max(0, timeLeft)) * BONUS_PER_SEC;
    }

    updateMeta();
  }

  function flashChoice(btnEl, isCorrect){
    if (!btnEl) {
      choicesEl.classList.add("choice-wrong");
      setTimeout(()=> choicesEl.classList.remove("choice-wrong"), 400);
    } else {
      btnEl.classList.remove("choice-selected"); 
      btnEl.classList.add(isCorrect ? "choice-correct" : "choice-wrong");

      setTimeout(()=> {
        btnEl.classList.remove(isCorrect ? "choice-correct" : "choice-wrong");
      }, 800);
    }
  }

  function goNext(){
  clearInterval(timer);

  const q = quizData[index];
  let chosen = selectedAnswer;

  if (!chosen) recordAnswer(null, false);
  else recordAnswer(chosen, false);

  // Jika ada penjelasan → TAMPILKAN
  if (q.explain){
    showExplanation(q.explain, () => {
      index++;
      if (index >= quizData.length) finishQuiz();
      else loadQuestion();
    });
    return;
  }

  // Kalau tidak ada penjelasan → langsung lanjut
  index++;
  if (index >= quizData.length) finishQuiz();
  else loadQuestion();
}


  function goPrev(){
    if (index === 0) return;
    answers.pop();
    index--;
    loadQuestion();
    updateMeta();
  }

  function finishQuiz(){
    clearInterval(timer);
    progressBar.style.width = "100%";

    localStorage.setItem("last_quiz_summary", JSON.stringify({
      category,
      total: quizData.length,
      score,
      points,
      answers,
      date: new Date().toISOString()
    }));

    localStorage.setItem("last_quiz_points", points);
    localStorage.setItem("last_quiz_score", score);

    window.location.href = "result.html";
  }

  function showExplanation(text, callback){
  const box = document.getElementById("explain-box");
  box.style.display = "block";
  box.className = "explain-box";
  box.innerText = text;

  setTimeout(() => {
    box.style.display = "none";
    callback(); // lanjut soal
  }, 3500);
}

  nextBtn.addEventListener("click",()=>{
    const q = quizData[index];

    if (q.type === "mc" && !selectedAnswer){
      if (!confirm("Kamu belum memilih jawaban. Lanjut tanpa menjawab?")) return;
    }
    if (q.type === "fill" && !selectedAnswer){
      if (!confirm("Kamu belum mengisi jawaban. Lanjut tanpa menjawab?")) return;
    }

    goNext();
  });

  prevBtn.addEventListener("click",()=> goPrev());

  document.addEventListener("keydown",(e)=> {
    if(e.key === "Enter"){
      nextBtn.click();
    }
  });

  updateMeta();
  loadQuestion();

})();
