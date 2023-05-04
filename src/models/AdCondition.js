import { Sequelize } from 'sequelize';

export default function (sequelize, DataTypes) {
  return sequelize.define('AdCondition', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    condition_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    condition_description: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'AdCondition',
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
    ],
  });
}
