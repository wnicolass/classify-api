"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');

exports. default = function (sequelize, DataTypes) {
  return sequelize.define('EmailValidationStatus', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    status_name: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
  }, {
    sequelize,
    tableName: 'EmailValidationStatus',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'id' },
        ],
      },
    ],
  });
}
