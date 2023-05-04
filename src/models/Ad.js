import { Sequelize } from 'sequelize';

export default function (sequelize, DataTypes) {
  return sequelize.define('Ad', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    ad_description: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_negotiable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'AdStatus',
        key: 'id',
      },
    },
    feature_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Feature',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'UserAccount',
        key: 'user_id',
      },
    },
    ad_address_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'AdAddress',
        key: 'id',
      },
    },
    subcategory_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Subcategory',
        key: 'id',
      },
    },
    promo_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Promo',
        key: 'id',
      },
    },
  }, {
    sequelize,
    tableName: 'Ad',
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
        name: 'status_id',
        using: 'BTREE',
        fields: [
          { name: 'status_id' },
        ],
      },
      {
        name: 'feature_id',
        using: 'BTREE',
        fields: [
          { name: 'feature_id' },
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
        name: 'ad_address_id',
        using: 'BTREE',
        fields: [
          { name: 'ad_address_id' },
        ],
      },
      {
        name: 'subcategory_id',
        using: 'BTREE',
        fields: [
          { name: 'subcategory_id' },
        ],
      },
      {
        name: 'promo_id',
        using: 'BTREE',
        fields: [
          { name: 'promo_id' },
        ],
      },
    ],
  });
}
