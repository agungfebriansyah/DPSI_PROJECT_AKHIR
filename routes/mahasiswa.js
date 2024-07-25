const express = require("express");
const router = express.Router();
const { Nilai, Mahasiswa, MataKuliah } = require("../models");
const authenticateToken = require("../middleware/authenticateToken");
const authorizeRole = require("../middleware/authorizeRole");

// Get grades for a student
router.get(
  "/grades",
  authenticateToken,
  authorizeRole("mahasiswa"),
  async (req, res) => {
    try {
      const { id } = req.user;
      const grades = await Nilai.findAll({ where: { NIMMahasiswa: id } });
      res.json(grades);
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

module.exports = router;
