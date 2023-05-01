import { Sequelize } from 'sequelize';

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('FieldValue', {
    field_definition_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'FieldDefinition',
        key: 'id',
      },
    },
    ad_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Ad',
        key: 'id',
      },
    },
    f_value: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'FieldValue',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'field_definition_id' },
          { name: 'ad_id' },
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
