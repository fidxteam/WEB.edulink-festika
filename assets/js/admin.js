// admin.js (FINAL VERSION – With Pretty Preview, Edit & Delete)

(function(){

  const fileInput = document.getElementById("import-file");
  const importBtn = document.getElementById("import-btn");
  const exportBtn = document.getElementById("export-json");
  const resetBtn = document.getElementById("reset-to-seed");
  const preview = document.getElementById("preview-area");

  // default seed (boleh kosong)
  const defaultSeed = {
    "grammar": [],
    "vocab": [],
    "reading": []
  };

  // load storage
  function loadStore(){
    return JSON.parse(localStorage.getItem("questions") || JSON.stringify(defaultSeed));
  }

  function saveStore(data){
    localStorage.setItem("questions", JSON.stringify(data));
  }

  // -------------------------------
  // IMPORT FILE
  // -------------------------------
  importBtn.addEventListener("click", function(e){
    e.preventDefault();
    if (!fileInput.files.length){
      alert("Pilih file JSON dulu.");
      return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e){
      try{
        const data = JSON.parse(e.target.result);
        saveStore(data);
        alert("Import berhasil!");
        renderPreview();
      }catch(err){
        alert("Format JSON tidak valid!");
      }
    };

    reader.readAsText(file);
  });

  // -------------------------------
  // EXPORT FILE
  // -------------------------------
  exportBtn.addEventListener("click", function(){
    const data = loadStore();
    const blob = new Blob([JSON.stringify(data, null, 2)], {type:"application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "questions_export.json";
    a.click();
  });

  // -------------------------------
  // RESET SEED
  // -------------------------------
  resetBtn.addEventListener("click", function(){
    if (confirm("Yakin reset ke soal default?")){
      saveStore(defaultSeed);
      renderPreview();
      alert("Reset berhasil!");
    }
  });

  // -------------------------------
  // DELETE QUESTION
  // -------------------------------
  function deleteQuestion(category, index){
    const store = loadStore();
    store[category].splice(index, 1);
    saveStore(store);
    renderPreview();
  }

  // -------------------------------
  // EDIT QUESTION (POPUP FORM)
  // -------------------------------
  function editQuestion(category, index){
    const store = loadStore();
    const q = store[category][index];

    const newQuestion = prompt("Edit Question:", q.question);
    if (newQuestion === null) return;

    let newType = prompt("Type (mc/fill):", q.type);
    if (newType === null) return;

    let newChoices = [];
    if (newType === "mc"){
      let txt = prompt("Choices (comma separated):", q.choices.join(","));
      if (txt === null) return;
      newChoices = txt.split(",").map(s=>s.trim());
    }

    let newAnswer = prompt("Answer:", q.answer);
    if (newAnswer === null) return;

    // Update
    store[category][index] = {
      type: newType,
      question: newQuestion,
      ...(newType === "mc" ? {choices:newChoices} : {}),
      answer: newAnswer
    };

    saveStore(store);
    renderPreview();
  }

  // -------------------------------
  // PREVIEW RAPIH
  // -------------------------------
  function renderPreview(){
    const store = loadStore();
    let html = "";

    Object.keys(store).forEach(cat => {

      html += `
      <h2 style="margin-top:25px; color:#2563eb;">${cat.toUpperCase()}</h2>
      <div style="margin-bottom:15px; font-size:14px; color:#64748b;">
        Total Soal: ${store[cat].length}
      </div>
      `;

      store[cat].forEach((q, i)=> {
        html += `
        <div style="
          background:white;
          padding:15px;
          border-radius:12px;
          box-shadow:0 4px 14px rgba(0,0,0,0.08);
          margin-bottom:12px;
          text-align:left;
        ">
          <div><b>#${i+1}</b></div>
          <div><b>Question:</b> ${q.question}</div>
          <div><b>Type:</b> ${q.type}</div>
          
          ${q.type === "mc" ? `
            <div><b>Choices:</b> ${q.choices.join(", ")}</div>
          ` : ""}

          <div><b>Answer:</b> ${q.answer}</div>

          <div style="margin-top:10px;">
            <button onclick="__edit('${cat}', ${i})" 
              style="padding:6px 10px; border:none; background:#3b82f6; color:white; border-radius:6px; margin-right:6px;">
              ✏ Edit
            </button>

            <button onclick="__delete('${cat}', ${i})" 
              style="padding:6px 10px; border:none; background:#ef4444; color:white; border-radius:6px;">
              ❌ Delete
            </button>
          </div>
        </div>
        `;
      });

    });

    preview.innerHTML = html;
  }

  // expose functions to window
  window.__delete = deleteQuestion;
  window.__edit = editQuestion;

  // start
  renderPreview();

})();
