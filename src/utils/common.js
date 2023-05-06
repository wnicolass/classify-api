import models from '../database';

export function getKeyByValue(obj, value) {
  return Object.keys(obj).find((key) => obj[key] === value);
}

export const adRelatedData = {
  include: [
    {
      model: models.AdImage,
      as: 'AdImages',
      attributes: ['image_name', 'image_path_url'],
    },
    {
      model: models.Subcategory,
      as: 'subcategory',
      attributes: ['subcategory_name'],
    },
    {
      model: models.AdStatus,
      as: 'status',
    },
    {
      model: models.AdAddress,
      as: 'ad_address',
      attributes: ['country', 'city'],
    },
  ],
};

export const categoryRelatedData = {
  include: [
    {
      model: models.Subcategory,
      as: 'Subcategories',
      attributes: ['id', 'subcategory_name'],
    },
  ],
};

export const subcategoryRelatedData = {
  include: [
    {
      model: models.Category,
      as: 'category',
      attributes: ['id', 'category_name'],
    },
  ],
};

export const userRelatedData = {
  include: [
    {
      model: models.UserLoginData,
      as: 'UserLoginDatum',
      attributes: ['email_addr'],
    },
    {
      model: models.Ad,
      as: 'Ads',
      attributes: ['id', 'title', 'promo_id'],
    },
  ],
};
