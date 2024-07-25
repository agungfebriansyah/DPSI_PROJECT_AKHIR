const express = require("express");
const router = express.Router();
const { Dosen, Nilai, Mahasiswa, MataKuliah } = require("../models"); // Mengimpor model-model dari folder models
const authenticateToken = require("../middleware/authenticateToken"); // Middleware untuk otentikasi token
const authorizeRole = require("../middleware/authorizeRole"); // Middleware untuk otorisasi role

// Mendapatkan semua data mahasiswa
router.get(
  "/students",
  authenticateToken, // Middleware untuk memastikan token valid
  authorizeRole("dosen"), // Middleware untuk memastikan pengguna memiliki role "dosen"
  async (req, res) => {
    try {
      const students = await Mahasiswa.findAll(); // Mengambil semua data mahasiswa dari database
      res.json(students); // Mengirimkan data mahasiswa sebagai respons dalam format JSON
    } catch (err) {
      res.status(500).send(err); // Mengirimkan status 500 jika terjadi kesalahan
    }
  }
);

// Masukkan nilai
router.post(
  "/grades",
  authenticateToken, // Middleware untuk memastikan token valid
  authorizeRole("dosen"), // Middleware untuk memastikan pengguna memiliki role "dosen"
  async (req, res) => {
    try {
      const {
        NIMMahasiswa,
        KodeMataKuliah,
        NilaiAbsensi,
        NilaiTugas,
        NilaiUTS,
        NilaiUAS,
        NilaiAkhir,
      } = req.body; // Mendapatkan data nilai dari request body
      const newGrade = await Nilai.create({
        NIMMahasiswa,
        KodeMataKuliah,
        NilaiAbsensi,
        NilaiTugas,
        NilaiUTS,
        NilaiUAS,
        NilaiAkhir,
      }); // Menyimpan data nilai baru ke database
      res.status(201).json(newGrade); // Mengirimkan data nilai yang baru dibuat sebagai respons dalam format JSON
    } catch (err) {
      res.status(500).send(err); // Mengirimkan status 500 jika terjadi kesalahan
    }
  }
);

// Update nilai
router.put(
  "/grades/:IDNilai",
  authenticateToken, // Middleware untuk memastikan token valid
  authorizeRole("dosen"), // Middleware untuk memastikan pengguna memiliki role "dosen"
  async (req, res) => {
    try {
      const { IDNilai } = req.params; // Mendapatkan IDNilai dari parameter URL
      const { NilaiAbsensi, NilaiTugas, NilaiUTS, NilaiUAS, NilaiAkhir } =
        req.body; // Mendapatkan data nilai dari request body
      const nilai = await Nilai.findByPk(IDNilai); // Mencari data nilai berdasarkan IDNilai
      if (nilai) {
        await nilai.update({
          NilaiAbsensi,
          NilaiTugas,
          NilaiUTS,
          NilaiUAS,
          NilaiAkhir,
        }); // Memperbarui data nilai di database
        res.json(nilai); // Mengirimkan data nilai yang telah diperbarui sebagai respons dalam format JSON
      } else {
        res.status(404).send("Grade not found"); // Mengirimkan status 404 jika data nilai tidak ditemukan
      }
    } catch (err) {
      res.status(500).send(err); // Mengirimkan status 500 jika terjadi kesalahan
    }
  }
);

// Hapus nilai
router.delete(
  "/grades/:IDNilai",
  authenticateToken, // Middleware untuk memastikan token valid
  authorizeRole("dosen"), // Middleware untuk memastikan pengguna memiliki role "dosen"
  async (req, res) => {
    try {
      const { IDNilai } = req.params; // Mendapatkan IDNilai dari parameter URL
      const nilai = await Nilai.findByPk(IDNilai); // Mencari data nilai berdasarkan IDNilai
      if (nilai) {
        await nilai.destroy(); // Menghapus data nilai dari database
        res.json({
          message: "Grade deleted successfully", // Mengirimkan pesan konfirmasi bahwa nilai telah dihapus
          deletedGrade: nilai, // Mengirimkan data nilai yang telah dihapus sebagai bagian dari respons
        });
      } else {
        res.status(404).send("Grade not found"); // Mengirimkan status 404 jika data nilai tidak ditemukan
      }
    } catch (err) {
      res.status(500).send(err); // Mengirimkan status 500 jika terjadi kesalahan
    }
  }
);

module.exports = router; // Mengekspor router agar bisa digunakan di tempat lain
