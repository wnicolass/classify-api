const { Sequelize } = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Favourite', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'UserAccount',
        key: 'user_id',
      },
    },
    ad_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Ad',
        key: 'id',
      },
    },
    fav_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    tableName: 'Favourite',
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
        name: 'user_id',
        using: 'BTREE',
        fields: [
          { name: 'user_id' },
        ],
      },
      {
        name: 'ad_id',
        using: 'BTREE',
        fields: [
          { name: 'ad_id' },
        ],
      },
    ],
  });
};
