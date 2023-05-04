/* eslint-disable camelcase */
import { DataTypes } from 'sequelize';
import _Ad from './Ad';
import _AdAddress from './AdAddress';
import _AdApproval from './AdApproval';
import _AdCondition from './AdCondition';
import _AdImage from './AdImage';
import _AdStatus from './AdStatus';
import _AdminAccount from './AdminAccount';
import _Category from './Category';
import _Chatroom from './Chatroom';
import _EmailValidationStatus from './EmailValidationStatus';
import _ExternalProvider from './ExternalProvider';
import _Favourite from './Favourite';
import _FavouriteSearch from './FavouriteSearch';
import _Feature from './Feature';
import _FieldDefinition from './FieldDefinition';
import _FieldValue from './FieldValue';
import _HashAlgo from './HashAlgo';
import _Message from './Message';
import _OpenIdConnectTokens from './OpenIdConnectTokens';
import _Promo from './Promo';
import _Subcategory from './Subcategory';
import _Subcategory_FieldDefinition from './Subcategory_FieldDefinition';
import _UserAccount from './UserAccount';
import _UserAddress from './UserAddress';
import _UserLoginData from './UserLoginData';
import _UserLoginDataExt from './UserLoginDataExt';

function initModels(sequelize) {
  const Ad = _Ad(sequelize, DataTypes);
  const AdAddress = _AdAddress(sequelize, DataTypes);
  const AdApproval = _AdApproval(sequelize, DataTypes);
  const AdCondition = _AdCondition(sequelize, DataTypes);
  const AdImage = _AdImage(sequelize, DataTypes);
  const AdStatus = _AdStatus(sequelize, DataTypes);
  const AdminAccount = _AdminAccount(sequelize, DataTypes);
  const Category = _Category(sequelize, DataTypes);
  const Chatroom = _Chatroom(sequelize, DataTypes);
  const EmailValidationStatus = _EmailValidationStatus(sequelize, DataTypes);
  const ExternalProvider = _ExternalProvider(sequelize, DataTypes);
  const Favourite = _Favourite(sequelize, DataTypes);
  const FavouriteSearch = _FavouriteSearch(sequelize, DataTypes);
  const Feature = _Feature(sequelize, DataTypes);
  const FieldDefinition = _FieldDefinition(sequelize, DataTypes);
  const FieldValue = _FieldValue(sequelize, DataTypes);
  const HashAlgo = _HashAlgo(sequelize, DataTypes);
  const Message = _Message(sequelize, DataTypes);
  const OpenIdConnectTokens = _OpenIdConnectTokens(sequelize, DataTypes);
  const Promo = _Promo(sequelize, DataTypes);
  const Subcategory = _Subcategory(sequelize, DataTypes);
  // eslint-disable-next-line camelcase
  const Subcategory_FieldDefinition = _Subcategory_FieldDefinition(sequelize, DataTypes);
  const UserAccount = _UserAccount(sequelize, DataTypes);
  const UserAddress = _UserAddress(sequelize, DataTypes);
  const UserLoginData = _UserLoginData(sequelize, DataTypes);
  const UserLoginDataExt = _UserLoginDataExt(sequelize, DataTypes);

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
export default initModels;
