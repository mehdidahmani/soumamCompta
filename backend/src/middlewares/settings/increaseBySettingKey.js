const Setting = require('@/models/coreModels/Setting');

const increaseBySettingKey = async ({ settingKey }) => {
  try {
    // Try to find and update existing setting
    const result = await Setting.findOneAndUpdate(
      { settingKey },
      { $inc: { settingValue: 1 }, updated: new Date() },
      { new: true }
    );

    if (result) {
      return { settingValue: result.settingValue };
    }

    // If setting doesn't exist, create it
    const newSetting = new Setting({
      settingKey,
      settingValue: 1,
      settingCategory: 'finance_settings',
      valueType: 'number',
      isCoreSetting: true,
      created: new Date(),
      updated: new Date()
    });
    
    const savedSetting = await newSetting.save();
    return { settingValue: savedSetting.settingValue };

  } catch (error) {
    console.error('Error in increaseBySettingKey:', error);
    throw new Error(`Failed to increase setting ${settingKey}: ${error.message}`);
  }
};

module.exports = increaseBySettingKey;