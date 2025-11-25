📘 EduLink — English Quiz Web App

A lightweight, fully client-side English Test Platform built for FESTIKA 2025.
EduLink menyediakan 3 kategori latihan: Grammar, Vocabulary, dan Reading, lengkap dengan timer, skoring, review jawaban, dan leaderboard.

Website ini dibuat untuk pembelajaran cepat dan kompetisi TKA/Pemula, dengan fokus pada kepraktisan, UX modern, dan dapat dijalankan offline maupun online.


---

🚀 Fitur Utama
✅ 1. Quiz Engine (Grammar, Vocabulary, Reading)
30 soal per kategori
Tipe soal: multiple-choice & fill in the blank
Timer 40 detik per soal
Penilaian otomatis
Animasi transisi antar soal
Warna jawaban (correct/wrong/selected)

✅ 2. Dark Mode (Persisted)
Mode terang/gelap
Tersimpan ke localStorage
Tersinkron di semua halaman

✅ 3. Leaderboard Lokal
Menyimpan:
Nama peserta
Total poin
Skor benar
Waktu penyelesaian

Menampilkan Top 10
Bisa dihapus (Clear Leaderboard)


✅ 4. Admin Page
Halaman admin dapat:
Import file JSON soal baru
Export seluruh soal dalam format JSON
Reset soal kembali ke default
Melihat preview soal tiap kategori
Mengedit dan menghapus soal (opsional)

Contoh struktur JSON:
{
  "grammar": [
    {
      "type": "mc",
      "question": "...",
      "choices": ["a","b","c"],
      "answer": "a",
      "explanation": "..."
    }
  ],
  "vocab": [...],
  "reading": [...]
}

✅ 5. Online + Local Mode
EduLink mendukung:
Mode Offline: seluruh data soal tersimpan di localStorage
Mode Online: soal diambil dari /data.json (Vercel hosting)
Jika koneksi gagal → otomatis fallback ke soal lokal.

Logic pemilihan soal:
if (online JSON tersedia) → gunakan online
else → gunakan localStorage
else → gunakan seed default

✅ 6. Responsiveness
Situs sudah dioptimalkan untuk:
Android
iPhone
Tablet
Desktop / Laptop

Dengan layout:
Navbar collapse
Card wrap otomatis
Teks menyesuaikan layar kecil

---

📂 Struktur Proyek
/
├── index.html
├── quiz.html
├── result.html
├── leaderboard.html
├── admin.html
├── assets/
│   ├── css/style.css
│   ├── js/
│   │   ├── quiz.js
│   │   ├── data.js
│   │   ├── admin.js
│   │   ├── leaderboard.js
│   │   └── result.js
│   └── img/
└── data.json (optional, jika host online)

---

🛠️ Cara Menjalankan
1. Lokal (offline)
Cukup buka index.html di browser:
file:///.../EduLink/index.html

3. Deploy Online (Vercel)
1. Upload folder ke GitHub
2. Deploy via Vercel
3. Tambahkan data.json untuk soal online (opsional)
4. EduLink siap digunakan semua peserta

---

🎮 Cara Menambah Soal
Masuk ke:
/admin.html
Lalu:
Upload berkas JSON baru
Atau export-then-edit lalu import lagi
Atau reset ke seed default
Semua perubahan hanya berlaku pada:
localStorage → tidak mengubah file server

---

🧪 Preview Soal
Admin dapat melihat daftar soal:
Per kategori
Lengkap dengan tipe, pilihan, jawaban, dan penjelasannya
Mode mobile sudah diperbaiki agar tidak overflow.

---

🎨 UI Highlights
Modern neumorphic card design
Smooth hover animation
Dark/light mode toggling
Button ripple
Clean typography (Montserrat)



---

📄 Lisensi
Proyek ini dibuat untuk kebutuhan FESTIKA 2025 dan dapat digunakan secara bebas untuk keperluan edukasi.

---

✨ Pembuat
Farrell Athar R — rapid coding from AI to web
Resti Kusumawati — english quiz idea inventor & final logbook result consolidation

---

