import { Sequelize } from 'sequelize';

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Chatroom', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    starter_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'UserAccount',
        key: 'user_id',
      },
    },
    is_unread_starter: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    is_unread_receiver: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
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
    tableName: 'Chatroom',
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
        name: 'starter_id',
        using: 'BTREE',
        fields: [
          { name: 'starter_id' },
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
