const Setting = require('@/models/coreModels/Setting');

const listBySettingKey = async ({ settingCategory }) => {
  try {
    const results = await Setting.find({ settingCategory });
    return results;
  } catch (error) {
    console.error('Error listing settings:', error);
    throw error;
  }
};

module.exports = listBySettingKey;