const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const MataKuliah = sequelize.define("MataKuliah", {
  KodeMataKuliah: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  NamaMataKuliah: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  SKS: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = MataKuliah;
