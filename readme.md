# 📘 EduLink — English Quiz Web App

A lightweight, fully client-side English Test Platform for FESTIKA 2025.  
Mendukung 3 kategori latihan: **Grammar, Vocabulary, Reading**, lengkap dengan timer, scoring, review jawaban, leaderboard, dan admin panel.  
Dapat berjalan **offline** maupun **online**.

---

## ✔️ Fitur Utama

### 1️⃣ Quiz Engine
- 30 soal per kategori  
- Tipe soal: multiple-choice & fill in the blank  
- Timer 40 detik per soal  
- Penilaian otomatis  
- Animasi transisi antar soal  
- Highlight jawaban (correct / wrong / selected)

### 2️⃣ Dark Mode
- Toggle dark/light  
- Tersimpan otomatis (localStorage)  
- Sinkron di seluruh halaman

### 3️⃣ Leaderboard
- Menyimpan Top 10  
- Nama + total poin  
- Clear leaderboard tersedia

### 4️⃣ Admin Panel
- Import soal JSON  
- Export seluruh soal  
- Reset ke default seed  
- Preview soal per kategori  
- Editing/hapus soal (opsional)

Contoh JSON:
```json
{
  "grammar": [
    { "type": "mc", "question": "...", "choices": ["a","b","c"], "answer": "a", "explanation": "..." }
  ],
  "vocab": [],
  "reading": []
}
```

### 5️⃣ Online + Offline Mode

Offline: data dari localStorage
Online: otomatis load data.json dari server
Jika gagal → fallback ke lokal
Jika lokal kosong → pakai seed default

### 6️⃣ Responsiveness
Optimized untuk:
Android / iPhone
Tablet
Desktop / Laptop

Termasuk:
Navbar collapse
Layout adaptif
Font Montserrat

---

### 📂 Struktur Proyek
```
index.html
quiz.html
result.html
leaderboard.html
admin.html
assets/
 ├── css/style.css
 └── js/
      quiz.js
      data.js
      admin.js
      result.js
      leaderboard.js
soalbaru.json (berisi soal fix demo)
```

---

### ▶️ Cara Menjalankan
```
1. Buka index.html (mode offline).
2. Deploy ke Vercel untuk mode online.
3. (Opsional) Upload data.json sebagai soal online.
4. Aplikasi langsung siap dipakai.
```

---

### 🕹️ Cara Menambah Soal
Masuk:
```/admin.html```
Upload JSON baru
Export/edit/import ulang
Reset ke default (jika perlu)

Catatan: perubahan hanya disimpan di localStorage, tidak mengubah file server.


---

### 👀 Preview Soal
Menampilkan daftar soal lengkap
Mendukung tipe, pilihan, jawaban, dan penjelasan
Responsive di mobile

---

### 🎨 UI Highlights
Neumorphic card design
Smooth hover animation
Dark/light mode
Button ripple
Montserrat font

---

### 📝 Lisensi
Dibuat untuk kegiatan FESTIKA 2025 dan bebas digunakan untuk keperluan edukasi.


---

### 👥 Pembuat
Farrell Athar R — rapid coding from AI to web
Resti Kusumawati — english quiz idea inventor & final logbook result consolidation
