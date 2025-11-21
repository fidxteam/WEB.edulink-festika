// result.js
(function(){
  const summary = JSON.parse(localStorage.getItem("last_quiz_summary") || "null");
  if (!summary) {
    document.getElementById("score-text").innerText = "No result found.";
    return;
  }

  const scoreText = document.getElementById("score-text");
  const pointText = document.getElementById("point-text");
  const review = document.getElementById("answers-review");
  const saveBtn = document.getElementById("save-leaderboard-btn");

  scoreText.innerText = `Correct Answers: ${summary.score} / ${summary.total}`;
  pointText.innerText = `Total Points: ${summary.points}`;

  // review answers
  let html = "<h4>Review:</h4><ol>";
  summary.answers.forEach(a => {
    const correctMark = a.correct ? "✅" : "❌";
    html += `<li><strong>${a.question}</strong><br/>Your answer: ${a.selected ?? "<i>no answer</i>"} — ${correctMark} <br/><small>Time left: ${a.timeLeft}s</small></li>`;
  });
  html += "</ol>";
  review.innerHTML = html;

  saveBtn.addEventListener("click", ()=> {
    const name = prompt("Masukkan namamu untuk Leaderboard (inisial / nama):");
    if (!name) return alert("Nama kosong. Batal menyimpan.");

    // load leaderboard
    const lb = JSON.parse(localStorage.getItem("quiz_leaderboard") || "[]");
    lb.push({
      name,
      category: summary.category,
      score: summary.score,
      points: summary.points,
      total: summary.total,
      date: new Date().toISOString()
    });
    // sort desc by points, keep top 50
    lb.sort((a,b)=> b.points - a.points || b.score - a.score);
    localStorage.setItem("quiz_leaderboard", JSON.stringify(lb.slice(0,50)));
    alert("Disimpan ke leaderboard!");
    // redirect to leaderboard
    window.location.href = "leaderboard.html";
  });
})();
