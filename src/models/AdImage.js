import { Sequelize } from 'sequelize';

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('AdImage', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    image_name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    image_path_url: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    ad_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Ad',
        key: 'id',
      },
    },
  }, {
    sequelize,
    tableName: 'AdImage',
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
        name: 'ad_id',
        using: 'BTREE',
        fields: [
          { name: 'ad_id' },
        ],
      },
    ],
  });
};
