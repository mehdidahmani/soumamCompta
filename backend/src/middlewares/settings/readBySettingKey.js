const Setting = require('@/models/coreModels/Setting');

const readBySettingKey = async ({ settingKey }) => {
  try {
    const result = await Setting.findOne({ settingKey });
    return result || null;
  } catch (error) {
    console.error('Error reading setting:', error);
    throw error;
  }
};

module.exports = readBySettingKey;