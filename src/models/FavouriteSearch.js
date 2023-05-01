import { Sequelize } from 'sequelize';

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('FavouriteSearch', {
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
    search_url: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    search_description: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    subcategory: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    order_type: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    fav_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    tableName: 'FavouriteSearch',
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
    ],
  });
};
