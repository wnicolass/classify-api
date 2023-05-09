"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _database = require('../database'); var _database2 = _interopRequireDefault(_database);

 function getKeyByValue(obj, value) {
  return Object.keys(obj).find((key) => obj[key] === value);
} exports.getKeyByValue = getKeyByValue;

 const adRelatedData = {
  include: [
    {
      model: _database2.default.AdImage,
      as: 'AdImages',
      attributes: ['image_name', 'image_path_url'],
    },
    {
      model: _database2.default.Subcategory,
      as: 'subcategory',
      attributes: ['subcategory_name'],
    },
    {
      model: _database2.default.AdStatus,
      as: 'status',
    },
    {
      model: _database2.default.AdAddress,
      as: 'ad_address',
      attributes: ['country', 'city'],
    },
  ],
}; exports.adRelatedData = adRelatedData;

 const categoryRelatedData = {
  include: [
    {
      model: _database2.default.Subcategory,
      as: 'Subcategories',
      attributes: ['id', 'subcategory_name'],
    },
  ],
}; exports.categoryRelatedData = categoryRelatedData;

 const subcategoryRelatedData = {
  include: [
    {
      model: _database2.default.Category,
      as: 'category',
      attributes: ['id', 'category_name'],
    },
  ],
}; exports.subcategoryRelatedData = subcategoryRelatedData;

 const userRelatedData = {
  include: [
    {
      model: _database2.default.UserLoginData,
      as: 'UserLoginDatum',
      attributes: ['email_addr'],
    },
    {
      model: _database2.default.Ad,
      as: 'Ads',
      attributes: ['id', 'title', 'promo_id'],
    },
  ],
}; exports.userRelatedData = userRelatedData;
