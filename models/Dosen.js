// models/Dosen.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Dosen = sequelize.define("Dosen", {
  NIDN: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  Nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  BidangKeahlian: {
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
});

module.exports = Dosen;
