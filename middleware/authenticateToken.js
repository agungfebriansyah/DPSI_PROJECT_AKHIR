const jwt = require("jsonwebtoken"); // Mengimpor modul jsonwebtoken untuk menangani token JWT
require("dotenv").config();

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"]; // Mendapatkan header Authorization dari permintaan
  const token = authHeader && authHeader.split(" ")[1]; // Memisahkan kata "Bearer" dari token dan mengambil tokennya

  if (token == null) return res.sendStatus(401); // Jika tidak ada token, mengirim status 401 (Unauthorized)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // Memverifikasi token menggunakan ACCESS_TOKEN_SECRET
    if (err) return res.sendStatus(403); // Jika verifikasi gagal (misalnya, token tidak valid atau kadaluarsa), mengirim status 403 (Forbidden)
    req.user = user; // Menyimpan informasi pengguna yang terdapat di dalam token ke dalam objek req
    next(); // Melanjutkan ke middleware atau handler berikutnya
  });
}

module.exports = authenticateToken; // Mengekspor fungsi authenticateToken agar bisa digunakan di tempat lain
