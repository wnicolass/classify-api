"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');

exports. default = function (sequelize, DataTypes) {
  return sequelize.define('FieldDefinition', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    field_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: 'field_name',
    },
    field_type: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'FieldDefinition',
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
      {
        name: 'field_name',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'field_name' },
        ],
      },
    ],
  });
}
