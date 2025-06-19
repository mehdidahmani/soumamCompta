const Setting = require('@/models/coreModels/Setting');

const updateBySettingKey = async ({ settingKey, settingValue }) => {
  try {
    const result = await Setting.findOneAndUpdate(
      { settingKey },
      { settingValue, updated: new Date() },
      { new: true, upsert: true }
    );
    return result;
  } catch (error) {
    console.error('Error updating setting:', error);
    throw error;
  }
};

module.exports = updateBySettingKey;