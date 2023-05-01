import { Sequelize } from 'sequelize';

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Message', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    text_message: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    send_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
    },
    chatroom_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Chatroom',
        key: 'id',
      },
    },
    sender_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'UserAccount',
        key: 'user_id',
      },
    },
    receiver_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'UserAccount',
        key: 'user_id',
      },
    },
  }, {
    sequelize,
    tableName: 'Message',
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
        name: 'chatroom_id',
        using: 'BTREE',
        fields: [
          { name: 'chatroom_id' },
        ],
      },
      {
        name: 'sender_user_id',
        using: 'BTREE',
        fields: [
          { name: 'sender_user_id' },
        ],
      },
      {
        name: 'receiver_user_id',
        using: 'BTREE',
        fields: [
          { name: 'receiver_user_id' },
        ],
      },
    ],
  });
};
