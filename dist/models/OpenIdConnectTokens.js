"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');

exports. default = function (sequelize, DataTypes) {
  return sequelize.define('OpenIdConnectTokens', {
    state: {
      type: DataTypes.STRING(256),
      allowNull: false,
      primaryKey: true,
    },
    nonce: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'OpenIdConnectTokens',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'state' },
        ],
      },
    ],
  });
}
