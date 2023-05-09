"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');

exports. default = function (sequelize, DataTypes) {
  return sequelize.define('HashAlgo', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    hash_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'HashAlgo',
    timestamps: true,
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
