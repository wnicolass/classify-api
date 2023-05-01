import { Sequelize } from 'sequelize';

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Subcategory_FieldDefinition', {
    subcategory_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Subcategory',
        key: 'id',
      },
    },
    field_definition_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'FieldDefinition',
        key: 'id',
      },
    },
  }, {
    sequelize,
    tableName: 'Subcategory_FieldDefinition',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'subcategory_id' },
          { name: 'field_definition_id' },
        ],
      },
      {
        name: 'field_definition_id',
        using: 'BTREE',
        fields: [
          { name: 'field_definition_id' },
        ],
      },
    ],
  });
};
