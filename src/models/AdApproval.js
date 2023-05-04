import { Sequelize } from 'sequelize';

export default function (sequelize, DataTypes) {
  return sequelize.define('AdApproval', {
    ad_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Ad',
        key: 'id',
      },
    },
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'AdminAccount',
        key: 'id',
      },
    },
    approved_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp'),
    },
  }, {
    sequelize,
    tableName: 'AdApproval',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'ad_id' },
          { name: 'admin_id' },
        ],
      },
      {
        name: 'admin_id',
        using: 'BTREE',
        fields: [
          { name: 'admin_id' },
        ],
      },
    ],
  });
}
