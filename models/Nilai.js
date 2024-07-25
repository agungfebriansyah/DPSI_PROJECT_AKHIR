const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Mahasiswa = require("./Mahasiswa");
const MataKuliah = require("./MataKuliah");

const Nilai = sequelize.define("Nilai", {
  IDNilai: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  NIMMahasiswa: {
    type: DataTypes.STRING,
    references: {
      model: Mahasiswa,
      key: "NIM",
    },
  },
  KodeMataKuliah: {
    type: DataTypes.STRING,
    references: {
      model: MataKuliah,
      key: "KodeMataKuliah",
    },
  },
  NilaiAbsensi: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  NilaiTugas: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  NilaiUTS: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  NilaiUAS: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  NilaiAkhir: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Nilai;
