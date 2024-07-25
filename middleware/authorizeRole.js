function authorizeRole(role) {
  // Mengembalikan middleware function yang memeriksa apakah pengguna memiliki role yang sesuai
  return (req, res, next) => {
    if (req.user.role !== role) {
      // Jika role pengguna tidak sesuai dengan role yang diinginkan, mengirimkan status 403 (Forbidden)
      return res.sendStatus(403);
    }
    next(); // Jika role sesuai, melanjutkan ke middleware atau handler berikutnya
  };
}

module.exports = authorizeRole; // Mengekspor fungsi authorizeRole agar bisa digunakan di tempat lain
