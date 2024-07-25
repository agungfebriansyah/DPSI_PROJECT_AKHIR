var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();

// Import Models dan Routers
const sequelize = require("./config/database");
const authRoutes = require("./routes/auth");
const dosenRoutes = require("./routes/dosen");
const mahasiswaRoutes = require("./routes/mahasiswa");
const mataKuliahRouter = require("./routes/mataKuliah");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Membuat endPoint
app.use("/auth", authRoutes);
app.use("/dosen", dosenRoutes);
app.use("/mahasiswa", mahasiswaRoutes);
app.use("/matakuliah", mataKuliahRouter);

// Sync Sequelize models with database
// Sync the database
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.error("Error synchronizing database:", err);
  });

app.get("/", (req, res) => {
  res.send("Selamat datang di Aplikasi Pengelolaan Nilai Mahasiswa");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // send the error response
  res.status(err.status || 500).send({
    message: err.message,
    error: req.app.get("env") === "development" ? err : {},
  });
});
