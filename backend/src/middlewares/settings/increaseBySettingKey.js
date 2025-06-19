const Setting = require('@/models/coreModels/Setting');

const increaseBySettingKey = async ({ settingKey }) => {
  try {
    const result = await Setting.findOneAndUpdate(
      { settingKey },
      { $inc: { settingValue: 1 } },
      { new: true, upsert: true }
    );

    if (!result) {
      // Create new setting if it doesn't exist
      const newSetting = new Setting({
        settingKey,
        settingValue: 1,
        settingCategory: 'finance_settings',
        valueType: 'number'
      });
      await newSetting.save();
      return { settingValue: 1 };
    }

    return { settingValue: result.settingValue };
  } catch (error) {
    console.error('Error increasing setting:', error);
    throw error;
  }
};

module.exports = increaseBySettingKey;