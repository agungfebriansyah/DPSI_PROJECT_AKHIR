const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Mahasiswa = sequelize.define(
  "Mahasiswa",
  {
    NIM: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    Nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Jurusan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Kelas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Mahasiswa",
    timestamps: true,
  }
);

module.exports = Mahasiswa;
