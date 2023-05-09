"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');

exports. default = function (sequelize, DataTypes) {
  return sequelize.define('AdAddress', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    country: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    address_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: _sequelize.Sequelize.Sequelize.fn('current_timestamp'),
    },
  }, {
    sequelize,
    tableName: 'AdAddress',
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
      {
        name: 'ix_AdAddress_city',
        using: 'BTREE',
        fields: [
          { name: 'city' },
        ],
      },
    ],
  });
}
