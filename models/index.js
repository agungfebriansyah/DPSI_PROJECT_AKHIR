// models/index.js
const sequelize = require("../config/database");
const User = require("./User");
const Dosen = require("./Dosen");
const Mahasiswa = require("./Mahasiswa");
const MataKuliah = require("./MataKuliah");
const Nilai = require("./Nilai");

Dosen.hasMany(MataKuliah, { foreignKey: "NIDN" });
MataKuliah.belongsTo(Dosen, { foreignKey: "NIDN" });

Mahasiswa.hasMany(Nilai, { foreignKey: "NIMMahasiswa" });
MataKuliah.hasMany(Nilai, { foreignKey: "KodeMataKuliah" });

module.exports = {
  sequelize,
  User,
  Dosen,
  Mahasiswa,
  MataKuliah,
  Nilai,
};
