const { Sequelize } = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('UserAddress', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    country: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'UserAccount',
        key: 'user_id',
      },
    },
    address_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
    },
  }, {
    sequelize,
    tableName: 'UserAddress',
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
        name: 'user_id',
        using: 'BTREE',
        fields: [
          { name: 'user_id' },
        ],
      },
      {
        name: 'ix_UserAddress_city',
        using: 'BTREE',
        fields: [
          { name: 'city' },
        ],
      },
    ],
  });
};
