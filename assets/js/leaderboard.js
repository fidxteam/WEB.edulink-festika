// leaderboard.js
(function(){
  const listEl = document.getElementById("leaderboard-list");
  const clearBtn = document.getElementById("clear-leaderboard");

  function render(){
    const lb = JSON.parse(localStorage.getItem("quiz_leaderboard") || "[]");
    if (lb.length === 0) {
      listEl.innerHTML = "<li>No entries yet. Play a quiz to appear here.</li>";
      return;
    }
    listEl.innerHTML = "";
    lb.slice(0,10).forEach((e, idx) => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>#${idx+1} ${escapeHtml(e.name)}</strong> — ${e.points} pts · ${e.score}/${e.total} · <small>${new Date(e.date).toLocaleString()}</small>`;
      listEl.appendChild(li);
    });
  }

  clearBtn.addEventListener("click", ()=> {
    if (!confirm("Yakin hapus semua leaderboard?")) return;
    localStorage.removeItem("quiz_leaderboard");
    render();
  });

  // safe escape
  function escapeHtml(s){ return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

  render();
})();
