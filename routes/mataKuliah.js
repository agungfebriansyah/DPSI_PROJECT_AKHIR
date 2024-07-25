// routes/mataKuliah.js
const express = require("express");
const { MataKuliah } = require("../models");
const authenticateToken = require("../middleware/authenticateToken");
const authorizeRole = require("../middleware/authorizeRole");
const router = express.Router();

// Get all MataKuliah
router.get("/", authenticateToken, async (req, res) => {
  try {
    const mataKuliah = await MataKuliah.findAll();
    res.json(mataKuliah);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get MataKuliah by KodeMataKuliah
router.get("/:kode", authenticateToken, async (req, res) => {
  try {
    const mataKuliah = await MataKuliah.findByPk(req.params.kode);
    if (!mataKuliah)
      return res.status(404).json({ error: "MataKuliah not found" });
    res.json(mataKuliah);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Create new MataKuliah
router.post(
  "/",
  authenticateToken,
  authorizeRole("admin"),
  async (req, res) => {
    const { KodeMataKuliah, NamaMataKuliah, SKS } = req.body;
    try {
      const mataKuliah = await MataKuliah.create({
        KodeMataKuliah,
        NamaMataKuliah,
        SKS,
      });
      res.status(201).json(mataKuliah);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

// Update MataKuliah
router.put(
  "/:kode",
  authenticateToken,
  authorizeRole("admin"),
  async (req, res) => {
    const { NamaMataKuliah, SKS } = req.body;
    try {
      const mataKuliah = await MataKuliah.findByPk(req.params.kode);
      if (!mataKuliah)
        return res.status(404).json({ error: "MataKuliah not found" });

      mataKuliah.NamaMataKuliah = NamaMataKuliah;
      mataKuliah.SKS = SKS;
      await mataKuliah.save();

      res.json(mataKuliah);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

// Delete MataKuliah
router.delete(
  "/:kode",
  authenticateToken,
  authorizeRole("admin"),
  async (req, res) => {
    try {
      const mataKuliah = await MataKuliah.findByPk(req.params.kode);
      if (!mataKuliah)
        return res.status(404).json({ error: "MataKuliah not found" });

      await mataKuliah.destroy();
      res.json({ message: "MataKuliah deleted" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

module.exports = router;
