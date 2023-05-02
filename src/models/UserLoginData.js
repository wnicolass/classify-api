const { Sequelize } = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('UserLoginData', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'UserAccount',
        key: 'user_id',
      },
    },
    password_hash: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
    password_salt: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
    email_addr: {
      type: DataTypes.STRING(320),
      allowNull: false,
      unique: 'email_addr',
    },
    confirm_token: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    confirm_token_time: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    recovery_token: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    recovery_token_time: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    hash_algo_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'HashAlgo',
        key: 'id',
      },
    },
    email_validation_status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'EmailValidationStatus',
        key: 'id',
      },
    },
  }, {
    sequelize,
    tableName: 'UserLoginData',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'user_id' },
        ],
      },
      {
        name: 'email_addr',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'email_addr' },
        ],
      },
      {
        name: 'hash_algo_id',
        using: 'BTREE',
        fields: [
          { name: 'hash_algo_id' },
        ],
      },
      {
        name: 'email_validation_status_id',
        using: 'BTREE',
        fields: [
          { name: 'email_validation_status_id' },
        ],
      },
    ],
  });
};
