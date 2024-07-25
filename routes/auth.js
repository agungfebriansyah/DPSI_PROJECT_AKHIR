// routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Dosen, Mahasiswa } = require("../models");
const router = express.Router();
require("dotenv").config();

router.post("/register", async (req, res) => {
  const { username, password, role, ...additionalInfo } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      username,
      password: hashedPassword,
      role,
    });

    if (role === "dosen") {
      await Dosen.create({ ...additionalInfo, Password: hashedPassword });
    } else if (role === "mahasiswa") {
      await Mahasiswa.create({ ...additionalInfo, Password: hashedPassword });
    }

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(403).json({ error: "Invalid password" });

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
