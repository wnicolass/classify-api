"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/* eslint-disable camelcase */
var _sequelize = require('sequelize');
var _Ad2 = require('./Ad'); var _Ad3 = _interopRequireDefault(_Ad2);
var _AdAddress2 = require('./AdAddress'); var _AdAddress3 = _interopRequireDefault(_AdAddress2);
var _AdApproval2 = require('./AdApproval'); var _AdApproval3 = _interopRequireDefault(_AdApproval2);
var _AdCondition2 = require('./AdCondition'); var _AdCondition3 = _interopRequireDefault(_AdCondition2);
var _AdImage2 = require('./AdImage'); var _AdImage3 = _interopRequireDefault(_AdImage2);
var _AdStatus2 = require('./AdStatus'); var _AdStatus3 = _interopRequireDefault(_AdStatus2);
var _AdminAccount2 = require('./AdminAccount'); var _AdminAccount3 = _interopRequireDefault(_AdminAccount2);
var _Category2 = require('./Category'); var _Category3 = _interopRequireDefault(_Category2);
var _Chatroom2 = require('./Chatroom'); var _Chatroom3 = _interopRequireDefault(_Chatroom2);
var _EmailValidationStatus2 = require('./EmailValidationStatus'); var _EmailValidationStatus3 = _interopRequireDefault(_EmailValidationStatus2);
var _ExternalProvider2 = require('./ExternalProvider'); var _ExternalProvider3 = _interopRequireDefault(_ExternalProvider2);
var _Favourite2 = require('./Favourite'); var _Favourite3 = _interopRequireDefault(_Favourite2);
var _FavouriteSearch2 = require('./FavouriteSearch'); var _FavouriteSearch3 = _interopRequireDefault(_FavouriteSearch2);
var _Feature2 = require('./Feature'); var _Feature3 = _interopRequireDefault(_Feature2);
var _FieldDefinition2 = require('./FieldDefinition'); var _FieldDefinition3 = _interopRequireDefault(_FieldDefinition2);
var _FieldValue2 = require('./FieldValue'); var _FieldValue3 = _interopRequireDefault(_FieldValue2);
var _HashAlgo2 = require('./HashAlgo'); var _HashAlgo3 = _interopRequireDefault(_HashAlgo2);
var _Message2 = require('./Message'); var _Message3 = _interopRequireDefault(_Message2);
var _OpenIdConnectTokens2 = require('./OpenIdConnectTokens'); var _OpenIdConnectTokens3 = _interopRequireDefault(_OpenIdConnectTokens2);
var _Promo2 = require('./Promo'); var _Promo3 = _interopRequireDefault(_Promo2);
var _Subcategory2 = require('./Subcategory'); var _Subcategory3 = _interopRequireDefault(_Subcategory2);
var _Subcategory_FieldDefinition2 = require('./Subcategory_FieldDefinition'); var _Subcategory_FieldDefinition3 = _interopRequireDefault(_Subcategory_FieldDefinition2);
var _UserAccount2 = require('./UserAccount'); var _UserAccount3 = _interopRequireDefault(_UserAccount2);
var _UserAddress2 = require('./UserAddress'); var _UserAddress3 = _interopRequireDefault(_UserAddress2);
var _UserLoginData2 = require('./UserLoginData'); var _UserLoginData3 = _interopRequireDefault(_UserLoginData2);
var _UserLoginDataExt2 = require('./UserLoginDataExt'); var _UserLoginDataExt3 = _interopRequireDefault(_UserLoginDataExt2);

function initModels(sequelize) {
  const Ad = _Ad3.default.call(void 0, sequelize, _sequelize.DataTypes);
  const AdAddress = _AdAddress3.default.call(void 0, sequelize, _sequelize.DataTypes);
  const AdApproval = _AdApproval3.default.call(void 0, sequelize, _sequelize.DataTypes);
  const AdCondition = _AdCondition3.default.call(void 0, sequelize, _sequelize.DataTypes);
  const AdImage = _AdImage3.default.call(void 0, sequelize, _sequelize.DataTypes);
  const AdStatus = _AdStatus3.default.call(void 0, sequelize, _sequelize.DataTypes);
  const AdminAccount = _AdminAccount3.default.call(void 0, sequelize, _sequelize.DataTypes);
  const Category = _Category3.default.call(void 0, sequelize, _sequelize.DataTypes);
  const Chatroom = _Chatroom3.default.call(void 0, sequelize, _sequelize.DataTypes);
  const EmailValidationStatus = _EmailValidationStatus3.default.call(void 0, sequelize, _sequelize.DataTypes);
  const ExternalProvider = _ExternalProvider3.default.call(void 0, sequelize, _sequelize.DataTypes);
  const Favourite = _Favourite3.default.call(void 0, sequelize, _sequelize.DataTypes);
  const FavouriteSearch = _FavouriteSearch3.default.call(void 0, sequelize, _sequelize.DataTypes);
  const Feature = _Feature3.default.call(void 0, sequelize, _sequelize.DataTypes);
  const FieldDefinition = _FieldDefinition3.default.call(void 0, sequelize, _sequelize.DataTypes);
  const FieldValue = _FieldValue3.default.call(void 0, sequelize, _sequelize.DataTypes);
  const HashAlgo = _HashAlgo3.default.call(void 0, sequelize, _sequelize.DataTypes);
  const Message = _Message3.default.call(void 0, sequelize, _sequelize.DataTypes);
  const OpenIdConnectTokens = _OpenIdConnectTokens3.default.call(void 0, sequelize, _sequelize.DataTypes);
  const Promo = _Promo3.default.call(void 0, sequelize, _sequelize.DataTypes);
  const Subcategory = _Subcategory3.default.call(void 0, sequelize, _sequelize.DataTypes);
  // eslint-disable-next-line camelcase
  const Subcategory_FieldDefinition = _Subcategory_FieldDefinition3.default.call(void 0, sequelize, _sequelize.DataTypes);
  const UserAccount = _UserAccount3.default.call(void 0, sequelize, _sequelize.DataTypes);
  const UserAddress = _UserAddress3.default.call(void 0, sequelize, _sequelize.DataTypes);
  const UserLoginData = _UserLoginData3.default.call(void 0, sequelize, _sequelize.DataTypes);
  const UserLoginDataExt = _UserLoginDataExt3.default.call(void 0, sequelize, _sequelize.DataTypes);

  Ad.belongsToMany(AdminAccount, {
    as: 'admin_id_AdminAccounts', through: AdApproval, foreignKey: 'ad_id', otherKey: 'admin_id',
  });
  Ad.belongsToMany(FieldDefinition, {
    as: 'field_definition_id_FieldDefinitions', through: FieldValue, foreignKey: 'ad_id', otherKey: 'field_definition_id',
  });
  AdminAccount.belongsToMany(Ad, {
    as: 'ad_id_Ads', through: AdApproval, foreignKey: 'admin_id', otherKey: 'ad_id',
  });
  FieldDefinition.belongsToMany(Ad, {
    as: 'ad_id_Ad_FieldValues', through: FieldValue, foreignKey: 'field_definition_id', otherKey: 'ad_id',
  });
  FieldDefinition.belongsToMany(Subcategory, {
    as: 'subcategory_id_Subcategories', through: Subcategory_FieldDefinition, foreignKey: 'field_definition_id', otherKey: 'subcategory_id',
  });
  Subcategory.belongsToMany(FieldDefinition, {
    as: 'field_definition_id_FieldDefinition_Subcategory_FieldDefinitions', through: Subcategory_FieldDefinition, foreignKey: 'subcategory_id', otherKey: 'field_definition_id',
  });
  AdApproval.belongsTo(Ad, { as: 'ad', foreignKey: 'ad_id' });
  Ad.hasMany(AdApproval, { as: 'AdApprovals', foreignKey: 'ad_id' });
  AdImage.belongsTo(Ad, { as: 'ad', foreignKey: 'ad_id' });
  Ad.hasMany(AdImage, { as: 'AdImages', foreignKey: 'ad_id' });
  Chatroom.belongsTo(Ad, { as: 'ad', foreignKey: 'ad_id' });
  Ad.hasMany(Chatroom, { as: 'Chatrooms', foreignKey: 'ad_id' });
  Favourite.belongsTo(Ad, { as: 'ad', foreignKey: 'ad_id' });
  Ad.hasMany(Favourite, { as: 'Favourites', foreignKey: 'ad_id' });
  FieldValue.belongsTo(Ad, { as: 'ad', foreignKey: 'ad_id' });
  Ad.hasMany(FieldValue, { as: 'FieldValues', foreignKey: 'ad_id' });
  Ad.belongsTo(AdAddress, { as: 'ad_address', foreignKey: 'ad_address_id' });
  AdAddress.hasMany(Ad, { as: 'Ads', foreignKey: 'ad_address_id' });
  Feature.belongsTo(AdCondition, { as: 'condition', foreignKey: 'condition_id' });
  AdCondition.hasMany(Feature, { as: 'Features', foreignKey: 'condition_id' });
  Ad.belongsTo(AdStatus, { as: 'status', foreignKey: 'status_id' });
  AdStatus.hasMany(Ad, { as: 'Ads', foreignKey: 'status_id' });
  AdApproval.belongsTo(AdminAccount, { as: 'admin', foreignKey: 'admin_id' });
  AdminAccount.hasMany(AdApproval, { as: 'AdApprovals', foreignKey: 'admin_id' });
  Subcategory.belongsTo(Category, { as: 'category', foreignKey: 'category_id' });
  Category.hasMany(Subcategory, { as: 'Subcategories', foreignKey: 'category_id' });
  Message.belongsTo(Chatroom, { as: 'chatroom', foreignKey: 'chatroom_id' });
  Chatroom.hasMany(Message, { as: 'Messages', foreignKey: 'chatroom_id' });
  UserLoginData.belongsTo(EmailValidationStatus, { as: 'email_validation_status', foreignKey: 'email_validation_status_id' });
  EmailValidationStatus.hasMany(UserLoginData, { as: 'UserLoginData', foreignKey: 'email_validation_status_id' });
  UserLoginDataExt.belongsTo(ExternalProvider, { as: 'external_provider', foreignKey: 'external_provider_id' });
  ExternalProvider.hasMany(UserLoginDataExt, { as: 'UserLoginDataExts', foreignKey: 'external_provider_id' });
  Ad.belongsTo(Feature, { as: 'feature', foreignKey: 'feature_id' });
  Feature.hasMany(Ad, { as: 'Ads', foreignKey: 'feature_id' });
  FieldValue.belongsTo(FieldDefinition, { as: 'field_definition', foreignKey: 'field_definition_id' });
  FieldDefinition.hasMany(FieldValue, { as: 'FieldValues', foreignKey: 'field_definition_id' });
  Subcategory_FieldDefinition.belongsTo(FieldDefinition, { as: 'field_definition', foreignKey: 'field_definition_id' });
  FieldDefinition.hasMany(Subcategory_FieldDefinition, { as: 'Subcategory_FieldDefinitions', foreignKey: 'field_definition_id' });
  UserLoginData.belongsTo(HashAlgo, { as: 'hash_algo', foreignKey: 'hash_algo_id' });
  HashAlgo.hasMany(UserLoginData, { as: 'UserLoginData', foreignKey: 'hash_algo_id' });
  Ad.belongsTo(Promo, { as: 'promo', foreignKey: 'promo_id' });
  Promo.hasMany(Ad, { as: 'Ads', foreignKey: 'promo_id' });
  Ad.belongsTo(Subcategory, { as: 'subcategory', foreignKey: 'subcategory_id' });
  Subcategory.hasMany(Ad, { as: 'Ads', foreignKey: 'subcategory_id' });
  Subcategory_FieldDefinition.belongsTo(Subcategory, { as: 'subcategory', foreignKey: 'subcategory_id' });
  Subcategory.hasMany(Subcategory_FieldDefinition, { as: 'Subcategory_FieldDefinitions', foreignKey: 'subcategory_id' });
  Ad.belongsTo(UserAccount, { as: 'user', foreignKey: 'user_id' });
  UserAccount.hasMany(Ad, { as: 'Ads', foreignKey: 'user_id' });
  Chatroom.belongsTo(UserAccount, { as: 'starter', foreignKey: 'starter_id' });
  UserAccount.hasMany(Chatroom, { as: 'Chatrooms', foreignKey: 'starter_id' });
  Favourite.belongsTo(UserAccount, { as: 'user', foreignKey: 'user_id' });
  UserAccount.hasMany(Favourite, { as: 'Favourites', foreignKey: 'user_id' });
  FavouriteSearch.belongsTo(UserAccount, { as: 'user', foreignKey: 'user_id' });
  UserAccount.hasMany(FavouriteSearch, { as: 'FavouriteSearches', foreignKey: 'user_id' });
  Message.belongsTo(UserAccount, { as: 'sender_user', foreignKey: 'sender_user_id' });
  UserAccount.hasMany(Message, { as: 'Messages', foreignKey: 'sender_user_id' });
  Message.belongsTo(UserAccount, { as: 'receiver_user', foreignKey: 'receiver_user_id' });
  UserAccount.hasMany(Message, { as: 'receiver_user_Messages', foreignKey: 'receiver_user_id' });
  UserAddress.belongsTo(UserAccount, { as: 'user', foreignKey: 'user_id' });
  UserAccount.hasMany(UserAddress, { as: 'UserAddresses', foreignKey: 'user_id' });
  UserLoginData.belongsTo(UserAccount, { as: 'user', foreignKey: 'user_id' });
  UserAccount.hasOne(UserLoginData, { as: 'UserLoginDatum', foreignKey: 'user_id' });
  UserLoginDataExt.belongsTo(UserAccount, { as: 'user', foreignKey: 'user_id' });
  UserAccount.hasMany(UserLoginDataExt, { as: 'UserLoginDataExts', foreignKey: 'user_id' });

  return {
    Ad,
    AdAddress,
    AdApproval,
    AdCondition,
    AdImage,
    AdStatus,
    AdminAccount,
    Category,
    Chatroom,
    EmailValidationStatus,
    ExternalProvider,
    Favourite,
    FavouriteSearch,
    Feature,
    FieldDefinition,
    FieldValue,
    HashAlgo,
    Message,
    OpenIdConnectTokens,
    Promo,
    Subcategory,
    Subcategory_FieldDefinition,
    UserAccount,
    UserAddress,
    UserLoginData,
    UserLoginDataExt,
  };
}
exports. default = initModels;
